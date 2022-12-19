import { Gas } from '@anchor-protocol/types';
import { AppConstants, AppContractAddress } from '@libs/app-provider';
import { CW20Addr, HumanAddr, NativeDenom } from '@libs/types';

export interface AnchorContractAddress extends AppContractAddress {
  bluna: {
    reward: HumanAddr;
    hub: HumanAddr;
    airdropRegistry: HumanAddr;
    validatorsRegistry: HumanAddr;
    custody: HumanAddr;
  };
  crossAnchor: {
    core: HumanAddr;
  };
  moneyMarket: {
    market: HumanAddr;
    overseer: HumanAddr;
    oracle: HumanAddr;
    interestModel: HumanAddr;
    distributionModel: HumanAddr;
  };
  liquidation: {
    liquidationQueueContract: HumanAddr;
  };
  anchorToken: {
    gov: HumanAddr;
    staking: HumanAddr;
    community: HumanAddr;
    distributor: HumanAddr;
    investorLock: HumanAddr;
    teamLock: HumanAddr;
    collector: HumanAddr;
    vesting: HumanAddr;
  };
  terraswap: {
    factory: HumanAddr;
    blunaLunaPair: HumanAddr;
  };
  astroport: {
    generator: HumanAddr;
    astroUstPair: HumanAddr;
    ancUstPair: HumanAddr;
  };
  cw20: {
    bLuna: CW20Addr;
    aUST: CW20Addr;
    ANC: CW20Addr;
    AncUstLP: CW20Addr;
    bLunaLunaLP: CW20Addr;
  };
  native: {
    usd: NativeDenom
  };
  documents:{
    mainAddress: string;
    tokens: {
      whitepaper: string;
    }
  };
  admin: {
    feeAddress: string;
  }
}

export interface AnchorConstants extends AppConstants {
  airdropGasWanted: Gas;
  airdropGas: Gas;
  bondGasWanted: Gas;
  astroportGasWanted: Gas;
}
