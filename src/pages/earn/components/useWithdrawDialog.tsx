import type { ReactNode } from 'react';
import React from 'react';
import type { DialogProps, OpenDialog } from '@libs/use-dialog';
import { useDialog } from '@libs/use-dialog';
import { FormParams, FormReturn } from './types';
import { TerraWithdrawDialog } from './terra';
import { DeploymentSwitch } from 'components/layouts/DeploymentSwitch';

function Component(props: DialogProps<FormParams, FormReturn>) {
  return (
    <DeploymentSwitch
      //@ts-expect-error : Can't spread a generic type, so below might error
      terra={<TerraWithdrawDialog {...props} />}
    />
  );
}

export function useWithdrawDialog(): [
  OpenDialog<FormParams, FormReturn>,
  ReactNode,
] {
  return useDialog<FormParams, FormReturn>(Component);
}
