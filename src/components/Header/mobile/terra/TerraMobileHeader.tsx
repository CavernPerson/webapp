import React, { useCallback, useMemo, useState } from 'react';
import { useAccount } from 'contexts/account';
import { useBuyUstDialog } from 'pages/earn/components/useBuyUstDialog';
import { useWalletDialog } from './useWalletDialog';
import { useVestingClaimNotification } from 'components/Header/vesting/VestingClaimNotification';
import { ViewAddressButton } from '../ViewAddressButton';
import { MobileHeader } from '../MobileHeader';
import { WalletStatus } from '@cosmos-kit/core';
import { ConnectType } from 'utils/consts';

export function TerraMobileHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const { status, connect, availableWallets } = useAccount();
  const [openWalletDialog, walletDialogElement] = useWalletDialog();
  const [openBuyUstDialog, buyUstDialogElement] = useBuyUstDialog();

  console.log(availableWallets)
  const toggleWallet = useCallback(() => {
    if (status === WalletStatus.Connected) {
      openWalletDialog({
        openBuyUst: () => openBuyUstDialog({}),
      });
    } else if (status === WalletStatus.Disconnected) {
      connect("terra-station-mobile");
    }
  }, [connect, openBuyUstDialog, openWalletDialog, status]);

  const [vestingClaimNotificationElement] = useVestingClaimNotification();

  const viewAddress = useCallback(() => {
    setOpen(false);

    if (status === WalletStatus.Disconnected) {
      connect(ConnectType.READONLY);
    }
  }, [connect, status]);

  const viewAddressButtonElement = useMemo(() => {
    return (
      status === WalletStatus.Disconnected && <ViewAddressButton onClick={viewAddress} />
    );
  }, [status, viewAddress]);

  return (
    <>
      <MobileHeader
        open={open}
        setOpen={setOpen}
        isActive={!!walletDialogElement}
        toggleWallet={toggleWallet}
        vestingClaimNotificationElement={vestingClaimNotificationElement}
        viewAddressButtonElement={viewAddressButtonElement}
      />
      {walletDialogElement}
      {buyUstDialogElement}
    </>
  );
}
