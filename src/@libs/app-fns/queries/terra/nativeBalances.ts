import { hiveFetch, QueryClient } from '@libs/query-client';
import {
  AUD,
  CAD,
  CHF,
  CNY,
  DKK,
  EUR,
  GBP,
  HKD,
  HumanAddr,
  IDR,
  INR,
  JPY,
  KRT,
  KRW,
  Luna,
  MNT,
  NativeDenom,
  NOK,
  Num,
  PHP,
  SDR,
  SEK,
  SGD,
  THB,
  Token,
  u,
  UST,
} from '@libs/types';

// language=graphql
const NATIVE_BALANCES_QUERY = `
  query ($walletAddress: String!) {
    nativeTokenBalances: BankBalancesAddress(Address: $walletAddress) {
      Result {
        Denom
        Amount
      }
    }
  }
`;

interface NativeBalancesQueryVariables {
  walletAddress: HumanAddr;
}

interface NativeBalancesQueryResult {
  nativeTokenBalances: {
    Result: Array<{ Denom: NativeDenom; Amount: u<Token> }>;
  };
}

interface LcdBankBalances {
  height: Num;
  result: Array<{ denom: NativeDenom; amount: u<Token> }>;
}

export interface NativeBalances {
  uUST: u<UST>;
  uAUD: u<AUD>;
  uCAD: u<CAD>;
  uCHF: u<CHF>;
  uCNY: u<CNY>;
  uDKK: u<DKK>;
  uEUR: u<EUR>;
  uGBP: u<GBP>;
  uHKD: u<HKD>;
  uIDR: u<IDR>;
  uINR: u<INR>;
  uJPY: u<JPY>;
  uKRW: u<KRW>;
  uMNT: u<MNT>;
  uNOK: u<NOK>;
  uPHP: u<PHP>;
  uSDR: u<SDR>;
  uSEK: u<SEK>;
  uSGD: u<SGD>;
  uTHB: u<THB>;
  uKRT: u<KRT>;
  uLuna: u<Luna>;
}

export const EMPTY_NATIVE_BALANCES: NativeBalances = {
  uUST: '0' as u<UST>,
  uAUD: '0' as u<AUD>,
  uCAD: '0' as u<CAD>,
  uCHF: '0' as u<CHF>,
  uCNY: '0' as u<CNY>,
  uDKK: '0' as u<DKK>,
  uEUR: '0' as u<EUR>,
  uGBP: '0' as u<GBP>,
  uHKD: '0' as u<HKD>,
  uIDR: '0' as u<IDR>,
  uINR: '0' as u<INR>,
  uJPY: '0' as u<JPY>,
  uKRW: '0' as u<KRW>,
  uMNT: '0' as u<MNT>,
  uNOK: '0' as u<NOK>,
  uPHP: '0' as u<PHP>,
  uSDR: '0' as u<SDR>,
  uSEK: '0' as u<SEK>,
  uSGD: '0' as u<SGD>,
  uTHB: '0' as u<THB>,
  uKRT: '0' as u<KRT>,
  uLuna: '0' as u<Luna>,
};

export async function terraNativeBalancesQuery(
  queryClient: QueryClient,
  walletAddr: HumanAddr | undefined,
): Promise<NativeBalances> {
  if (!walletAddr) {
    return EMPTY_NATIVE_BALANCES;
  }

  let balancesPromise: Promise<
    Array<{ denom: NativeDenom; amount: u<Token> }>
  >;

    if('lcdEndpoint' in queryClient){
      balancesPromise = queryClient
          .lcdFetcher<LcdBankBalances>(
            `${queryClient.lcdEndpoint}/bank/balances/${walletAddr}`,
            queryClient.requestInit,
          )
          .then(({ result }) => {
            return result.map(({ denom, amount }) => ({
              amount,
              denom: denom
                .replace(
                  'ibc/D70F005DE981F6EFFB3AD1DF85601258D1C01B9DEDC1F7C1B95C0993E83CF389',
                  'uusd',
                )
                .replace(
                  'ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4',
                  'uusd',
                ) as NativeDenom,
            }));
          })
    }else if ("hiveEndpoint" in queryClient){
      balancesPromise = hiveFetch<any, NativeBalancesQueryVariables, NativeBalancesQueryResult>(
          {
            ...queryClient,
            id: `native-balances=${walletAddr}`,
            variables: {
              walletAddress: walletAddr,
            },
            wasmQuery: {},
            query: NATIVE_BALANCES_QUERY,
          },
        ).then(({ nativeTokenBalances }) => {
          return nativeTokenBalances.Result.map(({ Denom, Amount }) => ({
            denom: Denom.replace(
              'ibc/D70F005DE981F6EFFB3AD1DF85601258D1C01B9DEDC1F7C1B95C0993E83CF389',
              'uusd',
            ).replace(
              'ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4',
              'uusd',
            ) as NativeDenom,
            amount: Amount,
          }));
        });
    }else {
      balancesPromise = queryClient.batchFetcher!.bank.allBalances(walletAddr)
      .then((coins) => {
          return coins.map(({ denom, amount }) => ({
            denom: denom.replace(
              'ibc/D70F005DE981F6EFFB3AD1DF85601258D1C01B9DEDC1F7C1B95C0993E83CF389',
              'uusd',
            ).replace(
              'ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4',
              'uusd',
            ) as NativeDenom,
            amount: amount as u<Token<string>>,
          }));
        });
    }


  const balances = await balancesPromise;

  const result = { ...EMPTY_NATIVE_BALANCES };
  for (const { denom, amount } of balances) {
    switch (denom) {
      case 'uusd':
        result.uUST = amount as u<UST>;
        break;
      case 'uluna':
        result.uLuna = amount as u<Luna>;
        break;
      case 'uaud':
        result.uAUD = amount as u<AUD>;
        break;
      case 'ucad':
        result.uCAD = amount as u<CAD>;
        break;
      case 'uchf':
        result.uCHF = amount as u<CHF>;
        break;
      case 'ucny':
        result.uCNY = amount as u<CNY>;
        break;
      case 'udkk':
        result.uDKK = amount as u<DKK>;
        break;
      case 'ueur':
        result.uEUR = amount as u<EUR>;
        break;
      case 'ugbp':
        result.uGBP = amount as u<GBP>;
        break;
      case 'uhkd':
        result.uHKD = amount as u<HKD>;
        break;
      case 'uidr':
        result.uIDR = amount as u<IDR>;
        break;
      case 'uinr':
        result.uINR = amount as u<INR>;
        break;
      case 'ujpy':
        result.uJPY = amount as u<JPY>;
        break;
      case 'ukrw':
        result.uKRW = amount as u<KRW>;
        break;
      case 'umnt':
        result.uMNT = amount as u<MNT>;
        break;
      case 'unok':
        result.uNOK = amount as u<NOK>;
        break;
      case 'uphp':
        result.uPHP = amount as u<PHP>;
        break;
      case 'usdr':
        result.uSDR = amount as u<SDR>;
        break;
      case 'usek':
        result.uSEK = amount as u<SEK>;
        break;
      case 'usgd':
        result.uSGD = amount as u<SGD>;
        break;
      case 'uthb':
        result.uTHB = amount as u<THB>;
        break;
      case 'ukrt':
        result.uKRT = amount as u<KRT>;
        break;
    }
  }

  return result;
}

export function pickNativeBalance<T extends Token>(
  denom: NativeDenom,
  balances: NativeBalances,
): u<T> {
  switch (denom) {
    case 'uusd':
      return balances.uUST as u<T>;
    case 'uluna':
      return balances.uLuna as u<T>;
    case 'uaud':
      return balances.uAUD as u<T>;
    case 'ucad':
      return balances.uCAD as u<T>;
    case 'uchf':
      return balances.uCHF as u<T>;
    case 'ucny':
      return balances.uCNY as u<T>;
    case 'udkk':
      return balances.uDKK as u<T>;
    case 'ueur':
      return balances.uEUR as u<T>;
    case 'ugbp':
      return balances.uGBP as u<T>;
    case 'uhkd':
      return balances.uHKD as u<T>;
    case 'uidr':
      return balances.uIDR as u<T>;
    case 'uinr':
      return balances.uINR as u<T>;
    case 'ujpy':
      return balances.uJPY as u<T>;
    case 'ukrw':
      return balances.uKRW as u<T>;
    case 'umnt':
      return balances.uMNT as u<T>;
    case 'unok':
      return balances.uNOK as u<T>;
    case 'uphp':
      return balances.uPHP as u<T>;
    case 'usdr':
      return balances.uSDR as u<T>;
    case 'usek':
      return balances.uSEK as u<T>;
    case 'usgd':
      return balances.uSGD as u<T>;
    case 'uthb':
      return balances.uTHB as u<T>;
    case 'ukrt':
      return balances.uKRT as u<T>;
    default:
      return '0' as u<T>;
  }
}
