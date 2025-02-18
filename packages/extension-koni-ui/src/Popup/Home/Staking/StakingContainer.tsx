// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StakingType } from '@subwallet/extension-base/background/KoniTypes';
import LogosMap from '@subwallet/extension-koni-ui/assets/logo';
import { ActionContext } from '@subwallet/extension-koni-ui/components';
import Button from '@subwallet/extension-koni-ui/components/Button';
import { StakingDataType } from '@subwallet/extension-koni-ui/hooks/screen/home/types';
import useCurrentAccountCanSign from '@subwallet/extension-koni-ui/hooks/useCurrentAccountCanSign';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StakingRow = React.lazy(() => import('./StakingRow'));
const Spinner = React.lazy(() => import('@subwallet/extension-koni-ui/components/Spinner'));
const EmptyList = React.lazy(() => import('@subwallet/extension-koni-ui/Popup/Home/Staking/EmptyList'));
const StakeAuthClaimReward = React.lazy(() => import('@subwallet/extension-koni-ui/Popup/Home/Staking/components/StakeAuthClaimReward'));
const StakeAuthWithdrawal = React.lazy(() => import('@subwallet/extension-koni-ui/Popup/Home/Staking/components/StakeAuthWithdrawal'));

interface Props extends ThemeProps {
  className?: string;
  data: StakingDataType[];
  loading: boolean;
  priceMap: Record<string, number>;
  stakeUnlockingTimestamp: number;
}

function StakingContainer ({ className, data, loading, priceMap, stakeUnlockingTimestamp }: Props): React.ReactElement<Props> {
  const isCanSign = useCurrentAccountCanSign();
  const navigate = useContext(ActionContext);
  const { currentAccount: { account } } = useSelector((state: RootState) => state);

  const [scrollWidth, setScrollWidth] = useState<number>(6);
  const [containerWidth, setContainerWidth] = useState<number>(458);
  const [listWidth, setListWidth] = useState<number>(452);

  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false);

  // for withdrawal and claiming rewards
  const [targetNetworkKey, setTargetNetworkKey] = useState('');
  const [targetValidator, setTargetValidator] = useState('');
  const [targetNextWithdrawalAction, setTargetNextWithdrawalAction] = useState<string | undefined>(undefined);
  const [targetRedeemable, setTargetRedeemable] = useState(0);
  const [withdrawalTimestamp, setWithdrawalTimestamp] = useState(-1);
  const [targetStakingType, setTargetStakingType] = useState<StakingType | undefined>(undefined);

  const handleHideWithdrawalModal = useCallback(() => {
    setShowWithdrawalModal(false);
  }, []);

  const handleHideClaimRewardModal = useCallback(() => {
    setShowClaimRewardModal(false);
  }, []);

  const handlerResize = () => {
    const container = document.querySelector('.home-tab-contents') as HTMLElement;

    setContainerWidth(container.offsetWidth);
  };

  useEffect(() => {
    handlerResize();
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  const getScrollbarWidth = () => {
    // Creating invisible container
    const outer = document.createElement('div');

    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    // @ts-ignore
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');

    outer.appendChild(inner);
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    document.body.removeChild(outer);
    setScrollWidth(scrollbarWidth);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getScrollbarWidth();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setListWidth(containerWidth - scrollWidth);

    return () => {
      setListWidth(0);
    };
  }, [containerWidth, scrollWidth]);

  const handleNavigateBonding = useCallback(() => {
    navigate('/account/select-bonding-network');
    window.localStorage.setItem('popupNavigation', '/account/select-bonding-network');
  }, [navigate]);

  return (
    <div
      className={className}
      style={{ width: listWidth }}
    >
      <div className={'staking-container'}>

        {loading && <Spinner />}

        {/* @ts-ignore */}
        {data.length === 0 && !loading &&
          <EmptyList
            isCanSign={isCanSign}
          />
        }

        {data.length > 0 && !loading && <div className={'staking-item-container'}>
          {
            // @ts-ignore
            data.map((stakingDataType: StakingDataType, index: number) => {
              const item = stakingDataType.staking;
              const reward = stakingDataType?.reward;

              const name = item.name || item.chain;
              const icon = LogosMap[item.chain] || LogosMap.default;
              const price = priceMap[item.chain];
              const stakingType = item.type;

              let redeemable = 0;
              let nextWithdrawal = 0;
              let nextWithdrawalAmount = -1;
              let nextWithdrawalAction: string | undefined = '';
              let targetValidator: string | undefined = '';

              if (item.unlockingInfo && withdrawalTimestamp !== stakeUnlockingTimestamp) {
                redeemable = item.unlockingInfo.redeemable;
                nextWithdrawal = item.unlockingInfo.nextWithdrawal;
                nextWithdrawalAmount = item.unlockingInfo.nextWithdrawalAmount;
                nextWithdrawalAction = item.unlockingInfo.nextWithdrawalAction;
                targetValidator = item.unlockingInfo.validatorAddress;
              }

              return <StakingRow
                activeStake={item.activeBalance}
                chainName={name}
                index={index}
                isCanSign={isCanSign}
                key={index}
                logo={icon}
                networkKey={item.chain}
                nextWithdrawal={nextWithdrawal}
                nextWithdrawalAction={nextWithdrawalAction}
                nextWithdrawalAmount={nextWithdrawalAmount}
                price={price}
                redeemable={redeemable}
                reward={reward}
                setActionNetworkKey={setTargetNetworkKey}
                setShowClaimRewardModal={setShowClaimRewardModal}
                setShowWithdrawalModal={setShowWithdrawalModal}
                setTargetNextWithdrawalAction={setTargetNextWithdrawalAction}
                setTargetRedeemable={setTargetRedeemable}
                setTargetStakingType={setTargetStakingType}
                setTargetValidator={setTargetValidator}
                stakingType={stakingType}
                targetValidator={targetValidator}
                totalStake={item.balance}
                unbondingStake={item.unlockingBalance}
                unit={item.unit}
              />;
            })
          }
        </div>
        }

        {
          !loading && isCanSign && <div className={'staking-button-container'}>
            <Button
              className={'staking-button'}
              onClick={handleNavigateBonding}
            >
              Start staking
            </Button>
          </div>
        }
      </div>

      {
        showWithdrawalModal && <StakeAuthWithdrawal
          address={account?.address as string}
          amount={targetRedeemable}
          hideModal={handleHideWithdrawalModal}
          networkKey={targetNetworkKey}
          nextWithdrawalAction={targetNextWithdrawalAction}
          setWithdrawalTimestamp={setWithdrawalTimestamp}
          stakeUnlockingTimestamp={stakeUnlockingTimestamp}
          targetValidator={targetValidator !== '' ? targetValidator : undefined}
        />
      }

      {
        showClaimRewardModal && <StakeAuthClaimReward
          address={account?.address as string}
          hideModal={handleHideClaimRewardModal}
          networkKey={targetNetworkKey}
          stakingType={targetStakingType}
        />
      }
    </div>
  );
}

export default React.memo(styled(StakingContainer)(({ theme }: Props) => `
  width: 100%;
  padding: 0 25px;

  .staking-item-container {
    margin-bottom: 20px;
  }

  .staking-container {
    display: flex;
    flex-direction: column;
  }

  .staking-button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    align-items: center;
    margin-bottom: 20px;
  }

  .staking-button {
    width: 60%;
  }
`));
