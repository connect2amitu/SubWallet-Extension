// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DropdownTransformOptionType, NetworkJson, RequestCheckCrossChainTransfer } from '@subwallet/extension-base/background/KoniTypes';
import arrowRight from '@subwallet/extension-koni-ui/assets/arrow-right.svg';
import FeeValue from '@subwallet/extension-koni-ui/components/Balance/FeeValue';
import FormatBalance from '@subwallet/extension-koni-ui/components/FormatBalance';
import InputAddress from '@subwallet/extension-koni-ui/components/InputAddress';
import Modal from '@subwallet/extension-koni-ui/components/Modal';
import SigningRequest from '@subwallet/extension-koni-ui/components/Signing/SigningRequest';
import { BalanceFormatType } from '@subwallet/extension-koni-ui/components/types';
import { ExternalRequestContext } from '@subwallet/extension-koni-ui/contexts/ExternalRequestContext';
import { SigningContext } from '@subwallet/extension-koni-ui/contexts/SigningContext';
import useGetNetworkJson from '@subwallet/extension-koni-ui/hooks/screen/home/useGetNetworkJson';
import useGetAccountByAddress from '@subwallet/extension-koni-ui/hooks/useGetAccountByAddress';
import { useRejectExternalRequest } from '@subwallet/extension-koni-ui/hooks/useRejectExternalRequest';
import useTranslation from '@subwallet/extension-koni-ui/hooks/useTranslation';
import { makeCrossChainTransfer, makeCrossChainTransferLedger, makeCrossChainTransferQr } from '@subwallet/extension-koni-ui/messaging';
import Dropdown from '@subwallet/extension-koni-ui/Popup/XcmTransfer/XcmDropdown/Dropdown';
import { ThemeProps, TransferResultType } from '@subwallet/extension-koni-ui/types';
import CN from 'classnames';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

interface Props extends ThemeProps {
  className?: string;
  onCancel: () => void;
  requestPayload: RequestCheckCrossChainTransfer;
  feeString: string;
  balanceFormat: BalanceFormatType; // decimal, symbol
  networkMap: Record<string, NetworkJson>;
  onChangeResult: (txResult: TransferResultType) => void;
  originChainOptions: DropdownTransformOptionType[];
  destinationChainOptions: DropdownTransformOptionType[];
}

function AuthTransaction ({ balanceFormat,
  className,
  destinationChainOptions,
  feeString,
  networkMap,
  onCancel,
  onChangeResult,
  originChainOptions,
  requestPayload }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  const { externalState: { externalId } } = useContext(ExternalRequestContext);
  const { signingState: { isBusy } } = useContext(SigningContext);
  const { handlerReject } = useRejectExternalRequest();

  const networkJson = useGetNetworkJson(requestPayload.originNetworkKey);

  const originNetworkPrefix = networkMap[requestPayload.originNetworkKey].ss58Format;
  const destinationNetworkPrefix = networkMap[requestPayload.destinationNetworkKey].ss58Format;

  const account = useGetAccountByAddress(requestPayload.from);

  const _onCancel = useCallback(async () => {
    if (!isBusy) {
      await handlerReject(externalId);

      onCancel();
    }
  }, [isBusy, handlerReject, externalId, onCancel]);

  const onFail = useCallback((errors: string[], extrinsicHash?: string) => {
    onChangeResult({
      isShowTxResult: true,
      isTxSuccess: false,
      extrinsicHash: extrinsicHash,
      txError: errors
    });
  }, [onChangeResult]);

  const onSuccess = useCallback((extrinsicHash: string) => {
    onChangeResult({
      isShowTxResult: true,
      isTxSuccess: true,
      extrinsicHash: extrinsicHash
    });
  }, [onChangeResult]);

  return (
    <div className={className}>
      <Modal className={'signer-modal'}>
        <div className='auth-transaction-header'>
          <div className='auth-transaction-header__part-1' />
          <div className='auth-transaction-header__part-2'>
            {t<string>('Authorize Transaction')}
          </div>
          <div className='auth-transaction-header__part-3'>
            <span
              className={CN('auth-transaction-header__close-btn', { '-disabled': isBusy })}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={!isBusy ? _onCancel : undefined}
            >{t('Cancel')}</span>
          </div>
        </div>

        <SigningRequest
          account={account}
          balanceError={false}
          detailError={true}
          handleSignLedger={makeCrossChainTransferLedger}
          handleSignPassword={makeCrossChainTransfer}
          handleSignQr={makeCrossChainTransferQr}
          hideConfirm={_onCancel}
          message={'There is problem when makeXcmTransfer'}
          network={networkJson}
          onFail={onFail}
          onSuccess={onSuccess}
          params={requestPayload}
        >
          <div className='bridge__chain-selector-area'>
            <Dropdown
              className='bridge__chain-selector'
              isDisabled={true}
              label={'Original Chain'}
              options={originChainOptions}
              value={requestPayload.originNetworkKey}
            />

            <div className='bridge__chain-swap'>
              <img
                alt='Icon'
                src={arrowRight}
              />
            </div>

            <Dropdown
              className='bridge__chain-selector'
              isDisabled={true}
              label={'Destination Chain'}
              options={destinationChainOptions}
              value={requestPayload.destinationNetworkKey}
            />
          </div>

          <InputAddress
            className={'auth-transaction__input-address'}
            defaultValue={requestPayload.from}
            help={t<string>('The account you will transfer from.')}
            isDisabled={true}
            isSetDefaultValue={true}
            label={t<string>('Origin Account')}
            networkPrefix={originNetworkPrefix}
            type='account'
            withEllipsis
          />

          <InputAddress
            className={'auth-transaction__input-address auth-transaction__destination-account'}
            defaultValue={requestPayload.to}
            help={t<string>('The account you want to transfer to.')}
            isDisabled={true}
            isSetDefaultValue={true}
            label={t<string>('Destination Account')}
            networkPrefix={destinationNetworkPrefix}
            type='allPlus'
            withEllipsis
          />

          <div className='auth-transaction__separator' />

          <div className='auth-transaction__info'>
            <div className='auth-transaction__info-text'>Amount</div>
            <div className='auth-transaction__info-value'>
              <FormatBalance
                format={balanceFormat}
                value={requestPayload.value}
              />
            </div>
          </div>

          <div className='auth-transaction__info'>
            <div className='auth-transaction__info-text'>Origin Chain Fee</div>
            <div className='auth-transaction__info-value'>
              <FeeValue feeString={feeString} />
            </div>
          </div>

          <div className='auth-transaction__info'>
            <div className='auth-transaction__info-text'>Total</div>
            <div className='auth-transaction__info-value'>
              <FormatBalance
                format={balanceFormat}
                value={requestPayload.value}
              />
              <span> + </span>
              <FeeValue feeString={feeString} />
            </div>
          </div>
        </SigningRequest>
      </Modal>
    </div>
  );
}

export default React.memo(styled(AuthTransaction)(({ theme }: ThemeProps) => `
  .subwallet-modal {
    max-width: 460px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .signer-modal {
    .subwallet-modal {
        border: 1px solid ${theme.extensionBorder};
    }
  }

  .auth-transaction-header {
    display: flex;
    align-items: center;
    height: 72px;
    box-shadow: ${theme.headerBoxShadow};
  }

  .auth-transaction-header__part-1 {
    flex: 1;
  }

  .auth-transaction-header__part-2 {
    color: ${theme.textColor};
    font-size: 20px;
    font-weight: 500;
  }

  .auth-transaction-header__part-3 {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .auth-transaction-header__close-btn {
    padding-left: 16px;
    padding-right: 16px;
    height: 40px;
    display: flex;
    align-items: center;
    color: ${theme.buttonTextColor2};
    cursor: pointer;
  }

  .auth-transaction-header__close-btn.-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .auth-transaction__input-address {
    .input-address__dropdown {
      border: 0;
      height: auto;
    }

    .key-pair__icon {
      display: none;
    }

    > label {
      left: 0;
    }

    .key-pair__name {
      padding-left: 0;
      font-size: 15px;
    }

    .input-address-dropdown__value-container {
      padding-left: 0;
      padding-right: 0;
    }

    .input-address-dropdown__single-value {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .auth-transaction__destination-account {
    margin-top: -5px;
  }

  .auth-transaction__info {
    display: flex;
    width: 100%;
    padding: 2px 0;
    flex-wrap: wrap;
  }

  .auth-transaction__info-text, auth-transaction__info-value {
    font-size: 15px;
    line-height: 26px;
    font-weight: 500;
  }

  .auth-transaction__info-text {
    color: ${theme.textColor2};
  }

  .auth-transaction__info-value {
    color: ${theme.textColor};
    flex: 2;
    text-align: right;
    font-weight: 500;
  }

  .auth-transaction__info-value .format-balance__front-part {
    overflow: hidden;
    white-space: nowrap;
    max-width: 160px;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: top;
  }

  .auth-transaction__separator {
    padding-top: 10px;
    border-bottom: 1px solid ${theme.menuItemsBorder};
  }

  .auth-transaction__info-value .value-separator {
    margin: 0 4px;
  }

  .auth-transaction__info-value .format-balance {
    display: inline-block;
  }

  .bridge__chain-selector-area.bridge__chain-selector-area {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 9px;
  }

  .bridge__chain-selector {
    flex: 1;
  }

  .bridge__chain-selector label {
    font-size: 15px;
    text-transform: none;
    color: ${theme.textColor};
    line-height: 26px;
    font-weight: 500;
  }

  .bridge__chain-swap {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 40%;
    border: 2px solid ${theme.buttonBorderColor};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 24px 12px 0;
  }
`));
