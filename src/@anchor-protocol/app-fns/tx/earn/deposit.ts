import {
  formatAUSTWithPostfixUnits,
  formatUSTWithPostfixUnits,
} from '@anchor-protocol/notation';
import {
  aUST,
  UST,
  Gas,
  HumanAddr,
  Rate,
  u,
  NativeDenom,
} from '@anchor-protocol/types';
import {
  pickAttributeValue,
  pickEvent,
  pickRawLog,
  TxResultRendering,
  TxStreamPhase,
} from '@libs/app-fns';
import {
  _catchTxError,
  _createTxOptions,
  _pollTxInfo,
  _postTx,
  TxHelper,
} from '@libs/app-fns/tx/internal';
import { floor } from '@libs/big-math';
import {
  demicrofy,
  formatFluidDecimalPoints,
  formatTokenInput,
} from '@libs/formatter';
import { QueryClient } from '@libs/query-client';
import { pipe } from '@rx-stream/pipe';
import {
  Coin,
  Coins,
  CreateTxOptions,
  Fee,
  MsgExecuteContract,
  MsgSend,
} from '@terra-money/terra.js';
import { NetworkInfo, TxResult } from '@terra-money/wallet-provider';
import big, { BigSource } from 'big.js';
import { Observable } from 'rxjs';

export function earnDepositTx($: {
  walletAddr: HumanAddr;
  marketAddr: HumanAddr;
  depositAmount: UST;
  stableDenom: NativeDenom;
  depositFeeAmount: number;
  depositFeeAddress: HumanAddr;

  gasFee: Gas;
  gasAdjustment: Rate<number>;
  txFee: u<UST>;
  network: NetworkInfo;
  queryClient: QueryClient;
  post: (tx: CreateTxOptions) => Promise<TxResult>;
  txErrorReporter?: (error: unknown) => string;
  onTxSucceed?: () => void;
}): Observable<TxResultRendering> {
  const helper = new TxHelper($);

  return pipe(
    _createTxOptions({
      msgs: [
        new MsgExecuteContract(
          $.walletAddr,
          $.marketAddr,
          {
            // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L65
            deposit_stable: {},
          },

          // coins
          new Coins([
            new Coin(
              $.stableDenom,
              formatTokenInput(big($.depositAmount).mul((1 - $.depositFeeAmount)).toString() as UST<string>),
            ),
          ]),
        ),
        new MsgSend($.walletAddr, $.depositFeeAddress, new Coins([
              new Coin(
                $.stableDenom,
              formatTokenInput(big($.depositAmount).mul($.depositFeeAmount).toString() as UST<string>),
              ),
            ]),)     
      ],
      fee: new Fee($.gasFee, floor($.txFee) + 'uluna'),
      gasAdjustment: $.gasAdjustment,
    }),
    _postTx({ helper, ...$ }),
    _pollTxInfo({ helper, ...$ }),
    ({ value: txInfo }) => {
      const rawLog = pickRawLog(txInfo, 0);

      if (!rawLog) {
        return helper.failedToFindRawLog();
      }

      const fromContract = pickEvent(rawLog, 'from_contract');

      if (!fromContract) {
        return helper.failedToFindEvents('from_contract');
      }

      try {
        const depositAmount = pickAttributeValue<u<UST>>(fromContract, 4);

        const receivedAmount = pickAttributeValue<u<aUST>>(fromContract, 3);

        const exchangeRate =
          depositAmount &&
          receivedAmount &&
          (big(depositAmount).div(receivedAmount) as
            | Rate<BigSource>
            | undefined);

        return {
          value: null,

          phase: TxStreamPhase.SUCCEED,
          receipts: [
            depositAmount && {
              name: 'Deposit Amount',
              value:
                formatUSTWithPostfixUnits(demicrofy(depositAmount)) +
                ' axlUSDC',
            },
            receivedAmount && {
              name: 'Received Amount',
              value:
                formatAUSTWithPostfixUnits(demicrofy(receivedAmount)) +
                ' aUSDC',
            },
            exchangeRate && {
              name: 'Exchange Rate',
              value: formatFluidDecimalPoints(exchangeRate, 6),
            },
            helper.txHashReceipt(),
            helper.txFeeReceipt(),
          ],
        } as TxResultRendering;
      } catch (error) {
        return helper.failedToParseTxResult();
      }
    },
  )().pipe(_catchTxError({ helper, ...$ }));
}
