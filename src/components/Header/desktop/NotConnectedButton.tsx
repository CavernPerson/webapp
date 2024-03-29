import { Wallet } from '@anchor-protocol/icons';
import { ButtonBaseProps } from '@mui/material';
import { BorderButton } from '@libs/neumorphism-ui/components/BorderButton';
import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import React from 'react';
import styled from 'styled-components';

type NotConnectedButtonProps = ButtonBaseProps

export function NotConnectedButtonBase({
  children,
  ...buttonProps
}: NotConnectedButtonProps) {
  return (
    <BorderButton {...buttonProps}>
      <IconSpan>
        <span className="wallet-icon-container">
          <Wallet className='wallet-icon'/>
        </span>
        {children}
      </IconSpan>
    </BorderButton>
  );
}

export const NotConnectedButton = styled(NotConnectedButtonBase)`
  && {
    height: 26px;
    border-radius: 20px !important;
    padding: 4px 20px !important;
    font-size: 12px;
    font-weight: 700;

    .wallet-icon-container {
      svg {
        transform: scale(1.2) translateY(0.5px);
      }

      margin-right: 17px;

      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 1px;
        bottom: 1px;
        right: -11px;
        border-left: 1px solid ${({ theme }) => theme.header.textColor};
      }
    }
    .wallet-icon{
      width: 18px;
    }

    color: ${({ theme }) => theme.header.textColor};
    border-color: ${({ theme }) => theme.header.textColor};
    border: 1px solid ${({ theme }) => theme.header.textColor};

    &:hover {
      color: ${({ theme }) => theme.header.textColor};
      border-color: ${({ theme }) => theme.header.textColor};
    }
  }
`;
