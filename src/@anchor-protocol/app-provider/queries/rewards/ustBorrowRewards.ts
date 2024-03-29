import {
  RewardsUstBorrowRewards,
  rewardsUstBorrowRewardsQuery,
} from "@anchor-protocol/app-fns";
import { EMPTY_QUERY_RESULT } from "@libs/app-provider";
import { createQueryFn } from "@libs/react-query-utils";
import { useAccount } from "contexts/account";
import { useQuery, UseQueryResult } from "react-query";
import { useAnchorWebapp } from "../../contexts/context";
import { ANCHOR_QUERY_KEY } from "../../env";

export function useRewardsUstBorrowRewardsQuery(): UseQueryResult<
  RewardsUstBorrowRewards | undefined
> {
  const { queryClient, contractAddress, queryErrorReporter } =
    useAnchorWebapp();

  const { connected, terraWalletAddress } = useAccount();

  const result = useQuery(
    [
      ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
      terraWalletAddress,
      contractAddress.moneyMarket.market,
    ],
    createQueryFn(rewardsUstBorrowRewardsQuery, queryClient!),
    {
      refetchInterval: 1000 * 60 * 1,
      keepPreviousData: true,
      onError: queryErrorReporter,
      enabled: connected && !!queryClient,
    }
  );

  return connected ? result : EMPTY_QUERY_RESULT;
}
