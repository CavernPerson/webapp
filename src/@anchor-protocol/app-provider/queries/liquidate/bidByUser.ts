import { BidByUser, bidsByUserQuery } from '@anchor-protocol/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { CW20Addr, HumanAddr } from '@libs/types';
import { useAccount } from 'contexts/account';
import { useQuery, UseQueryResult } from 'react-query';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_QUERY_KEY } from '../../env';

export function useBidByUserByCollateralQuery(
  collateralToken: CW20Addr | undefined,
  startAfter?: HumanAddr,
  limit?: number,
): UseQueryResult<BidByUser | undefined> {
  const { queryClient, queryErrorReporter, contractAddress } =
    useAnchorWebapp();

  const { terraWalletAddress } = useAccount();

  const bidsByUserByCollateral = useQuery(
    [
      ANCHOR_QUERY_KEY.BID_POOLS_BY_USER,
      contractAddress.liquidation.liquidationQueueContract,
      collateralToken!,
      terraWalletAddress,
      startAfter,
      limit,
    ],
    createQueryFn(bidsByUserQuery, queryClient),
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
      enabled: !!queryClient && !!collateralToken,
    },
  );

  return bidsByUserByCollateral;
}
