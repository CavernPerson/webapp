import React, { ReactNode } from 'react';
import { DialogProps, OpenDialog, useDialog } from '@libs/use-dialog';
import { FormParams, FormReturn } from './types';
import { useTerraDepositDialog } from './terra';
import { Grid, Modal, styled } from "@mui/material";
import { EmbossButton } from '@libs/neumorphism-ui/components/EmbossButton';
import { Dialog } from '@libs/neumorphism-ui/components/Dialog';
import { DepositDialogWithButtons } from '@libs/neumorphism-ui/components/DialogWithButtons';
// import { SquidWidget } from "@0xsquid/widget";
import { useSquidDepositDialog } from './terra/SquidDepositDialog';

function DepositDialog({ closeDialog }: DialogProps<FormParams, FormReturn>): React.JSX.Element {

  const [openTerraDepositDialog, terraDepositDialog] = useTerraDepositDialog();
  // const [openSquidDepositDialog, squidDepositDialog] = useSquidDepositDialog();

  return (<DepositDialogWithButtons closeDialog={closeDialog}>
    <DepositGridButtons component="button" onClick={() => openTerraDepositDialog()}>Deposit with a credit card</DepositGridButtons>
    <DepositGridButtons component="button" onClick={() => openTerraDepositDialog()}>Deposit from any blockchain</DepositGridButtons>
    <DepositGridButtons component="button" onClick={() => openTerraDepositDialog()}>Deposit on Terra</DepositGridButtons>
    {terraDepositDialog}
    {/* {squidDepositDialog} */}
  </DepositDialogWithButtons>
  );
}

const DepositGridButtons = styled(EmbossButton) <{ component: string }>`
  padding: 10px;
`




export function useDepositDialog(): [
  OpenDialog<FormParams, FormReturn>,
  ReactNode,
] {
  return useDialog<FormParams, FormReturn>(DepositDialog);
}
