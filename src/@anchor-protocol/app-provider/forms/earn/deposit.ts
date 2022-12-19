import {
  earnDepositForm,
  EarnDepositFormStates,
} from '@anchor-protocol/app-fns';
import { useAnchorWebapp } from '@anchor-protocol/app-provider/contexts/context';
import { UST } from '@anchor-protocol/types';
import { useFeeEstimationFor, useUstTax } from '@libs/app-provider';
import { formatTokenInput } from '@libs/formatter';
import { useForm } from '@libs/use-form';
import { Coin, Coins, MsgExecuteContract, MsgSend } from '@terra-money/terra.js';
import { useAccount } from 'contexts/account';
import { useBalances } from 'contexts/balances';
import { useCallback } from 'react';
import big from "big.js";

export interface EarnDepositFormReturn extends EarnDepositFormStates {
  updateDepositAmount: (depositAmount: UST) => void;
}

export function useEarnDepositForm(): EarnDepositFormReturn {
  const { connected, terraWalletAddress } = useAccount();
  const { contractAddress, constants } = useAnchorWebapp();

  const [estimatedFee, estimatedFeeError, estimateFee] =
    useFeeEstimationFor(terraWalletAddress);

  const { uUST } = useBalances();

  const { taxRate, maxTax } = useUstTax();

  const [input, states] = useForm(
    earnDepositForm,
    {
      isConnected: connected,
      txFee: estimatedFee,
      estimatedFeeError,
      taxRate: taxRate,
      maxTaxUUSD: maxTax,
      userUUSTBalance: uUST,
      depositFeeAmount: constants.depositFeeAmount,
    },
    () => ({ depositAmount: '' as UST }),
  );

  const updateDepositAmount = useCallback(
    (depositAmount: UST) => {
      input({
        depositAmount,
      });
      if (terraWalletAddress) {
        estimateFee([
          new MsgExecuteContract(
            terraWalletAddress,
            contractAddress.moneyMarket.market,
            {
              // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L65
              deposit_stable: {},
            },

            // coins
            new Coins([
              new Coin(
                contractAddress.native.usd,
                formatTokenInput(big(depositAmount).mul((1 - constants.depositFeeAmount)).toString() as UST<string>),
              ),
            ]),
          ),
        new MsgSend(terraWalletAddress, contractAddress.admin.feeAddress, new Coins([
              new Coin(
                contractAddress.native.usd,
                formatTokenInput(big(depositAmount).mul(constants.depositFeeAmount).toString() as UST<string>),
              ),
            ]),)
        ]);      
      }
    },
    [
      input,
      estimateFee,
      terraWalletAddress,
      contractAddress.moneyMarket.market,
      contractAddress.native.usd,
    ],
  );

  return {
    ...states,
    updateDepositAmount,
  };
}
