// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigN from 'bignumber.js';
import React from 'react';

type BalanceViewProps = {
  value: string | BigN
  symbol?: string
  startWithSymbol?: boolean
  withComma?: boolean
  withSymbol?: boolean
}

export const BalanceVal = ({ startWithSymbol = false, symbol, value, withComma = true, withSymbol = true }: BalanceViewProps) => {
  let [prefix, postfix] = typeof value === 'object' ? value.toFormat(9).split('.') : value.toString().split('.');

  console.log('prefix', prefix);

  if (startWithSymbol) {
    postfix = postfix?.substring(0, 3);
  } else {
    postfix = postfix?.substring(0, 4);
  }

  const lastSymbol = postfix?.slice(-1);
  const isString = /^[KMB]/.test(lastSymbol);

  const postfixValue = parseInt(postfix) > 0 ? postfix : '00';

  const symbolView = prefix && <span className='balance-val__symbol'>{symbol}</span>;

  const formatPrefix = new Intl.NumberFormat().format(Number(prefix));

  console.log('formatPrefix', formatPrefix);

  return (
    <span className='balance-val'>
      {startWithSymbol && withSymbol && symbolView}<span className='balance-val__prefix'>{withComma ? formatPrefix.replace(/[. ]+/g, ',') : prefix}</span>

      .<span className='balance-val__postfix'>
        {isString ? postfixValue.slice(0, -1) : postfixValue}
      </span>
      {isString && lastSymbol}
      <> {!startWithSymbol && withSymbol && symbolView}</>
    </span>
  );
};
