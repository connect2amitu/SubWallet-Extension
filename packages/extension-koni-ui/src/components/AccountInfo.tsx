// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeypairType } from '@polkadot/util-crypto/types';
import type { Recoded, ThemeProps } from '../types';

import { faUsb } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faCodeMerge, faEye, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NetworkJson } from '@subwallet/extension-base/background/KoniTypes';
import cloneLogo from '@subwallet/extension-koni-ui/assets/clone.svg';
import Identicon from '@subwallet/extension-koni-ui/components/Identicon';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { accountAllRecoded, defaultRecoded, isAccountAll, recodeAddress } from '@subwallet/extension-koni-ui/util';
import Avatar from 'boring-avatars';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { isEthereumAddress } from '@polkadot/util-crypto';

import { AccountContext } from '../contexts';
import useToast from '../hooks/useToast';
import useTranslation from '../hooks/useTranslation';
import getParentNameSuri from '../util/getParentNameSuri';

export interface Props {
  address?: string | null;
  className?: string;
  genesisHash?: string | null;
  originGenesisHash?: string | null;
  isExternal?: boolean | null;
  isHardware?: boolean | null;
  isReadOnly?: boolean | null;
  name?: string | null;
  parentName?: string | null;
  suri?: string;
  showCopyBtn?: boolean
  type?: KeypairType;
  isShowAddress?: boolean;
  isShowBanner?: boolean;
  iconSize?: number;
  isEthereum?: boolean;
  isSelected?: boolean;
  addressHalfLength?: number;
  accountSplitPart?: 'both' | 'left' | 'right';
}

function AccountInfo ({ accountSplitPart = 'both',
  address,
  addressHalfLength = 10,
  className,
  genesisHash,
  iconSize = 32,
  isEthereum,
  isExternal,
  isHardware,
  isReadOnly,
  isSelected,
  isShowAddress = true,
  isShowBanner = true,
  name,
  originGenesisHash,
  parentName,
  showCopyBtn = true,
  suri,
  type: givenType }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { accounts } = useContext(AccountContext);
  const [{ account,
    formatted,
    genesisHash: recodedGenesis,
    isEthereum: _isEthereum,
    originGenesisHash: recodedOrigin,
    prefix }, setRecoded] = useState<Recoded>(defaultRecoded);
  const networkMap = useSelector((state: RootState) => state.networkMap);
  const { show } = useToast();
  const accountName = name || account?.name;
  const displayName = accountName || t('<unknown>');
  const { settings: { accountAllLogo } } = useSelector((state: RootState) => state);
  const randomVariant = window.localStorage.getItem('randomVariant') as 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring';
  const randomNameForLogo = window.localStorage.getItem('randomNameForLogo') as string;
  const _isAccountAll = address && isAccountAll(address);

  const getNetworkInfoByGenesisHash = useCallback((hash?: string | null): NetworkJson | null => {
    if (!hash) {
      return null;
    }

    for (const n in networkMap) {
      if (!Object.prototype.hasOwnProperty.call(networkMap, n)) {
        continue;
      }

      const networkInfo = networkMap[n];

      if (networkInfo.genesisHash === hash) {
        return networkInfo;
      }
    }

    return null;
  }, [networkMap]);

  const networkInfo = getNetworkInfoByGenesisHash(originGenesisHash || genesisHash || recodedOrigin || recodedGenesis);

  useEffect((): void => {
    if (!address) {
      setRecoded(defaultRecoded);

      return;
    }

    if (_isAccountAll) {
      setRecoded(accountAllRecoded);

      return;
    }

    setRecoded(recodeAddress(address, accounts, networkInfo, givenType));
  }, [accounts, _isAccountAll, address, networkInfo, givenType]);

  const iconTheme = useMemo((): 'polkadot'|'ethereum' => {
    if (!address) {
      return 'polkadot';
    }

    if (isEthereum || _isEthereum || isEthereumAddress(address)) {
      return 'ethereum';
    }

    return 'polkadot';
  }, [_isEthereum, address, isEthereum]);

  const _onCopy = useCallback(
    () => show(t('Copied')),
    [show, t]
  );

  const toShortAddress = (_address: string | null, halfLength?: number) => {
    const address = (_address || '').toString();

    const addressLength = halfLength || 7;

    if (address.length <= addressLength * 2) {
      return address;
    } else {
      if (accountSplitPart === 'left') {
        return `${address.slice(0, addressLength)}…`;
      } else if (accountSplitPart === 'right') {
        return `…${address.slice(-addressLength)}`;
      } else {
        return `${address.slice(0, addressLength)}…${address.slice(-addressLength)}`;
      }
    }
  };

  const renderIcon = useCallback((): JSX.Element => {
    if (account?.isExternal || isExternal) {
      if (account?.isHardware || isHardware) {
        return (
          <FontAwesomeIcon
            className='hardwareIcon'
            icon={faUsb}
            rotation={270}
            title={t('hardware wallet account')}
          />
        );
      } else if (account?.isReadOnly || isReadOnly) {
        return (
          <FontAwesomeIcon
            className='externalIcon'
            icon={faEye}
            title={t('readonly account')}
          />
        );
      } else {
        return (
          <FontAwesomeIcon
            className='externalIcon'
            icon={faQrcode}
            title={t('external account')}
          />
        );
      }
    } else {
      return <></>;
    }
  }, [account?.isExternal, account?.isHardware, account?.isReadOnly, isExternal, isHardware, isReadOnly, t]);

  const Name = () => {
    return (
      <>
        {!!accountName && renderIcon()}
        <span
          className='account-name-text'
          title={displayName}
        >{(_isAccountAll && (!name || name === 'All')) ? t<string>('All Accounts') : displayName}</span>
        {!!isSelected && (
          <FontAwesomeIcon
            className='account-checked-item'
            icon={faCheck}
          />
        )}
      </>);
  };

  const parentNameSuri = getParentNameSuri(parentName, suri);

  return (
    <div className={className}>
      <div className='account-info-row'>
        {_isAccountAll
          ? accountAllLogo
            ? (
              <img
                alt='all-account-icon'
                className='account-info__all-account-icon'
                src={accountAllLogo}
                style={{
                  width: iconSize + 8,
                  height: iconSize + 8
                }}
              />
            )
            : (
              <div className='account-info__all-account-icon'>
                <Avatar
                  colors={['#5F545C', '#EB7072', '#F5BA90', '#F5E2B8', '#A2CAA5']}
                  name={randomNameForLogo}
                  size={iconSize}
                  variant={randomVariant}
                />
              </div>
            )
          : (
            <Identicon
              className='account-info-identity-icon'
              iconTheme={iconTheme}
              isExternal={isExternal}
              prefix={prefix}
              size={iconSize}
              value={formatted || address}
            />
          )}
        <div className='account-info'>
          <div className='info-part'>
            <div
              className='account-info__name'
              data-field='name'
            >
              <Name />
            </div>
            {networkInfo?.genesisHash && isShowBanner && (
              <div
                className='account-info-banner account-info-chain'
                data-field='chain'
              >
                {networkInfo.chain.replace(' Relay Chain', '')}
              </div>
            )}
          </div>
          {
            !_isAccountAll && (
              <div className='info-part'>
                <div className='account-info-address-display'>
                  {isShowAddress && (
                    <div
                      className='account-info-full-address'
                      data-field='address'
                    >
                      {toShortAddress(formatted || address || t('<unknown>'), addressHalfLength)}
                    </div>
                  )}
                  {
                    showCopyBtn && (
                      <CopyToClipboard text={(formatted && formatted) || ''}>
                        <img
                          alt='copy'
                          className='account-info-copy-icon'
                          onClick={_onCopy}
                          src={cloneLogo}
                        />
                      </CopyToClipboard>
                    )
                  }
                </div>
                {parentName && (
                  <div className='account-info-derive-name'>
                    <FontAwesomeIcon
                      className='account-info-derive-icon'
                      fontSize={16}
                      icon={faCodeMerge}
                    />
                    <div
                      className='account-info-parent-name'
                      data-field='parent'
                      title={parentNameSuri}
                    >
                      <span className='account-parent-name'>{parentName}</span>
                      <span className='account-suri'>&nbsp;{suri}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default styled(AccountInfo)(({ theme }: ThemeProps) => `
  flex: 1;

  .account-info-banner {
    font-size: 12px;
    line-height: 16px;

    &.account-info-chain {
      background: ${theme.chainBackgroundColor};
      border-radius: 4px;
      color: ${theme.chainTextColor};
      font-size: 15px;
      line-height: 24px;
      padding: 0 8px;
      right: 15px;
      z-index: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100px;
      white-space: nowrap;
    }
  }

  .info-part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .account-info-derive-name {
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    flex-grow: 0;
    flex-shrink: 1;
    overflow: hidden;
  }

  .account-info-address-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    flex-grow: 1;
    white-space: nowrap;
  }

  .account-info__all-account-icon {
    // width: 40px;
    // min-width: 40px;
    // height: 40px;
    border: 2px solid ${theme.checkDotColor};
    margin-right: 10px;
    padding: 2px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .account-info-address-display .svg-inline--fa {
    width: 14px;
    height: 14px;
    margin-right: 10px;
    color: ${theme.accountDotsIconColor};
    &:hover {
      color: ${theme.labelColor};
      cursor: pointer;
    }
  }

  .account-info-identity-icon {
    border: 2px solid ${theme.checkDotColor};
    margin-right: 12px;
  }

  .account-info {
    width: 100%;
    overflow: hidden;
  }

  .account-checked-item {
    color: ${theme.primaryColor};
    margin-left: 4px;
  }

  .account-info-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 72px;
    border-radius: 4px;
    overflow: hidden;
  }

  .account-info__name {
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    color: ${theme.textColor};
    margin: 2px 0;
    overflow: hidden;
    max-width: 150px;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;

    .account-name-text {
      flex-grow: 0;
      flex-shrink: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &.displaced {
      padding-top: 16px;
    }
  }

  .account-info-parent-name {
    color: ${theme.textColor2};
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    overflow: hidden;
    margin-left: 2px;
    flex-direction: row;
    display: flex;

    .account-parent-name {
      flex-grow: 0;
      flex-shrink: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .account-suri {
      flex-grow: 1;
    }
  }

  .account-info-full-address {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 225px;
    color: ${theme.textColor2};
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
  }

  .account-info-copy-icon {
    cursor: pointer;
  }

  .account-info-derive-icon {
    color: ${theme.textColor2};
  }

  .externalIcon, .hardwareIcon {
    margin-right: 0.3rem;
    color: ${theme.textColor2};
    width: 0.875em;
  }
`);
