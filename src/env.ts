import {
  ANCHOR_QUERY_KEY,
  ANCHOR_TX_KEY,
  AnchorConstants,
  AnchorContractAddress,
} from '@anchor-protocol/app-provider';
import { CW20Addr, HumanAddr } from '@anchor-protocol/types';
import { TERRA_QUERY_KEY, TxRefetchMap } from '@libs/app-provider';
import { Gas, NativeDenom, Rate } from '@libs/types';
import { NetworkInfo } from '@terra-money/wallet-provider';

// ---------------------------------------------
// style
// ---------------------------------------------
export const screen = {
  mobile: { max: 530 },
  // mobile : @media (max-width: ${screen.mobile.max}px)
  tablet: { min: 531, max: 830 },
  // tablet : @media (min-width: ${screen.tablet.min}px) and (max-width: ${screen.tablet.max}px)
  pc: { min: 831, max: 1439 },
  // pc : @media (min-width: ${screen.pc.min}px)
  monitor: { min: 1440 },
  // monitor : @media (min-width: ${screen.pc.min}px) and (max-width: ${screen.pc.max}px)
  // huge monitor : @media (min-width: ${screen.monitor.min}px)
} as const;

export const BODY_MARGIN_TOP = {
  pc: 50,
  mobile: 10,
  tablet: 20,
};

export const mobileHeaderHeight = 68;

// ---------------------------------------------
// links
// ---------------------------------------------
export const links = {
  forum: 'https://forum.cavernprotocol.com/',
  docs: {
    earn: 'https://docs.cavernprotocol.com/user-guide/webapp/earn',
    borrow: 'https://docs.cavernprotocol.com/user-guide/webapp/borrow',
    bond: 'https://docs.cavernprotocol.com/user-guide/webapp/bond',
    gov: 'https://docs.cavernprotocol.com/user-guide/webapp/govern',
    liquidate: 'https://docs.cavernprotocol.com/user-guide/webapp/liquidate',
  },
} as const;

// ---------------------------------------------
// chain
// ---------------------------------------------
export function ANCHOR_QUERY_CLIENT(network: NetworkInfo): 'lcd' | 'hive' {
  return 'lcd';
}

export function ANCHOR_CONSTANTS(network: NetworkInfo): AnchorConstants {
  return {
    gasWanted: 1_000_000 as Gas,
    fixedGas: 1_671_053 as Gas,
    blocksPerYear: 4_656_810,
    gasAdjustment: 1.6 as Rate<number>,
    airdropGasWanted: 300_000 as Gas,
    airdropGas: 334_211 as Gas,
    bondGasWanted: 1_600_000 as Gas,
    astroportGasWanted: 1_600_000 as Gas,
    depositFeeAmount: 0.005
  };
}

const PHOENIX_CONTRACT_ADDRESS = {

  bLunaHub: "terra1c4x3x5ptxw4yy436rvz5u9cru6868ksxr95gsyya55ycgll0xdas0g7htx",
  bLunaReward: "terra1w7ssgvtetdzczyl98pdxvs79nw9g6rjejt0urxegm30dukddyesqy0g95n",
  bLunaToken: "terra170e8mepwmndwfgs5897almdewrt6phnkksktlf958s90eh055xvsrndvku",
  bLunaValidatorsRegistry: "terra1ftwj8jk5k5hfg0ypaj54k8ha4kzjfnrrlpgd2xsmpsalgsud957qv6q367",
  mmMarket: "terra1zqlcp3aty4p4rjv96h6qdascdn953v6crhwedu5vddxjnp349upscluex6",
  mmOracle: "terra1gp3a4cz9magxuvj6n0x8ra8jqc79zqvquw85xrn0suwvml2cqs4q4l7ss7",
  mmOverseer: "terra1l6rq7905263uqmayurtulzc09sfcgxdedsfen7m0y6wf28s49tvqdkwau9",  

  mmCustody: "terra1ly8gd96kc8rwhjhpvx64jr9qd3nkn8yrm0gflplk5vhyff0fllxqc43w3k",

  mmLiquidationQueue: "terra12p4rhaywjdm8wtyrkdj6z2ley53sl8dkc38mv3p4jvnjqp4we7pqd0526w",
  aUSDC: "terra1gwdxyqtu75es0x5l6cd9flqhh87zjtj7qdankayyr0vtt7s9w4ssm7ds8m",
  mmInterestModel: "terra12m5q4cs22dj9sz5k56cdnwr48mzjqqf7w8sxsg35vxmk2gdtf2fssgduva",
  mmDistributionModel: "terra175xavlptc4fhgtvzmq95z6s7wnt4larh5xp6nufz6xwwec7gygpsjw08v6",

  stableDenom: "ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4",

  bLunaLunaPair: '',
  bLunaLunaLPToken: '',
  ancUstPair: '',
  ancUstLPToken: '',
  gov: '',
  distributor: '',
  collector:'',
  community: '',
  staking: '',
  ANC: '',
  airdrop: '',
  investor_vesting: '',
  team_vesting: '',
  terraswapFactory: '',

  astroportGenerator: '',
  vesting: '',
  astroUstPair: '',
  usd: "ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4",
  documentsMain: 'terra1cx38qvyv4mj9hrn6p6m4fj7vhj726t5dg3ldpeupkkgel495ngnq5rtplq',
  feeAddress: "terra1ytj0hhw39j88qsx4yapsr6ker83jv3aj354gmj",
  tokenId:{
    whitePaper: "whitepaper"
  }
};

const PISCO_CONTRACT_ADDRESS = {
  bLunaHub: 'terra1m8unfkpp4kdnc693yxnl6wgvu5wkeps9ages9p4034gjgtvmk22qg9le2l',
  bLunaToken:
    'terra1wmmjpacj6c7eeacyk0jnugtqe24cxw7mvq0zwvc7l3ke2au8u4nqfnd76k',
  mmInterestModel:
    'terra1prajqsqnwpshesf38nh4hhqsjuudczkf6hgw899w8nyd4ll9chuqst4xmd',
  mmOracle: 'terra1avsapmp5u9g8n9zefqgg0vjcttjtlv02fm7ynr0l6qw0sl736t3s4rcy4v',
  mmMarket: 'terra1fpvh7a5fe42403w72ggvq2vg963d2vjsgyn2txmplwjvcqp6avpsflckww',
  mmOverseer:
    'terra1smv0s7d4g847amtqtgjm2kkkhzgcutmfhpmj6znt5eac8ej0ddvq7s7pcq',
  mmLiquidationQueue:
    'terra1k5c0l7t3wvu4vhedv870n9748ycw53h6qmrrr6x76pg7ptdjdw0sudqt3q',
  aUSDC: 'terra1phktkrnr99m56gqjk37n0xlr7vk2zp3p835tqtu6v2sgzl4tet4srypktp',
  mmCustody:
    'terra1gd5wqk7tq66je4y0msd5ftayp3u8yqq3jzj3ryng2lnwr37lk3gq047m3z',
  bLunaReward:
    'terra1ml375eu9c0k04muchdt3csjwdcmspqz4cn6qkldmfhav0jd60fes7kwn5n',
  bLunaValidatorsRegistry:
    'terra1nvwugmg05x29a27pdjztcjmun0st0wc0e5lzfffesn9elgmetvtsx9kkwl',
  mmDistributionModel:
    'terra1wf2dx5exzllqznx6yd5ed8kahe006uternlvu752paymy6nnq6as07jdg5',

  bLunaLunaPair: '',
  bLunaLunaLPToken: '',
  ancUstPair: '',
  ancUstLPToken: '',
  gov: '',
  distributor: '',
  collector: '',
  community: '',
  staking: '',
  ANC: '',
  airdrop: '',
  investor_vesting: '',
  team_vesting: '',
  terraswapFactory: '',
  astroportGenerator: '',
  vesting: '',
  astroUstPair: '',
  usd: 'ibc/D70F005DE981F6EFFB3AD1DF85601258D1C01B9DEDC1F7C1B95C0993E83CF389',
  documentsMain: 'terra1ye9s4w39aaqd5e948tcvwddl77vr7dv2tyyrd9q7fzm8hnkgcuqqaqzwz4',
  feeAddress: "terra1qyudfva64yk9sye5x7pp654hl0pvk4k0gdzv0k",
  tokenId:{
    whitePaper: "whitepaper"
  }
};

export const ANCHOR_CONTRACT_ADDRESS = (
  network: NetworkInfo,
): AnchorContractAddress => {
  const addressMap = network.chainID.startsWith('pisco')
    ? PISCO_CONTRACT_ADDRESS
    : PHOENIX_CONTRACT_ADDRESS;

  return {
    bluna: {
      reward: addressMap.bLunaReward as HumanAddr,
      hub: addressMap.bLunaHub as HumanAddr,
      airdropRegistry: addressMap.airdrop as HumanAddr,
      validatorsRegistry: addressMap.bLunaValidatorsRegistry as HumanAddr,
      custody: addressMap.mmCustody as HumanAddr,
    },
    moneyMarket: {
      market: addressMap.mmMarket as HumanAddr,
      overseer: addressMap.mmOverseer as HumanAddr,
      oracle: addressMap.mmOracle as HumanAddr,
      interestModel: addressMap.mmInterestModel as HumanAddr,
      distributionModel: addressMap.mmDistributionModel as HumanAddr,
    },
    liquidation: {
      liquidationQueueContract: addressMap.mmLiquidationQueue as HumanAddr,
    },
    anchorToken: {
      gov: addressMap.gov as HumanAddr,
      staking: addressMap.staking as HumanAddr,
      community: addressMap.community as HumanAddr,
      distributor: addressMap.distributor as HumanAddr,
      investorLock: addressMap.investor_vesting as HumanAddr,
      teamLock: addressMap.team_vesting as HumanAddr,
      collector: addressMap.collector as HumanAddr,
      vesting: addressMap.vesting as HumanAddr,
    },
    terraswap: {
      factory: addressMap.terraswapFactory as HumanAddr,
      blunaLunaPair: addressMap.bLunaLunaPair as HumanAddr,
    },
    astroport: {
      generator: addressMap.astroportGenerator as HumanAddr,
      astroUstPair: addressMap.astroUstPair as HumanAddr,
      ancUstPair: addressMap.ancUstPair as HumanAddr,
    },
    cw20: {
      bLuna: addressMap.bLunaToken as CW20Addr,
      //bEth: addressMap.bEthToken as CW20Addr,
      aUST: addressMap.aUSDC as CW20Addr,
      ANC: addressMap.ANC as CW20Addr,
      AncUstLP: addressMap.ancUstLPToken as CW20Addr,
      bLunaLunaLP: addressMap.bLunaLunaLPToken as CW20Addr,
    },
    crossAnchor: {
      core: '' as HumanAddr,
    },
    native: {
      usd: addressMap.usd as NativeDenom,
    },
    documents: {
      mainAddress: addressMap.documentsMain as string,
      tokens:{
        whitepaper: addressMap.tokenId.whitePaper as string,
      }
    },
    admin:{
      feeAddress: addressMap.feeAddress as HumanAddr,
    }
  };
};

export const ANCHOR_INDEXER_API_ENDPOINTS = (network: NetworkInfo): string => {
  if (network.chainID.startsWith('pisco')) {
    return 'https://api.cavernprotocol.com/api/testnet';
    //return 'http://localhost:3000/api/testnet';
  } else if (network.chainID.startsWith('phoenix')) {
    return 'https://api.cavernprotocol.com/api/mainnet';
  } else {
    return 'https://anchor-services-anchor-protocol.vercel.app/api';
  }
};

// ---------------------------------------------
// query refetch
// ---------------------------------------------
export const ANCHOR_TX_REFETCH_MAP: TxRefetchMap = {
  [ANCHOR_TX_KEY.EARN_DEPOSIT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.EARN_EPOCH_STATES,
    {
      queryKey: ANCHOR_QUERY_KEY.EARN_TRANSACTION_HISTORY,
      wait: 1000 * 3,
    },
  ],
  [ANCHOR_TX_KEY.EARN_WITHDRAW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.EARN_EPOCH_STATES,
    {
      queryKey: ANCHOR_QUERY_KEY.EARN_TRANSACTION_HISTORY,
      wait: 1000 * 3,
    },
  ],
  [ANCHOR_TX_KEY.BORROW_BORROW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_REPAY]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_PROVIDE_COLLATERAL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_REDEEM_COLLATERAL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BASSET_IMPORT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BASSET_EXPORT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_MINT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_BURN]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_SWAP]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BOND_CLAIMABLE_REWARDS,
    ANCHOR_QUERY_KEY.BOND_BETH_CLAIMABLE_REWARDS,
  ],
  [ANCHOR_TX_KEY.BOND_WITHDRAW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BOND_WITHDRAWABLE_AMOUNT,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_PROVIDE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_WITHDRAW]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    TERRA_QUERY_KEY.ASTROPORT_DEPOSIT,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.ANC_LP_STAKING_STATE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    TERRA_QUERY_KEY.ASTROPORT_DEPOSIT,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.ANC_LP_STAKING_STATE,
  ],
  [ANCHOR_TX_KEY.ANC_BUY]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_SELL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_GOVERNANCE_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.ANC_GOVERNANCE_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.GOV_CREATE_POLL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.GOV_POLLS,
    ANCHOR_QUERY_KEY.GOV_MYPOLLS,
  ],
  [ANCHOR_TX_KEY.GOV_VOTE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.GOV_POLL,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.GOV_VOTERS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_ALL_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_ANC_UST_LP_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_UST_BORROW_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.AIRDROP_CLAIM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.AIRDROP_CHECK,
  ],
  [ANCHOR_TX_KEY.TERRA_SEND]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES,
  ],
};

// build: force re-build trigger - 22.01.03-1
