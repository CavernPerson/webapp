import { EmbossButton } from '@libs/neumorphism-ui/components/EmbossButton';
import { DoneOutlined } from '@mui/icons-material';

import styled from 'styled-components';
import React, { CSSProperties } from 'react';

export interface BurnSwitchProps {
  className?: string;
  style?: CSSProperties;
  mode: 'burn' | 'swap';
  onChange: (nextMode: 'burn' | 'swap') => void;
}

function Component({ className, style, mode, onChange }: BurnSwitchProps) {
  return (
    <div className={className} style={style}>
      <h4>Select Burn Type</h4>
      <div>
        <EmbossButton
          onClick={() => onChange('burn')}
          disabled={mode === 'burn'}
        >
          <i>{mode === 'burn' && <DoneOutlined />}</i> Burn
        </EmbossButton>
        <EmbossButton
          className="disabled"
          onClick={() => onChange('swap')}
          disabled /*={mode === 'swap'}*/
        >
          <i>{mode === 'swap' && <DoneOutlined />}</i>Instant burn (Not
          available for now)
        </EmbossButton>
      </div>
    </div>
  );
}

const StyledComponent = styled(Component)`
  & {
    h4 {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 12px;
    }

    > div {
      display: flex;
      gap: 8px;

      > button {
        flex: 1;
        height: 59px;
        justify-content: start;
        padding-left: 16px;

        color: ${({ theme }) => theme.dimTextColor} !important;

        i {
          width: 24px;
          height: 24px;

          border-radius: 6px;

          background-color: ${({ theme }) => theme.dimTextColor};
          opacity: 0.5;

          margin-right: 8px;
        }

        &:disabled:not(.disabled) {
          opacity: 1;

          color: ${({ theme }) => theme.textColor};

          i {
            opacity: 1;

            background-color: ${({ theme }) => theme.colors.positive};
            color: ${({ theme }) => theme.textColor};
          }
        }
      }
    }
  }
`;

export const BurnSwitch = StyledComponent;
