import {
  EarnEpochStates,
  earnEpochStatesQuery,
} from '@anchor-protocol/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useQuery, UseQueryResult } from 'react-query';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_QUERY_KEY } from '../../env';


export function useEarnEpochStatesQuery(): UseQueryResult<
  EarnEpochStates | undefined
> {
  const { queryClient, contractAddress, lastSyncedHeight, queryErrorReporter } =
    useAnchorWebapp();

  const result = useQuery(
    [
      ANCHOR_QUERY_KEY.EARN_EPOCH_STATES,
      contractAddress.moneyMarket.market,
      contractAddress.moneyMarket.overseer,
      lastSyncedHeight,
    ],
    createQueryFn(earnEpochStatesQuery, queryClient),
    {
      refetchInterval: 1000 * 60,
      keepPreviousData: true,
      onError: queryErrorReporter,
      enabled: !!queryClient,
    },
  );

  return result;
}
