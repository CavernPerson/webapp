import type { ReactNode } from 'react';
import React, { useCallback } from 'react';
import { DialogProps, OpenDialog, useDialog } from '@libs/use-dialog';
import { FormParams, FormReturn } from '../types';
import { Modal } from '@mui/material';
import { Dialog } from '@libs/neumorphism-ui/components/Dialog';
// import { SquidWidget } from '@0xsquid/widget';
// import { widgetEvents } from "@0xsquid/widget/widget/services/internal/eventService";

export function SquidDepositDialog(props: DialogProps<unknown>): React.JSX.Element {

  // widgetEvents.listenToWidget("swapStatus", (status) => console.log("status received", status));
  // widgetEvents.listenToWidget("swap", () => console.log("swap"));

  window.addEventListener("swap", (...allParams) => console.log("swap", allParams));
  window.addEventListener("swapStatus", (...allParams) => console.log("swap status", allParams));

  return (

    <Modal open onClose={() => props.closeDialog()}>
      <Dialog onClose={() => props.closeDialog()}>
        <h1>Deposit</h1>
        {/* <SquidWidget config={{
          integratorId: "cavern_protocol-swap-widget",
          enableGetGasOnDestination: true,

        }} /> */}
      </Dialog>
    </Modal>
  );
}

export function useSquidDepositDialog(): [
  OpenDialog<FormParams, FormReturn>,
  ReactNode,
] {
  return useDialog<FormParams, FormReturn>(SquidDepositDialog);
}