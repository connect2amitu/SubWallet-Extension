// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TokenInfo } from '@subwallet/extension-base/background/KoniTypes';

// Type: Record<networkKey, Record<tokenKey, TokenInfo>>
// Note: tokenKey and TokenInfo.symbol must be the same value to prevent unwanted problem
export const PREDEFINE_TOKEN_DATA_MAP: Record<string, Record<string, TokenInfo>> = {
  statemine: {
    USDt: {
      isMainToken: false,
      assetIndex: 1984,
      symbol: 'USDt',
      name: 'USDt',
      decimals: 6
    },
    USDC: {
      isMainToken: false,
      assetIndex: 10,
      symbol: 'USDC',
      name: 'USDC',
      decimals: 4
    },
    RMRK: {
      isMainToken: false,
      assetIndex: 8,
      symbol: 'RMRK',
      name: 'RMRK.app',
      decimals: 10
    },
    ARIS: {
      isMainToken: false,
      assetIndex: 16,
      symbol: 'ARIS',
      name: 'PolarisDAO',
      decimals: 8
    },
    BILL: {
      isMainToken: false,
      assetIndex: 223,
      symbol: 'BILL',
      name: 'BILLCOIN',
      decimals: 8
    },
    CHAOS: {
      isMainToken: false,
      assetIndex: 69420,
      symbol: 'CHAOS',
      name: 'Chaos',
      decimals: 10
    },
    CHRWNA: {
      isMainToken: false,
      assetIndex: 567,
      symbol: 'CHRWNA',
      name: 'Chrawnna Coin',
      decimals: 10
    },
    BAILEGO: {
      isMainToken: false,
      assetIndex: 88888,
      symbol: 'BAILEGO',
      name: 'SHIBATALES',
      decimals: 0
    }
  },
  // acala: {
  //   DOT: {
  //     isMainToken: false,
  //     symbol: 'DOT',
  //     name: 'DOT',
  //     decimals: 10
  //   },
  //   LDOT: {
  //     isMainToken: false,
  //     symbol: 'LDOT',
  //     name: 'LDOT',
  //     decimals: 10
  //   },
  //   LCDOT: {
  //     isMainToken: false,
  //     symbol: 'LCDOT',
  //     name: 'LCDOT',
  //     decimals: 10,
  //     specialOption: { LiquidCrowdloan: 13 }
  //   },
  //   tDOT: {
  //     isMainToken: false,
  //     symbol: 'tDOT',
  //     name: 'Tapio DOT',
  //     decimals: 10,
  //     specialOption: { StableAssetPoolToken: 0 }
  //   }
  // },
  // karura: {
  //   aUSD: {
  //     isMainToken: false,
  //     symbol: 'AUSD',
  //     symbolAlt: 'aUSD',
  //     name: 'aUSD',
  //     decimals: 12,
  //     specialOption: { Token: 'KUSD' }
  //   },
  //   LKSM: {
  //     isMainToken: false,
  //     symbol: 'LKSM',
  //     name: 'LKSM',
  //     decimals: 12
  //   },
  //   KMA: {
  //     isMainToken: false,
  //     symbol: 'KMA',
  //     name: 'KMA',
  //     decimals: 12
  //   },
  //   taiKSM: {
  //     isMainToken: false,
  //     symbol: 'taiKSM',
  //     name: 'Taiga KSM',
  //     decimals: 12,
  //     specialOption: { StableAssetPoolToken: 0 }
  //   },
  //   '3USD': {
  //     isMainToken: false,
  //     symbol: '3USD',
  //     name: 'Taiga 3USD',
  //     decimals: 12,
  //     specialOption: { StableAssetPoolToken: 1 }
  //   },
  //   TEER: {
  //     isMainToken: false,
  //     symbol: 'TEER',
  //     name: 'TEER',
  //     decimals: 12
  //   },
  //   BNC: {
  //     isMainToken: false,
  //     symbol: 'BNC',
  //     name: 'BNC',
  //     decimals: 12
  //   },
  //   TAI: {
  //     isMainToken: false,
  //     symbol: 'TAI',
  //     name: 'TAI',
  //     decimals: 12
  //   },
  //   HKO: {
  //     isMainToken: false,
  //     symbol: 'HKO',
  //     name: 'HKO',
  //     decimals: 12
  //   },
  //   KICO: {
  //     isMainToken: false,
  //     symbol: 'KICO',
  //     name: 'KICO',
  //     decimals: 14
  //   },
  //   QTZ: {
  //     isMainToken: false,
  //     symbol: 'QTZ',
  //     name: 'Quartz',
  //     decimals: 18
  //   },
  //   NEER: {
  //     isMainToken: false,
  //     symbol: 'NEER',
  //     name: 'NEER',
  //     decimals: 18
  //   },
  //   PHA: {
  //     isMainToken: false,
  //     symbol: 'PHA',
  //     name: 'PHA',
  //     decimals: 12
  //   },
  //   PolarisDAO: {
  //     isMainToken: false,
  //     symbol: 'ARIS',
  //     name: 'PolarisDAO',
  //     decimals: 8,
  //     specialOption: { ForeignAsset: 1 }
  //   },
  //   KINT: {
  //     isMainToken: false,
  //     symbol: 'KINT',
  //     name: 'KINT',
  //     decimals: 12
  //   },
  //   RMRK: {
  //     isMainToken: false,
  //     symbol: 'RMRK',
  //     name: 'RMRK',
  //     decimals: 10
  //   },
  //   CSM: {
  //     isMainToken: false,
  //     symbol: 'CSM',
  //     name: 'CSM',
  //     decimals: 12
  //   },
  //   VSKSM: {
  //     isMainToken: false,
  //     symbol: 'VSKSM',
  //     name: 'VSKSM',
  //     decimals: 12
  //   },
  //   USDC: {
  //     isMainToken: false,
  //     symbol: 'USDC',
  //     name: 'USDC',
  //     decimals: 6,
  //     specialOption: { Erc20: '0x1f3a10587a20114ea25ba1b388ee2dd4a337ce27' }
  //   },
  //   KSM: {
  //     isMainToken: false,
  //     symbol: 'KSM',
  //     name: 'KSM',
  //     decimals: 12
  //   },
  //   BSX: {
  //     isMainToken: false,
  //     symbol: 'BSX',
  //     name: 'BSX',
  //     decimals: 12
  //   },
  //   KBTC: {
  //     isMainToken: false,
  //     symbol: 'KBTC',
  //     name: 'KBTC',
  //     decimals: 8
  //   },
  //   AIR: {
  //     isMainToken: false,
  //     symbol: 'AIR',
  //     name: 'AIR',
  //     decimals: 18
  //   },
  //   USDT: {
  //     isMainToken: false,
  //     symbol: 'USDT',
  //     name: 'USDT',
  //     decimals: 6
  //   },
  //   MOVR: {
  //     isMainToken: false,
  //     symbol: 'MOVR',
  //     name: 'MOVR',
  //     decimals: 18
  //   }
  // },
  // bifrost: {
  //   KUSD: {
  //     isMainToken: false,
  //     symbol: 'KUSD',
  //     name: 'KUSD',
  //     decimals: 12
  //   },
  //   DOT: {
  //     isMainToken: false,
  //     symbol: 'DOT',
  //     name: 'DOT',
  //     decimals: 10
  //   },
  //   KSM: {
  //     isMainToken: false,
  //     symbol: 'KSM',
  //     name: 'KSM',
  //     decimals: 12
  //   },
  //   KAR: {
  //     isMainToken: false,
  //     symbol: 'KAR',
  //     name: 'KAR',
  //     decimals: 12
  //   },
  //   ZLK: {
  //     isMainToken: false,
  //     symbol: 'ZLK',
  //     name: 'ZLK',
  //     decimals: 18
  //   },
  //   PHA: {
  //     isMainToken: false,
  //     symbol: 'PHA',
  //     name: 'PHA',
  //     decimals: 12
  //   },
  //   RMRK: {
  //     isMainToken: false,
  //     symbol: 'RMRK',
  //     name: 'RMRK',
  //     decimals: 10
  //   },
  //   MOVR: {
  //     isMainToken: false,
  //     symbol: 'MOVR',
  //     name: 'MOVR',
  //     decimals: 18
  //   }
  // },
  moonbase: {
    xcBNC: {
      isMainToken: false,
      symbol: 'xcBNC',
      contractAddress: '0xFFFFFFFF1FAE104DC4C134306BCA8E2E1990ACFD',
      decimals: 12,
      name: 'xcBNC'
    },
    xcUNIT: {
      isMainToken: false,
      symbol: 'xcUNIT',
      contractAddress: '0xFFFFFFFF1FCACBD218EDC0EBA20FC2308C778080',
      decimals: 12,
      name: 'xcUNIT'
    },
    xcKAR: {
      isMainToken: false,
      symbol: 'xcKAR',
      contractAddress: '0xFFFFFFFF08220AD2E6E157F26ED8BD22A336A0A5',
      decimals: 12,
      name: 'xcKarura'
    },
    XCKINT: {
      isMainToken: false,
      symbol: 'XCKINT',
      contractAddress: '0xFFFFFFFF27C019790DFBEE7CB70F5996671B2882',
      decimals: 12,
      name: 'xcKintsugi'
    },
    MFR: {
      isMainToken: false,
      symbol: 'MFR',
      contractAddress: '0xc2bFd8e028b342F0537aDC2bF310821c807c1312',
      decimals: 18,
      name: 'MFR Token'
    },
    MFG: {
      isMainToken: false,
      symbol: 'MFG',
      contractAddress: '0x3ef88816ebE8F50019e931bdFFB0e428A44a29B1',
      decimals: 18,
      name: 'MFG Token'
    }
  },
  moonriver: {
    USDC: {
      isMainToken: false,
      symbol: 'USDC',
      contractAddress: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
      decimals: 6,
      name: 'USD Coin'
    },
    DAI: {
      isMainToken: false,
      symbol: 'DAI',
      contractAddress: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
      decimals: 18,
      name: 'Dai Stablecoin'
    },
    MFAM: {
      isMainToken: false,
      symbol: 'MFAM',
      contractAddress: '0xBb8d88bcD9749636BC4D2bE22aaC4Bb3B01A58F1',
      decimals: 18,
      name: 'MFAM'
    },
    ZLK: {
      isMainToken: false,
      symbol: 'ZLK',
      contractAddress: '0x0f47ba9d9Bde3442b42175e51d6A367928A1173B',
      decimals: 18,
      name: 'Zenlink Network'
    },
    SOLAR: {
      isMainToken: false,
      symbol: 'SOLAR',
      contractAddress: '0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B',
      decimals: 18,
      name: 'SolarBeam'
    },
    FRAX: {
      isMainToken: false,
      symbol: 'FRAX',
      contractAddress: '0x1A93B23281CC1CDE4C4741353F3064709A16197d',
      decimals: 18,
      name: 'SolarBeam'
    },
    FXS: {
      isMainToken: false,
      symbol: 'FXS',
      contractAddress: '0x6f1D1Ee50846Fcbc3de91723E61cb68CFa6D0E98',
      decimals: 18,
      name: 'Frax Share'
    },
    CWS: {
      isMainToken: false,
      symbol: 'CWS',
      contractAddress: '0x6fc9651f45B262AE6338a701D563Ab118B1eC0Ce',
      decimals: 18,
      name: 'Crowns'
    },
    RIB: {
      isMainToken: false,
      symbol: 'RIB',
      contractAddress: '0xbD90A6125a84E5C512129D622a75CDDE176aDE5E',
      decimals: 18,
      name: 'RiverBoat'
    }
  },
  moonbeam: {
    USDC: {
      isMainToken: false,
      symbol: 'USDC',
      contractAddress: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
      decimals: 6,
      name: 'USD Coin'
    },
    BNB: {
      isMainToken: false,
      symbol: 'BNB',
      contractAddress: '0xc9BAA8cfdDe8E328787E29b4B078abf2DaDc2055',
      decimals: 18,
      name: 'Binance'
    },
    GLINT: {
      isMainToken: false,
      symbol: 'GLINT',
      contractAddress: '0xcd3B51D98478D53F4515A306bE565c6EebeF1D58',
      decimals: 18,
      name: 'Beamswap'
    },
    SHARE: {
      isMainToken: false,
      symbol: 'SHARE',
      contractAddress: '0x4204cAd97732282d261FbB7088e07557810A6408',
      decimals: 18,
      name: 'Beamshare'
    },
    BEANS: {
      isMainToken: false,
      symbol: 'BEANS',
      contractAddress: '0x65b09ef8c5A096C5Fd3A80f1F7369E56eB932412',
      decimals: 18,
      name: 'MoonBeans'
    },
    STELLA: {
      isMainToken: false,
      symbol: 'STELLA',
      contractAddress: '0x0E358838ce72d5e61E0018a2ffaC4bEC5F4c88d2',
      decimals: 18,
      name: 'StellaSwap'
    },
    xStella: {
      isMainToken: false,
      symbol: 'xStella',
      contractAddress: '0x06A3b410b681c82417A906993aCeFb91bAB6A080',
      decimals: 18,
      name: 'XStella'
    },
    veSOLAR: {
      isMainToken: false,
      symbol: 'veSOLAR',
      contractAddress: '0x0DB6729C03C85B0708166cA92801BcB5CAc781fC',
      decimals: 18,
      name: 'Vested SolarBeam'
    },
    FLARE: {
      isMainToken: false,
      symbol: 'FLARE',
      contractAddress: '0xE3e43888fa7803cDC7BEA478aB327cF1A0dc11a7',
      decimals: 18,
      name: 'Flare'
    },
    CSG: {
      isMainToken: false,
      symbol: 'CSG',
      contractAddress: '0x2Dfc76901bB2ac2A5fA5fc479590A490BBB10a5F',
      decimals: 18,
      name: 'Cougar'
    },
    WELL: {
      isMainToken: false,
      symbol: 'WELL',
      contractAddress: '0x511ab53f793683763e5a8829738301368a2411e3',
      decimals: 18,
      name: 'MoonWell Artemis'
    }
  },
  astar: {
    LDOT: {
      isMainToken: false,
      assetIndex: '18446744073709551618',
      symbol: 'LDOT',
      name: 'Liquid DOT',
      decimals: 10
    },
    ACA: {
      isMainToken: false,
      assetIndex: '18446744073709551616',
      symbol: 'ACA',
      name: 'Acala',
      decimals: 12
    },
    DOT: {
      isMainToken: false,
      assetIndex: '340282366920938463463374607431768211455',
      symbol: 'DOT',
      name: 'Polkadot',
      decimals: 10
    },
    aUSD: {
      isMainToken: false,
      assetIndex: '18446744073709551617',
      symbol: 'aUSD',
      name: 'Acala Dollar',
      decimals: 12
    },
    USDt: {
      isMainToken: false,
      assetIndex: '4294969280',
      symbol: 'USDt',
      name: 'Tether USD',
      decimals: 6
    }
  },
  shiden: {
    LKSM: {
      isMainToken: false,
      assetIndex: '18446744073709551619',
      symbol: 'LKSM',
      name: 'Liquid KSM',
      decimals: 12
    },
    MOVR: {
      isMainToken: false,
      assetIndex: '18446744073709551620',
      symbol: 'MOVR',
      name: 'Moonriver',
      decimals: 18
    },
    KSM: {
      isMainToken: false,
      assetIndex: '340282366920938463463374607431768211455',
      symbol: 'KSM',
      name: 'Kusama',
      decimals: 12
    },
    aUSD: {
      isMainToken: false,
      assetIndex: '18446744073709551616',
      symbol: 'aUSD',
      name: 'Acala Dollar',
      decimals: 12
    },
    KAR: {
      isMainToken: false,
      assetIndex: '18446744073709551618',
      symbol: 'KAR',
      name: 'Karura',
      decimals: 12
    }
  },
  astarEvm: {
    DOT: {
      isMainToken: false,
      symbol: 'DOT',
      contractAddress: '0xffffffffffffffffffffffffffffffffffffffff',
      decimals: 12,
      name: 'Polkadot'
    },
    USDT: {
      isMainToken: false,
      symbol: 'USDT',
      contractAddress: '0xFFFFFFFF000000000000000000000001000007C0',
      decimals: 6,
      name: 'Tether USD (USDT)',
      assetId: '4294969280'
    },
    aUSD: {
      isMainToken: false,
      symbol: 'aUSD',
      contractAddress: '0xfFFFFfFF00000000000000010000000000000001',
      decimals: 12,
      name: 'Acala Dollar'
    },
    ARSW: {
      isMainToken: false,
      symbol: 'ARSW',
      contractAddress: '0xde2578edec4669ba7f41c5d5d2386300bcea4678',
      decimals: 18,
      name: 'ArthSwap Token'
    },
    LAY: {
      isMainToken: false,
      symbol: 'LAY',
      contractAddress: '0xc4335B1b76fA6d52877b3046ECA68F6E708a27dd',
      decimals: 18,
      name: 'Lay Token'
    },
    BAI: {
      isMainToken: false,
      symbol: 'BAI',
      contractAddress: '0x733ebcc6df85f8266349defd0980f8ced9b45f35',
      decimals: 18,
      name: 'BAI Stablecoin'
    },
    ATID: {
      isMainToken: false,
      symbol: 'ATID',
      contractAddress: '0x5271d85ce4241b310c0b34b7c2f1f036686a6d7c',
      decimals: 18,
      name: 'ATID'
    },
    SRS: {
      isMainToken: false,
      symbol: 'SRS',
      contractAddress: '0x9448610696659de8f72e1831d392214ae1ca4838',
      decimals: 18,
      name: 'Sirius Finance'
    },
    ORU: {
      isMainToken: false,
      symbol: 'ORU',
      contractAddress: '0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f',
      decimals: 18,
      name: 'Orcus Token'
    },
    BNB: {
      isMainToken: false,
      symbol: 'BNB',
      contractAddress: '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
      decimals: 18,
      name: 'Binance Coin'
    },
    BUSD: {
      isMainToken: false,
      symbol: 'BUSD',
      contractAddress: '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
      decimals: 18,
      name: 'Binance USD'
    },
    CRV: {
      isMainToken: false,
      symbol: 'CRV',
      contractAddress: '0x7756a83563f0f56937A6FdF668E7D9F387c0D199',
      decimals: 18,
      name: 'Curve DAO Token'
    },
    DAI: {
      isMainToken: false,
      symbol: 'DAI',
      contractAddress: '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
      decimals: 18,
      name: 'Dai Stablecoin'
    },
    PKEX: {
      isMainToken: false,
      symbol: 'PKEX',
      contractAddress: '0x1fE622E91e54D6AD00B01917351Ea6081426764A',
      decimals: 18,
      name: 'PolkaEx'
    },
    SDN: {
      isMainToken: false,
      symbol: 'SDN',
      contractAddress: '0x1fE622E91e54D6AD00B01917351Ea6081426764A',
      decimals: 18,
      name: 'Shiden Network'
    },
    USDC: {
      isMainToken: false,
      symbol: 'USDC',
      contractAddress: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
      decimals: 6,
      name: 'USD Coin'
    },
    WBTC: {
      isMainToken: false,
      symbol: 'WBTC',
      contractAddress: '0xad543f18cff85c77e140e3e5e3c3392f6ba9d5ca',
      decimals: 8,
      name: 'Wrapped BTC'
    },
    WETH: {
      isMainToken: false,
      symbol: 'WETH',
      contractAddress: '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
      decimals: 18,
      name: 'Wrapped Ether'
    },
    KZY: {
      isMainToken: false,
      symbol: 'KZY',
      contractAddress: '0x3d4DCFD2B483549527f7611ccFecb40b47d0c17b',
      decimals: 18,
      name: 'Kazuya Token'
    },
    WASTR: {
      isMainToken: false,
      symbol: 'WASTR',
      contractAddress: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
      decimals: 18,
      name: 'Wrapped Astar'
    },
    'ARSW-LP': {
      isMainToken: false,
      symbol: 'ARSW-LP',
      contractAddress: '0x87988EbDE7E661F44eB3a586C5E0cEAB533a2d9C',
      decimals: 18,
      name: 'Arthswap LPs (ARSW-LP)'
    },
    KOS: {
      isMainToken: false,
      symbol: 'KOS',
      contractAddress: '0xbcF7aa4fC081f5670d9b8a1BdD1cFd98DCAeE6e6',
      decimals: 18,
      name: 'KaioShin Token'
    },
    PPC: {
      isMainToken: false,
      symbol: 'PPC',
      contractAddress: '0x34F79636a55d9961E47b7784eF460B021B499406',
      decimals: 18,
      name: 'Pepe Coin'
    }
  },
  shidenEvm: {
    USDT: {
      isMainToken: false,
      symbol: 'USDT',
      contractAddress: '0xFFFFFFFF000000000000000000000001000007C0',
      decimals: 6,
      name: 'Tether USD',
      assetId: '4294969280'
    },
    aUSD: {
      isMainToken: false,
      symbol: 'aUSD',
      contractAddress: '0xfFFfFFfF00000000000000010000000000000000',
      decimals: 12,
      name: 'Acala Dollar'
    },
    PKEX: {
      isMainToken: false,
      symbol: 'PKEX',
      contractAddress: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      decimals: 18,
      name: 'PolkaEx'
    },
    BNB: {
      isMainToken: false,
      symbol: 'BNB',
      contractAddress: '0x332730a4f6e03d9c55829435f10360e13cfa41ff',
      decimals: 18,
      name: 'Binance'
    },
    BUSD: {
      isMainToken: false,
      symbol: 'BUSD',
      contractAddress: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      decimals: 18,
      name: 'Binance-Peg BUSD Token'
    },
    JPYC: {
      isMainToken: false,
      symbol: 'JPYC',
      contractAddress: '0x735abe48e8782948a37c7765ecb76b98cde97b0f',
      decimals: 18,
      name: 'JPY Coin'
    },
    ETH: {
      isMainToken: false,
      symbol: 'ETH',
      contractAddress: '0x765277eebeca2e31912c9946eae1021199b39c61',
      decimals: 18,
      name: 'Ethereum'
    },
    USDC: {
      isMainToken: false,
      symbol: 'USDC',
      contractAddress: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      decimals: 6,
      name: 'USD Coin'
    },
    WSDN: {
      isMainToken: false,
      symbol: 'WSDN',
      contractAddress: '0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef',
      decimals: 18,
      name: 'Wrapped Shiden'
    },
    Kac: {
      isMainToken: false,
      symbol: 'Kac',
      contractAddress: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      decimals: 18,
      name: 'Kaco Token'
    },
    SHBI: {
      isMainToken: false,
      symbol: 'SHBI',
      contractAddress: '0xec0c789c6dc019b1c19f055edf938b369d235d2c',
      decimals: 18,
      name: 'SHINOBI'
    },
    SMS: {
      isMainToken: false,
      symbol: 'SMS',
      contractAddress: '0xec0c789c6dc019b1c19f055edf938b369d235d2c',
      decimals: 18,
      name: 'SafeMoonShiden'
    },
    STND: {
      isMainToken: false,
      symbol: 'STND',
      contractAddress: '0x722377A047e89CA735f09Eb7CccAb780943c4CB4',
      decimals: 18,
      name: 'Standard'
    },
    SRISE: {
      isMainToken: false,
      symbol: 'SRISE',
      contractAddress: '0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9',
      decimals: 18,
      name: 'SHIDENRISE'
    },
    FEGS: {
      isMainToken: false,
      symbol: 'FEGS',
      contractAddress: '0xa9b79AAB9d60e8e6d08D2cbAd56ff0De58ff8d41',
      decimals: 18,
      name: 'FEGSHIDEN'
    },
    KWIK: {
      isMainToken: false,
      symbol: 'KWIK',
      contractAddress: '0xa9b79AAB9d60e8e6d08D2cbAd56ff0De58ff8d41',
      decimals: 18,
      name: 'Kwikswap'
    }
  },
  genshiro: {
    EQD: {
      isMainToken: false,
      symbol: 'EQD',
      name: 'EQD',
      decimals: 9
    },
    BTC: {
      isMainToken: false,
      symbol: 'BTC',
      name: 'BTC',
      decimals: 9
    },
    ETH: {
      isMainToken: false,
      symbol: 'ETH',
      name: 'ETH',
      decimals: 9
    },
    DOT: {
      isMainToken: false,
      symbol: 'DOT',
      name: 'DOT',
      decimals: 9
    },
    EOS: {
      isMainToken: false,
      symbol: 'EOS',
      name: 'EOS',
      decimals: 9
    },
    KSM: {
      isMainToken: false,
      symbol: 'KSM',
      name: 'KSM',
      decimals: 9
    },
    CRV: {
      isMainToken: false,
      symbol: 'CRV',
      name: 'CRV',
      decimals: 9
    },
    EQ: {
      isMainToken: false,
      symbol: 'EQ',
      name: 'EQ',
      decimals: 9
    },
    GENS: {
      isMainToken: true,
      symbol: 'GENS',
      name: 'GENS',
      decimals: 9
    },
    DAI: {
      isMainToken: false,
      symbol: 'DAI',
      name: 'DAI',
      decimals: 9
    },
    USDT: {
      isMainToken: false,
      symbol: 'USDT',
      name: 'USDT',
      decimals: 9
    },
    BUSD: {
      isMainToken: false,
      symbol: 'BUSD',
      name: 'BUSD',
      decimals: 9
    },
    USDC: {
      isMainToken: false,
      symbol: 'USDC',
      name: 'USDC',
      decimals: 9
    },
    BNB: {
      isMainToken: false,
      symbol: 'BNB',
      name: 'BNB',
      decimals: 9
    },
    WBTC: {
      isMainToken: false,
      symbol: 'WBTC',
      name: 'WBTC',
      decimals: 9
    },
    HDOT: {
      isMainToken: false,
      symbol: 'HDOT',
      name: 'HDOT',
      decimals: 9
    },
    XDOT: {
      isMainToken: false,
      symbol: 'XDOT',
      name: 'XDOT',
      decimals: 9
    },
    XDOT2: {
      isMainToken: false,
      symbol: 'XDOT2',
      name: 'XDOT2',
      decimals: 9
    }
  },
  genshiro_testnet: {
    EQD: {
      isMainToken: false,
      symbol: 'EQD',
      name: 'EQD',
      decimals: 9
    },
    BTC: {
      isMainToken: false,
      symbol: 'BTC',
      name: 'BTC',
      decimals: 9
    },
    ETH: {
      isMainToken: false,
      symbol: 'ETH',
      name: 'ETH',
      decimals: 9
    },
    DOT: {
      isMainToken: false,
      symbol: 'DOT',
      name: 'DOT',
      decimals: 9
    },
    EOS: {
      isMainToken: false,
      symbol: 'EOS',
      name: 'EOS',
      decimals: 9
    },
    KSM: {
      isMainToken: false,
      symbol: 'KSM',
      name: 'KSM',
      decimals: 9
    },
    CRV: {
      isMainToken: false,
      symbol: 'CRV',
      name: 'CRV',
      decimals: 9
    },
    EQ: {
      isMainToken: false,
      symbol: 'EQ',
      name: 'EQ',
      decimals: 9
    },
    GENS: {
      isMainToken: true,
      symbol: 'GENS',
      name: 'GENS',
      decimals: 9
    },
    DAI: {
      isMainToken: false,
      symbol: 'DAI',
      name: 'DAI',
      decimals: 9
    },
    USDT: {
      isMainToken: false,
      symbol: 'USDT',
      name: 'USDT',
      decimals: 9
    },
    BUSD: {
      isMainToken: false,
      symbol: 'BUSD',
      name: 'BUSD',
      decimals: 9
    },
    USDC: {
      isMainToken: false,
      symbol: 'USDC',
      name: 'USDC',
      decimals: 9
    },
    BNB: {
      isMainToken: false,
      symbol: 'BNB',
      name: 'BNB',
      decimals: 9
    },
    WBTC: {
      isMainToken: false,
      symbol: 'WBTC',
      name: 'WBTC',
      decimals: 9
    },
    HDOT: {
      isMainToken: false,
      symbol: 'HDOT',
      name: 'HDOT',
      decimals: 9
    },
    XDOT: {
      isMainToken: false,
      symbol: 'XDOT',
      name: 'XDOT',
      decimals: 9
    },
    XDOT2: {
      isMainToken: false,
      symbol: 'XDOT2',
      name: 'XDOT2',
      decimals: 9
    }
  },
  equilibrium_parachain: {
    EQD: {
      isMainToken: false,
      symbol: 'EQD',
      name: 'EQD',
      decimals: 9
    },
    BTC: {
      isMainToken: false,
      symbol: 'BTC',
      name: 'BTC',
      decimals: 9
    },
    ETH: {
      isMainToken: false,
      symbol: 'ETH',
      name: 'ETH',
      decimals: 9
    },
    DOT: {
      isMainToken: false,
      symbol: 'DOT',
      name: 'DOT',
      decimals: 9
    },
    EOS: {
      isMainToken: false,
      symbol: 'EOS',
      name: 'EOS',
      decimals: 9
    },
    KSM: {
      isMainToken: false,
      symbol: 'KSM',
      name: 'KSM',
      decimals: 9
    },
    CRV: {
      isMainToken: false,
      symbol: 'CRV',
      name: 'CRV',
      decimals: 9
    },
    EQ: {
      isMainToken: true,
      symbol: 'EQ',
      name: 'EQ',
      decimals: 9
    },
    GENS: {
      isMainToken: false,
      symbol: 'GENS',
      name: 'GENS',
      decimals: 9
    },
    DAI: {
      isMainToken: false,
      symbol: 'DAI',
      name: 'DAI',
      decimals: 9
    },
    USDT: {
      isMainToken: false,
      symbol: 'USDT',
      name: 'USDT',
      decimals: 9
    },
    BUSD: {
      isMainToken: false,
      symbol: 'BUSD',
      name: 'BUSD',
      decimals: 9
    },
    USDC: {
      isMainToken: false,
      symbol: 'USDC',
      name: 'USDC',
      decimals: 9
    },
    BNB: {
      isMainToken: false,
      symbol: 'BNB',
      name: 'BNB',
      decimals: 9
    },
    WBTC: {
      isMainToken: false,
      symbol: 'WBTC',
      name: 'WBTC',
      decimals: 9
    },
    HDOT: {
      isMainToken: false,
      symbol: 'HDOT',
      name: 'HDOT',
      decimals: 9
    },
    XDOT: {
      isMainToken: false,
      symbol: 'XDOT',
      name: 'XDOT',
      decimals: 9
    },
    XDOT2: {
      isMainToken: false,
      symbol: 'XDOT2',
      name: 'XDOT2',
      decimals: 9
    }
  },
  crabEvm: {
    CRAB: {
      isMainToken: true,
      symbol: 'CRAB',
      decimals: 18,
      name: 'CRAB'
    },
    WCRAB: {
      isMainToken: false,
      symbol: 'WCRAB',
      contractAddress: '0x2d2b97ea380b0185e9fdf8271d1afb5d2bf18329',
      decimals: 18,
      name: 'Wrapped CRAB'
    },
    WCKTON: {
      isMainToken: false,
      symbol: 'WCKTON',
      contractAddress: '0x159933C635570D5042723359fbD1619dFe83D3f3',
      decimals: 18,
      name: 'Wrapped KTON'
    },
    xRING: {
      isMainToken: false,
      symbol: 'xRING',
      contractAddress: '0x7399Ea6C9d35124d893B8d9808930e9d3F211501',
      decimals: 9,
      name: 'Wrapped KTON'
    }
  },
  pangolinEvm: {
    PRING: {
      isMainToken: true,
      symbol: 'PRING',
      decimals: 18,
      name: 'PRING'
    },
    WCKTON: {
      isMainToken: false,
      symbol: 'WCKTON',
      contractAddress: '0x8809f9b3acef1da309f49b5ab97a4c0faa64e6ae',
      decimals: 18,
      name: 'Wrapped CKTON'
    },
    xORING: {
      isMainToken: false,
      symbol: 'xORING',
      contractAddress: '0xb142658bd18c560d8ea74a31c07297cecfecf949',
      decimals: 9,
      name: 'xORING'
    }
  },
  pioneer: {
    BIT: {
      isMainToken: false,
      symbol: 'BIT',
      decimals: 18,
      name: 'BIT',
      specialOption: { MiningResource: 0 }
    }
  },
  bitcountry: {
    BIT: {
      isMainToken: false,
      symbol: 'BIT',
      decimals: 18,
      name: 'BIT',
      specialOption: { MiningResource: 0 }
    }
  },
  statemint: {
    USDt: {
      isMainToken: false,
      symbol: 'USDt',
      decimals: 6,
      name: 'Tether USD',
      assetIndex: 1984
    }
  },
  ethereum: {
    ETH: {
      isMainToken: true,
      symbol: 'ETH',
      decimals: 18,
      name: 'ETH'
    }
  },
  binance: {
    BNB: {
      isMainToken: true,
      symbol: 'BNB',
      decimals: 18,
      name: 'BNB'
    }
  },
  boba: {
    BOBA: {
      isMainToken: false,
      contractAddress: '0xa18bF3994C0Cc6E3b63ac420308E5383f53120D7',
      symbol: 'BOBA',
      decimals: 18,
      name: 'BOBA'
    }
  },
  boba_rinkeby: {
    BOBA: {
      isMainToken: false,
      contractAddress: '0xF5B97a4860c1D81A1e915C40EcCB5E4a5E6b8309',
      symbol: 'BOBA',
      decimals: 18,
      name: 'BOBA'
    }
  },
  bobabeam: {
    GLMR: {
      isMainToken: false,
      contractAddress: '0x4200000000000000000000000000000000000023',
      symbol: 'GLMR',
      decimals: 18,
      name: 'GLMR'
    }
  }
};
