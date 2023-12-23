import { DateTime, HumanAddr, moneyMarket, Rate } from "@anchor-protocol/types";
import { QueryClient, wasmFetch, WasmQuery } from "@libs/query-client";
import big from "big.js";
import { MarketState } from "../market/state";

export interface BorrowAPYData {
  borrowerDistributionAPYs: Array<{
    DistributionAPY: Rate;
    Height: number;
    Timestamp: DateTime;
  }>;

  govRewards: Array<{
    CurrentAPY: Rate;
    Timestamp: DateTime;
    Height: number;
  }>;

  lpRewards: Array<LPReward>;
}

type LPReward = {
  apr: Rate<number>;
  apy: Rate<number>;
};

interface MarketStateWasmQuery {
  marketState: WasmQuery<
    moneyMarket.market.State,
    moneyMarket.market.StateResponse
  >;
}

interface OverseerEpochStateWasmQuery {
  epochState: WasmQuery<
    moneyMarket.overseer.EpochState,
    moneyMarket.overseer.EpochStateResponse
  >;
}
interface OverseerConfigWasmQuery {
  overseerConfig: WasmQuery<
    moneyMarket.overseer.Config,
    moneyMarket.overseer.ConfigResponse
  >;
}

export async function borrowAPYQuery(
  queryClient: QueryClient,
  blocksPerYear: number,
  lastSyncedHeight: number,
  mmMarketContract: HumanAddr,
  mmOverseerContract: HumanAddr
): Promise<BorrowAPYData> {
  // We simply need to query the chain to get the borrower rewards that were just distributed
  // And compare that to the total liabilities
  // Those informations are located in the state variable of the market function

  // Now we evolve from that and rather compute the future APY,
  // We can simply query the market contract, we added a function just for that.

  const [
    {epochState},
    {overseerConfig}
    ]  = await Promise.all([
      wasmFetch<OverseerEpochStateWasmQuery>({...queryClient,
      id: `borrow--market-epoch-state-current`,
      wasmQuery: {
        epochState: {
          contractAddress: mmOverseerContract,
          query: {
            epoch_state: {},
          },
        },
      },
    }),
      wasmFetch<OverseerConfigWasmQuery>({...queryClient,
      id: `borrow--market-config-current`,
      wasmQuery: {
        overseerConfig: {
          contractAddress: mmOverseerContract,
          query: {
            config: {},
          },
        },
      },
    })
  ]);

  const { marketState } =
    await wasmFetch<MarketStateWasmQuery>({
      ...queryClient,
      id: `borrow--market-state-current`,
      wasmQuery: {
        marketState: {
          contractAddress: mmMarketContract,
          query: {
            state: {
              block_height:epochState.last_executed_height + overseerConfig.epoch_period,   
            },
          },
        },
      },
    });


    console.log(marketState.prev_borrower_incentives, epochState.last_executed_height,overseerConfig.epoch_period);
  // State is updated around every 3 hrs
  const rewardsAPY = big(marketState.prev_borrower_incentives)
    .mul(8 * 365)
    .div(marketState.total_liabilities);

  const govRewards = {
    CurrentAPY: "0" as Rate<string>,
    Timestamp: Date.now() as DateTime,
    Height: 1,
  };

  const ancAstroLPRewards = {
    apr: 0 as Rate<number>,
    apy: 0 as Rate<number>,
  };

  return {
    borrowerDistributionAPYs: [
      {
        DistributionAPY: rewardsAPY.toString() as Rate,
        Timestamp: Date.now() as DateTime,
        Height: lastSyncedHeight,
      },
    ],
    govRewards: [govRewards],
    lpRewards: [ancAstroLPRewards as LPReward],
  };
}
