import { HumanAddr, moneyMarket } from "@anchor-protocol/types";
import {
  QueryClient,
  wasmFetch,
  WasmQuery,
  WasmQueryData,
} from "@libs/query-client";

interface EarnEpochStatesWasmQuery {
  moneyMarketEpochState: WasmQuery<
    moneyMarket.market.EpochState,
    moneyMarket.market.EpochStateResponse
  >;
  overseerEpochState: WasmQuery<
    moneyMarket.overseer.EpochState,
    moneyMarket.overseer.EpochStateResponse
  >;
  overseerConfig: WasmQuery<
    moneyMarket.overseer.Config,
    moneyMarket.overseer.ConfigResponse
  >;
}

export type EarnEpochStates = WasmQueryData<EarnEpochStatesWasmQuery>;

export async function earnEpochStatesQuery(
  queryClient: QueryClient,
  moneyMarketContract: HumanAddr,
  overseerContract: HumanAddr,
  blockHeight: number
): Promise<EarnEpochStates> {
  return wasmFetch<EarnEpochStatesWasmQuery>({
    ...queryClient,
    id: `earn--epoch-states`,
    wasmQuery: {
      moneyMarketEpochState: {
        contractAddress: moneyMarketContract,
        query: {
          epoch_state: {
            block_height: blockHeight + 2,
          },
        },
      },
      overseerEpochState: {
        contractAddress: overseerContract,
        query: {
          epoch_state: {},
        },
      },
      overseerConfig: {
        contractAddress: overseerContract,
        query: {
          config: {},
        },
      },
    },
  });
}
