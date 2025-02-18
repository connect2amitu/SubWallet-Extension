// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BasicTxResponse } from '@subwallet/extension-base/background/KoniTypes';
import { getUnbondingExtrinsic } from '@subwallet/extension-koni-base/api/bonding';
import { ExternalProps } from '@subwallet/extension-koni-base/api/dotsama/external/shared';
import { signAndSendExtrinsic } from '@subwallet/extension-koni-base/api/dotsama/shared/signAndSendExtrinsic';

interface UnStakeExternalProps extends ExternalProps {
  address: string;
  amount: number;
  unstakeAll?: boolean;
  validatorAddress?: string;
}

export const createUnStakeExternal = async ({ address,
  amount,
  apiProps,
  callback,
  id,
  network,
  setState,
  signerType,
  unstakeAll,
  updateState,
  validatorAddress }: UnStakeExternalProps): Promise<void> => {
  const txState: BasicTxResponse = {};
  const extrinsic = await getUnbondingExtrinsic(address, amount, network.key, network, apiProps, validatorAddress, unstakeAll);

  await signAndSendExtrinsic({
    type: signerType,
    callback: callback,
    id: id,
    setState: setState,
    apiProps: apiProps,
    address: address,
    txState: txState,
    updateState: updateState,
    extrinsic: extrinsic,
    errorMessage: 'error bonding'
  });
};
