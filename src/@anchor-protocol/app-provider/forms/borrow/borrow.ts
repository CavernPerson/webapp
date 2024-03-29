import { BorrowBorrower, borrowBorrowForm } from "@anchor-protocol/app-fns";
import {
  BorrowMarketWithDisplay,
  useAnchorBank,
  useDeploymentTarget,
} from "@anchor-protocol/app-provider";
import { useFixedFee } from "@libs/app-provider";
import { UST } from "@libs/types";
import { useForm } from "@libs/use-form";
import { useAccount } from "contexts/account";
import { useWhitelistCollateralQuery } from "queries";
import { useAnchorWebapp } from "../../contexts/context";
import { useBorrowBorrowerQuery } from "../../queries/borrow/borrower";
import { useBorrowMarketQuery } from "../../queries/borrow/market";

export function useBorrowBorrowForm(
  fallbackBorrowMarket: BorrowMarketWithDisplay,
  fallbackBorrowBorrower: BorrowBorrower
) {
  const { target } = useDeploymentTarget();

  const { connected } = useAccount();

  const fixedFee = useFixedFee();

  const {
    constants: { blocksPerYear },
  } = useAnchorWebapp();

  const {
    tokenBalances: { uUST, uLuna },
  } = useAnchorBank();

  const { data: whitelist = [] } = useWhitelistCollateralQuery();

  const {
    data: { borrowRate, oraclePrices, bAssetLtvs } = fallbackBorrowMarket,
  } = useBorrowMarketQuery();

  const {
    data: { marketBorrowerInfo, overseerCollaterals } = fallbackBorrowBorrower,
  } = useBorrowBorrowerQuery();

  return useForm(
    borrowBorrowForm,
    {
      target,
      userUSTBalance: uUST,
      userLunaBalance: uLuna,
      connected,
      oraclePrices,
      borrowRate,
      bAssetLtvs,
      overseerCollaterals,
      blocksPerYear,
      marketBorrowerInfo,
      whitelist,
      fixedFee,
    },
    () => ({
      borrowAmount: "" as UST,
    })
  );
}
