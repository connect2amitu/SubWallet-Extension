// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@google/model-viewer';

import { CustomTokenType, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { isValidSubstrateAddress } from '@subwallet/extension-koni-base/utils';
import { ActionContext, Spinner, Theme } from '@subwallet/extension-koni-ui/components';
import InputAddress from '@subwallet/extension-koni-ui/components/InputAddress';
import useGetNetworkJson from '@subwallet/extension-koni-ui/hooks/screen/home/useGetNetworkJson';
import useToast from '@subwallet/extension-koni-ui/hooks/useToast';
import Header from '@subwallet/extension-koni-ui/partials/Header';
import paramsHandler from '@subwallet/extension-koni-ui/Popup/Home/Nfts/api/paramsHandler';
import transferHandler from '@subwallet/extension-koni-ui/Popup/Home/Nfts/api/transferHandler';
import AuthTransfer from '@subwallet/extension-koni-ui/Popup/Home/Nfts/transfer/AuthTransfer';
import TransferResult from '@subwallet/extension-koni-ui/Popup/Home/Nfts/transfer/TransferResult';
import { SubstrateTransferParams, SUPPORTED_TRANSFER_SUBSTRATE_CHAIN, Web3TransferParams } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/utils';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { CurrentAccountType } from '@subwallet/extension-koni-ui/stores/types';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';

import { isEthereumAddress } from '@polkadot/util-crypto';

interface Props extends ThemeProps {
  className?: string;
}

interface ContentProps {
  className?: string;
  nftItem: NftItem;
  collectionImage?: string;
  collectionId: string;
}

const isValidRecipient = (address: string, isEthereum: boolean) => {
  if (isEthereum) {
    return isEthereumAddress(address);
  } else {
    return isValidSubstrateAddress(address);
  }
};

const SHOW_3D_MODELS = ['pioneer', 'bit.country'];

function Wrapper ({ className = '' }: Props): React.ReactElement<Props> {
  const { transferNftParams } = useSelector((state: RootState) => state);

  return (
    <div className={className}>
      <Header
        showAdd
        showCancelButton
        showSearch
        showSettings
        showSubHeader
        subHeaderName={'Send NFT'}
      />

      <TransferNftContainer
        collectionId={transferNftParams.collectionId}
        collectionImage={transferNftParams.collectionImage}
        nftItem={transferNftParams.nftItem}
      />
    </div>
  );
}

function TransferNftContainer ({ className, collectionId, collectionImage, nftItem }: ContentProps): React.ReactElement<ContentProps> {
  const [recipientAddress, setRecipientAddress] = useState<string | null>('');
  const [addressError, setAddressError] = useState(true);
  const { currentAccount: account } = useSelector((state: RootState) => state);
  const [currentAccount] = useState<CurrentAccountType>(account);
  const networkKey = nftItem.chain as string;
  const networkJson = useGetNetworkJson(networkKey);

  // for substrate-based chains
  const [substrateTransferParams, setSubstrateTransferParams] = useState<SubstrateTransferParams | null>(null);

  // for evm-based chains
  const [web3TransferParams, setWeb3TransferParams] = useState<Web3TransferParams | null>(null);
  const [loading, setLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showTransferResult, setShowTransferResult] = useState(false);

  const [extrinsicHash, setExtrinsicHash] = useState('');
  const [isTxSuccess, setIsTxSuccess] = useState(false);
  const [txError, setTxError] = useState('');

  const [showImage, setShowImage] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [show3dViewer, setShow3dViewer] = useState(false);

  const themeContext = useContext(ThemeContext as React.Context<Theme>);

  const navigate = useContext(ActionContext);
  const { show } = useToast();

  useEffect(() => { // handle user change network setting during sending process
    if (!networkJson.active) {
      navigate('/');
    }
  }, [navigate, networkJson.active]);

  useEffect(() => { // handle user change account during sending process
    if (account.account?.address !== currentAccount.account?.address) {
      navigate('/');
    }
  }, [account, currentAccount.account?.address, navigate]);

  const handleResend = useCallback(() => {
    setExtrinsicHash('');
    setIsTxSuccess(false);
    setTxError('');
    setShowTransferResult(false);
    setShowConfirm(true);
  }, []);

  const goBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const isEthereumAddress = useCallback((): boolean => {
    return !!networkJson.isEthereum;
  }, [networkJson.isEthereum]);

  useEffect(() => {
    if (networkJson.isEthereum) {
      setAddressError(!isValidRecipient(recipientAddress as string, true));
    } else {
      setAddressError(!isValidRecipient(recipientAddress as string, false));
    }
  }, [isEthereumAddress, networkJson.isEthereum, recipientAddress]);

  const handleSend = useCallback(async () => {
    if (addressError || !currentAccount.account?.address) {
      return;
    }

    if (!networkKey) {
      return;
    }

    setLoading(true);
    const senderAddress = currentAccount.account.address;
    const params = paramsHandler(nftItem, networkKey);
    const transferMeta = await transferHandler(networkKey, senderAddress, recipientAddress as string, params, nftItem);

    if (transferMeta !== null) {
      // @ts-ignore
      if (SUPPORTED_TRANSFER_SUBSTRATE_CHAIN.indexOf(networkKey) > -1 || nftItem.type === CustomTokenType.psp34) {
        setSubstrateTransferParams({
          params,
          estimatedFee: transferMeta.estimatedFee,
          balanceError: transferMeta.balanceError
        } as SubstrateTransferParams);
        // @ts-ignore
      } else if (nftItem.type === CustomTokenType.erc721) {
        setWeb3TransferParams({
          rawTx: transferMeta.web3RawTx,
          estimatedGas: transferMeta.estimatedGas,
          balanceError: transferMeta.balanceError
        } as Web3TransferParams);
      }

      setShowConfirm(true);
    } else {
      show('Some error occurred. Please try again later.');
    }

    setLoading(false);
  }, [addressError, currentAccount?.account?.address, networkKey, nftItem, recipientAddress, show]);

  const handleImageError = useCallback(() => {
    setLoading(false);
    setShowImage(false);
    setShowVideo(true);
  }, []);

  const getItemImage = useCallback(() => {
    if (nftItem.image) {
      return nftItem.image;
    }

    return themeContext.logo;
  }, [nftItem.image, themeContext.logo]);

  const handleVideoError = useCallback(() => {
    setLoading(false);
    setShowVideo(false);
    setShow3dViewer(true);
  }, []);

  const getNftImage = useCallback(() => {
    if (showImage) {
      return (
        <img
          alt={'item-img'}
          className={'item-img'}
          onError={handleImageError}
          src={getItemImage()}
          style={{ borderRadius: '5px' }}
        />
      );
    }

    if (showVideo) {
      return (
        <video
          autoPlay
          height='416'
          loop={true}
          onError={handleVideoError}
          width='100%'
        >
          <source
            src={getItemImage()}
            type='video/mp4'
          />
        </video>
      );
    }

    if (show3dViewer && nftItem.chain && SHOW_3D_MODELS.includes(nftItem.chain)) {
      return (
        // @ts-ignore
        <model-viewer
          alt={'model-viewer'}
          animation-name={'Idle'}
          ar-status={'not-presenting'}
          auto-rotate={true}
          auto-rotate-delay={100}
          bounds={'tight'}
          environment-image={'neutral'}
          interaction-prompt={'none'}
          loading={'lazy'}
          rotation-per-second={'15deg'}
          shadow-intensity={'1'}
          src={nftItem.image}
          style={{ width: '130px', height: '130px', cursor: 'pointer', borderRadius: '5px' }}
        />
      );
    }

    return (
      <img
        alt={'default-img'}
        className={'item-img'}
        src={themeContext.logo}
        style={{ borderRadius: '5px' }}
      />
    );
  }, [nftItem.chain, nftItem.image, getItemImage, handleImageError, handleVideoError, show3dViewer, showImage, showVideo, themeContext.logo]);

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <div className={`${className} transfer-container`}>
      {
        !showTransferResult &&
        <div>
          <div className={'img-container'}>
            {getNftImage()}
          </div>

          <InputAddress
            autoPrefill={true}
            className={'kn-field -field-2'}
            help={'Select a contact or paste the address you want to send nft to.'}
            isEtherium={isEthereumAddress()}
            // isDisabled={!!propRecipientId}
            label={'Send to address'}
            onChange={setRecipientAddress}
            type='allPlus'
            withEllipsis
          />

          <div className={'transfer-meta'}>
            <div className={'meta-title'}>
              <div>NFT</div>
              <div>Chain</div>
            </div>

            <div className={'meta-value'}>
              {/* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */}
              <div>{nftItem.name ? nftItem.name : '#' + nftItem.id}</div>
              <div style={{ textTransform: 'capitalize' }}>{networkJson?.chain}</div>
            </div>
          </div>

          <div
            className={'send-button-default ' + (addressError ? 'inactive-button' : 'active-button')}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSend}
          >
            {
              !loading
                ? 'Send'
                : <Spinner className={'spinner-loading'} />
            }
          </div>
        </div>
      }

      {
        showConfirm && (substrateTransferParams || web3TransferParams) &&
          <AuthTransfer
            chain={nftItem.chain}
            collectionId={collectionId}
            nftItem={nftItem}
            recipientAddress={recipientAddress}
            senderAccount={currentAccount?.account}
            setExtrinsicHash={setExtrinsicHash}
            setIsTxSuccess={setIsTxSuccess}
            setShowConfirm={setShowConfirm}
            setShowResult={setShowTransferResult}
            setTxError={setTxError}
            showResult={showTransferResult}
            substrateTransferParams={substrateTransferParams}
            web3TransferParams={web3TransferParams}
          />
      }

      {
        showTransferResult &&
        <TransferResult
          backToHome={goBack}
          extrinsicHash={extrinsicHash}
          handleResend={handleResend}
          isTxSuccess={isTxSuccess}
          networkKey={networkKey}
          txError={txError}
        />
      }
    </div>
  );
}

export default React.memo(styled(Wrapper)(({ theme }: Props) => `
  .img-container {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
  }

  .item-img {
    display: block;
    height: 130px;
    width: 130px;
    border-radius: 5px;
    text-align: center;
    object-fit: contain;
  }

  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;

  .transfer-container {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-top: 25px;
  }

  .spinner-loading {
    position: relative;
    height: 26px;
    width: 26px;
  }

  .inactive-button {
    opacity: 0.5;
  }

  .active-button {
    cursor: pointer;
  }

  .send-button-default {
    margin-top: 40px;
    background: ${theme.secondaryColor};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: #FFFFFF;
  }

  .address-warning {
    color: red;
    font-size: 12px;
  }

  .transfer-meta {
    display: flex;
    justify-content: space-between;
    border: 2px dashed #212845;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 10px;
    margin-top: 20px;
  }

  .meta-title {
    font-size: 14px;
    color: #7B8098;
  }

  .meta-value {
    text-align: right;
    font-size: 14px;
  }

  .field-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .field-title {
    text-transform: uppercase;
    font-size: 12px;
    color: #7B8098;
  }

  .input-value {
    background-color: ${theme.popupBackground};
    border-radius: 8px;
    padding: 10px 15px;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: none;
    border: 1px solid #181E42;
    color: ${theme.textColor};
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 500;
    line-height: 36px;
    font-style: normal;
  }

  .close-button {
    font-size: 20px;
    cursor: pointer;
  }
`));
