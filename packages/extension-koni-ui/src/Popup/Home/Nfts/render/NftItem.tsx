// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@google/model-viewer';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NftItem as _NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { ActionContext, Theme } from '@subwallet/extension-koni-ui/components';
import Spinner from '@subwallet/extension-koni-ui/components/Spinner';
import useGetNetworkJson from '@subwallet/extension-koni-ui/hooks/screen/home/useGetNetworkJson';
import useCurrentAccountCanSign from '@subwallet/extension-koni-ui/hooks/useCurrentAccountCanSign';
import useToast from '@subwallet/extension-koni-ui/hooks/useToast';
import { isNftTransferSupported } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/utils';
import { RootState, store } from '@subwallet/extension-koni-ui/stores';
import { TransferNftParams } from '@subwallet/extension-koni-ui/stores/types';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import React, { useCallback, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';

interface Props {
  className?: string;
  data: _NftItem;
  onClickBack: () => void;
  collectionImage?: string;
  collectionId: string;
}

function updateTransferNftParams (nftItem: _NftItem, collectionImage: string | undefined, collectionId: string) {
  store.dispatch({ type: 'transferNftParams/update', payload: { nftItem, collectionImage, collectionId } as TransferNftParams });
}

const SHOW_3D_MODELS = ['pioneer', 'bitcountry'];

function NftItem ({ className, collectionId, collectionImage, data, onClickBack }: Props): React.ReactElement<Props> {
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [show3dViewer, setShow3dViewer] = useState(false);
  const { currentAccount: account } = useSelector((state: RootState) => state);
  // const networkMetadata = useGetNetworkMetadata();
  const networkJson = useGetNetworkJson(data.chain as string);
  const themeContext = useContext(ThemeContext as React.Context<Theme>);
  const canSign = useCurrentAccountCanSign();

  const navigate = useContext(ActionContext);
  const { show } = useToast();

  // @ts-ignore
  const propDetail = (title: string, valueDict: Record<string, any>, key: number) => {
    if (valueDict.type && valueDict.type === 'string') {
      return (
        <div
          className={'prop-detail'}
          key={key}
        >
          <div className={'prop-title'}>{title}</div>
          <div className={'prop-value'}>{valueDict.value}</div>
        </div>
      );
    }

    if (!valueDict.type) {
      return (
        <div
          className={'prop-detail'}
          key={key}
        >
          <div className={'prop-title'}>{title}</div>
          <div className={'prop-value'}>{valueDict.value}</div>
        </div>
      );
    }
  };

  const handleClickTransfer = useCallback(() => {
    if (!account.account || !canSign || !data.chain) {
      show('An error has occurred.');

      return;
    }

    if (!isNftTransferSupported(data.chain, networkJson)) {
      show('Transfer is not supported for this network');

      return;
    }

    updateTransferNftParams(data, collectionImage, collectionId);
    navigate('/account/send-nft');
  }, [canSign, account.account, collectionId, collectionImage, data, navigate, networkJson, show]);

  const handleClickBack = useCallback(() => {
    onClickBack();
  }, [onClickBack]);

  const handleOnLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setLoading(false);
    setShowImage(false);
    setShowVideo(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setLoading(false);
    setShowVideo(false);
    setShow3dViewer(true);
  }, []);

  const handleOnClick = useCallback(() => {
    try {
      if (data.external_url) {
        // eslint-disable-next-line no-void
        void chrome.tabs.create({ url: data?.external_url, active: true }).then(() => console.log('redirecting'));
      } else if (!loading) {
        // eslint-disable-next-line no-void
        void chrome.tabs.create({ url: data?.image, active: true }).then(() => console.log('redirecting'));
      }
    } catch (e) {
      console.log('redirecting to a new tab');
    }
  }, [data.external_url, data?.image, loading]);

  const getItemImage = useCallback(() => {
    if (data.image) {
      return data.image;
    }

    return themeContext.logo;
  }, [data.image, themeContext.logo]);

  const handleRightClick = useCallback((e: any) => {
    if (loading) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      e.preventDefault();
    }
  }, [loading]);

  const getNftImage = useCallback(() => {
    if (showImage) {
      return (
        <img
          alt={'item-img'}
          className={'item-img'}
          onClick={handleOnClick}
          onContextMenu={handleRightClick}
          onError={handleImageError}
          onLoad={handleOnLoad}
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
          onClick={handleOnClick}
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

    if (show3dViewer && data.chain && SHOW_3D_MODELS.includes(data.chain)) {
      return (
        // @ts-ignore
        <model-viewer
          alt={'model-viewer'}
          ar-status={'not-presenting'}
          auto-rotate={true}
          auto-rotate-delay={100}
          bounds={'tight'}
          disable-pan={true}
          disable-scroll={true}
          disable-tap={true}
          disable-zoom={true}
          environment-image={'neutral'}
          interaction-prompt={'none'}
          loading={'eager'}
          src={data.image}
          style={{ width: '100%', height: '402px', cursor: 'pointer', borderRadius: '5px' }}
          touch-action={'none'}
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
  }, [data.chain, data.image, getItemImage, handleImageError, handleOnClick, handleOnLoad, handleRightClick, handleVideoError, show3dViewer, showImage, showVideo, themeContext.logo]);

  return (
    <div className={className}>
      <div>
        <div className={'header'}>
          <div
            className={'back-icon'}
            onClick={handleClickBack}
          >
            <FontAwesomeIcon
              className='arrowLeftIcon'
              // @ts-ignore
              icon={faArrowLeft}
            />
          </div>
          <div
            className={'header-title'}
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            title={data.name ? data.name : '#' + data.id}
          >
            <div className={'collection-name'}>
              {/* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */}
              {data.name ? data.name : '#' + data.id}
            </div>
          </div>
          <div></div>
        </div>

        <div className={'detail-container'}>
          <div className={'img-container'}>
            {
              loading &&
              <Spinner className={'img-spinner'} />
            }
            {getNftImage()}
          </div>

          {
            canSign &&
            <div className={'send-container'}>
              <div
                className={'send-button'}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleClickTransfer}
              >
                Send
              </div>
            </div>
          }

          {
            data.description &&
            <div>
              <div className={'att-title'}>Description</div>
              <div className={'att-value'}><pre>{data?.description}</pre></div>
            </div>
          }
          {
            data.rarity &&
            <div>
              <div className={'att-title'}>Rarity</div>
              <div className={'att-value'}>{data?.rarity}</div>
            </div>
          }
          {
            data.properties &&
            <div>
              <div className={'att-title'}>Properties</div>
              <div className={'prop-container'}>
                {
                  Object.keys(data?.properties).map((key, index) => {
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    return propDetail(key, data?.properties[key], index);
                  })
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(NftItem)(({ theme }: ThemeProps) => `
  padding-bottom: 20px;

  pre {
    white-space: pre-wrap;
    word-break: keep-all;
  }

  .img-spinner {
    position: absolute;
  }

  .img-container {
    position: relative;
  }

  .back-icon:hover {
    cursor: pointer;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .header-title {
    width: 90%;
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
  }

  .collection-name {
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .send-container {
    margin-top: 20px;
  }

  .send-error {
    color: red;
    font-size: 14px;
    text-transform: uppercase;
  }

  .send-button {
    margin-top: 5px;
    background: ${theme.secondaryColor};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: #FFFFFF;
  }

  .send-button:hover {
    cursor: pointer;
  }

  .item-img {
    display: block;
    height: 402px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    object-fit: contain;
  }

  .att-title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
  }

  .att-value {
    font-size: 15px;
    color: #7B8098;
    word-break: break-all;
  }

  .prop-container {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .prop-detail {
    padding: 5px 10px;
    background: ${theme.popupBackground};
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
  }

  .prop-title {
    text-transform: uppercase;
    color: ${theme.iconNeutralColor};
    font-size: 13px;
  }

  .prop-value {
    font-size: 14px;
  }
`));
