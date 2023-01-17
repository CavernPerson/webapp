import { borrowMarketQuery } from '@anchor-protocol/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useQuery, UseQueryResult } from 'react-query';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_QUERY_KEY } from '../../env';
import {
  BorrowMarketWithDisplay,
  withBorrowMarketTokenDisplay,
} from './utils/tokenDisplay';

import { useQueryWithTokenDisplay } from '../utils/tokenDisplay';

export function useBorrowMarketQuery(): UseQueryResult<
  BorrowMarketWithDisplay | undefined
> {
  const { contractAddress, queryClient, queryErrorReporter } =
    useAnchorWebapp();

  const borrowMarket = useQuery(
    [
      ANCHOR_QUERY_KEY.BORROW_MARKET,
      contractAddress.moneyMarket.market,
      contractAddress.moneyMarket.interestModel,
      contractAddress.moneyMarket.oracle,
      contractAddress.moneyMarket.overseer,
      contractAddress.native.usd,
    ],
    createQueryFn(borrowMarketQuery, queryClient!),
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: false,
      onError: queryErrorReporter,
      enabled: !!queryClient
    },
  );

  return useQueryWithTokenDisplay(borrowMarket, withBorrowMarketTokenDisplay);
}
