import {
  useLastSyncedHeightQuery,
  useNetwork,
} from '@anchor-protocol/app-provider';
import { IconButton } from '@mui/material';
import { Brightness3, Brightness5, GitHub, Telegram, Twitter } from '@mui/icons-material';
import { useTheme } from 'contexts/theme';
import { screen } from 'env';
import c from 'color';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { useDeploymentTarget } from '@anchor-protocol/app-provider';
import { BlockInfo } from './BlockInfo';
import { Chain } from '@anchor-protocol/app-provider';
import { EvmBlockInfo } from './EvmBlockInfo';
import { getBlockUrl } from 'utils/terrascope';
import { Discord } from '@anchor-protocol/icons';

export interface FooterProps {
  className?: string;
  style?: CSSProperties;
}

function FooterBase({ className, style }: FooterProps) {
  const { network } = useNetwork();
  const { data: lastSyncedHeight = 0 } = useLastSyncedHeightQuery();

  const {
    target: { isEVM },
  } = useDeploymentTarget();

  const { themeColor, switchable, updateTheme } = useTheme();

  const appVersion = import.meta.env.VITE_APP_VERSION;

  return (
    <footer className={className} style={style}>
      <Info>
        <div className="blocks">
          <a
            href={getBlockUrl(network.chainID, lastSyncedHeight)}
            target="_blank"
            rel="noreferrer"
          >
            <BlockInfo
              chainName={Chain.Terra}
              networkName={network.name}
              blockNumber={lastSyncedHeight}
            />
          </a>

          {isEVM && <EvmBlockInfo />}
        </div>

        {appVersion && <p>{appVersion}</p>}

        {/* <Link to="/terms">Terms</Link> */}
      </Info>
      <div>
        <IconButton
          component="a"
          href="https://twitter.com/CavernProtocol"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter />
        </IconButton>
        <IconButton
          component="a"
          href="https://t.me/cavernprotocolofficial"
          target="_blank"
          rel="noreferrer"
        >
          <Telegram />
        </IconButton>
        <IconButton
          component="a"
          href="https://github.com/CavernPerson"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://discord.com/invite/Bzau2dW9fu"
          target="_blank"
          rel="noreferrer"
        >
          <Discord />
        </IconButton>
        {/* Forcing the dark theme, no change possible*/}
        {switchable && (
          <IconButton
            onClick={() =>
              updateTheme(themeColor === 'light' ? 'dark' : 'light')
            }
          >
            {themeColor === 'light' ? <Brightness5 /> : <Brightness3 />}
          </IconButton>
        )}
      </div>
    </footer>
  );
}

export const Footer = styled(FooterBase)`
  font-size: 12px;
  color: ${({ theme }) => c(theme.dimTextColor).alpha(0.5).toString()};

  a {
    text-decoration: none;
  }

  a,
  .MuiIconButton-root {
    color: ${({ theme }) => c(theme.dimTextColor).alpha(0.5).toString()};

    &:hover {
      color: ${({ theme }) => theme.dimTextColor};
    }
  }

  > :last-child {
    > :not(:first-child) {
      margin-left: 0.7em;
    }
  }

  // ---------------------------------------------
  // layout
  // ---------------------------------------------
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${screen.tablet.max}px) {
    flex-direction: column;
  }

  .blocks {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
`;
