// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BasicTxResponse, ValidatorInfo } from '@subwallet/extension-base/background/KoniTypes';
import { getBondingExtrinsic } from '@subwallet/extension-koni-base/api/bonding';
import { ExternalProps } from '@subwallet/extension-koni-base/api/dotsama/external/shared';
import { signAndSendExtrinsic } from '@subwallet/extension-koni-base/api/dotsama/shared/signAndSendExtrinsic';

interface StakeExternalProps extends ExternalProps {
  amount: number;
  bondedValidators: string[];
  isBondedBefore: boolean;
  lockPeriod?: number;
  nominatorAddress: string;
  validatorInfo: ValidatorInfo;
}

export const createStakeExternal = async ({ amount,
  apiProps,
  bondedValidators,
  callback,
  id,
  isBondedBefore,
  lockPeriod,
  network,
  nominatorAddress,
  setState,
  signerType,
  updateState,
  validatorInfo }: StakeExternalProps): Promise<void> => {
  const txState: BasicTxResponse = {};

  const extrinsic = await getBondingExtrinsic(network, network.key, amount, bondedValidators, validatorInfo, isBondedBefore, nominatorAddress, apiProps);

  await signAndSendExtrinsic({
    type: signerType,
    callback: callback,
    id: id,
    setState: setState,
    apiProps: apiProps,
    address: nominatorAddress,
    txState: txState,
    updateState: updateState,
    extrinsic: extrinsic,
    errorMessage: 'error bonding'
  });
};
