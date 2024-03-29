import { MarketState, marketStateQuery } from "@anchor-protocol/app-fns";
import { createQueryFn } from "@libs/react-query-utils";
import { useQuery, UseQueryResult } from "react-query";
import { useAnchorWebapp } from "../../contexts/context";
import { ANCHOR_QUERY_KEY } from "../../env";

export function useMarketStateQuery(): UseQueryResult<MarketState | undefined> {
  const { queryClient, contractAddress, queryErrorReporter } =
    useAnchorWebapp();

  const result = useQuery(
    [ANCHOR_QUERY_KEY.MARKET_STATE, contractAddress.moneyMarket.market],
    createQueryFn(marketStateQuery, queryClient!),
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
      enabled: !!queryClient,
    }
  );

  return result;
}
