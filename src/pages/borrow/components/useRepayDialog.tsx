import React from 'react';
import { useDialog, DialogProps, OpenDialog } from '@libs/use-dialog';
import { DeploymentSwitch } from 'components/layouts/DeploymentSwitch';
import type { ReactNode } from 'react';
import { TerraRepayDialog } from './terra/TerraRepayDialog';
import { RepayFormParams } from './types';

function Component(props: DialogProps<RepayFormParams>) {
  return (
    <DeploymentSwitch
      terra={<TerraRepayDialog {...props} />}
    />
  );
}

export function useRepayDialog(): [OpenDialog<RepayFormParams>, ReactNode] {
  return useDialog<RepayFormParams>(Component);
}
