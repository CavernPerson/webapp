import { cw20, HumanAddr, Token } from "@libs/types";
import { hiveFetch } from "../hive";
import { WasmQuery, WasmQueryInput } from "../interface";
import { lcdFetch } from "../lcd/client";

describe("wasm query test", () => {
  test("should get wasm json result from lcd endpoint", async () => {
    const aLunaTokenAddr = "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x";

    const balanceQuery = {
      balance: { address: "terra12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9" },
    };

    const res = await fetch(
      `https://pisco-lcd.terra.dev/wasm/contracts/${aLunaTokenAddr}/store?query_msg=${JSON.stringify(
        balanceQuery
      )}`
    );
    const data = await res.json();

    expect(typeof +data.result.balance).toBe("number");
  });

  interface TestQuery {
    aluna: WasmQuery<cw20.Balance, cw20.BalanceResponse<Token>>;
    beth: WasmQuery<cw20.Balance, cw20.BalanceResponse<Token>>;
  }

  const testQuery: WasmQueryInput<TestQuery> = {
    aluna: {
      contractAddress:
        "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x" as HumanAddr,
      query: {
        balance: {
          address: "terra12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9" as HumanAddr,
        },
      },
    },
    beth: {
      contractAddress:
        "terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l" as HumanAddr,
      query: {
        balance: {
          address: "terra12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9" as HumanAddr,
        },
      },
    },
  };

  test("should get wasm json result from lcd client", async () => {
    const result = await lcdFetch<TestQuery>({
      wasmQuery: testQuery,
      lcdEndpoint: "https://pisco-lcd.terra.dev",
    });

    expect(typeof +result.aluna.balance).toBe("number");
    expect(typeof +result.beth.balance).toBe("number");
  });

  test("should get wasm json result from hive client", async () => {
    const result = await hiveFetch<TestQuery, unknown, unknown>({
      wasmQuery: testQuery,
      hiveEndpoint: "https://pisco-mantle.terra.dev",
      variables: {},
    });

    expect(typeof +result.aluna.balance).toBe("number");
    expect(typeof +result.beth.balance).toBe("number");
  });
});
