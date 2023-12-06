import React, { useCallback } from 'react';
import { FlatButton } from '@libs/neumorphism-ui/components/FlatButton';
import { Tooltip } from '@libs/neumorphism-ui/components/Tooltip';
import { useAccount } from 'contexts/account';
import { WalletContent } from '../WalletContent';
import { KeyboardArrowRight, Launch } from '@mui/icons-material';
import { UIElementProps } from '@libs/ui';
import { HumanAddr } from '@libs/types';
import styled from 'styled-components';
import { useNetwork } from '@anchor-protocol/app-provider';
import { TokenList } from '../TokenList';
import { getAccountUrl } from 'utils/terrascope';
import { ConnectType, Connection } from 'utils/consts';

type Action = () => void;

interface ContentProps extends UIElementProps {
  walletAddress: HumanAddr;
  connection: Connection;
  onClose: Action;
  onDisconnectWallet: Action;
  onBuyUST: Action;
}

const ContentBase = (props: ContentProps) => {
  const {
    className,
    onClose,
    onDisconnectWallet,
    // onSend,
    onBuyUST,
  } = props;

  const { availablePost, terraWalletAddress, connection } = useAccount();

  const { network } = useNetwork();

  const viewOnTerraFinder = useCallback(() => {
    if (!terraWalletAddress) {
      return;
    }
    window.open(getAccountUrl(network.chainID, terraWalletAddress), '_blank');
  }, [network.chainID, terraWalletAddress]);
  console.log("wallet connected", connection)

  return (
    <WalletContent
      className={className}
      walletAddress={terraWalletAddress || "Error"}
      connectionName={connection?.name || "Terra Station"}
      connectionIcon={connection?.icon || "https://station.terra.money/static/media/favicon.6ba850f5.svg"}
      readonly={connection ? connection.type === ConnectType.READONLY : false}
      onDisconnectWallet={onDisconnectWallet}
    >
      <>
        <TokenList onClose={onClose} onBuyUST={onBuyUST} />
        {availablePost && (
          <>
            <div className="bridge">
              <div>
                <Tooltip
                  title="Transfer all assets across all blockchains"
                  placement="top"
                >
                  <FlatButton
                    component="a"
                    href="https://app.squidrouter.com/"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      gap: "10px"
                    }}
                  >
                    <img src="https://app.squidrouter.com/images/icons/squid_logo.svg" alt="Squid Router" />Transfers
                  </FlatButton>
                </Tooltip>
                <FlatButton
                  component="a"
                  href="https://docs.cavernprotocol.com/user-guide/interchain-transfers"
                  target="_blank"
                  rel="noreferrer"
                >
                  Docs <Launch />
                </FlatButton>
              </div>
            </div>
            {/* <div className="send">
              <FlatButton onClick={onSend}>SEND</FlatButton>
            </div> */}
            <div className="outlink">
              <button onClick={viewOnTerraFinder}>
                View on TerraScope{' '}
                <i>
                  <KeyboardArrowRight />
                </i>
              </button>
              {process.env.NODE_ENV === 'development' && (
                <a
                  href="https://faucet.terra.money/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Go to Faucet{' '}
                  <i>
                    <KeyboardArrowRight />
                  </i>
                </a>
              )}
            </div>
          </>
        )}
      </>
    </WalletContent >
  );
};

export const Content = styled(ContentBase)`
  .bridge {
    margin-bottom: 10px;

    > div {
      display: flex;

      > :first-child {
        flex: 1;
        height: 28px;
        background-color: ${({ theme }) => theme.colors.positive};

        img {
          height: 24px;
          transform: translateX(5px);
        }

        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      > :last-child {
        font-size: 12px;

        width: 60px;
        height: 28px;
        margin-left: 1px;
        background-color: ${({ theme }) => theme.colors.positive};

        svg {
          margin-left: 3px;
          font-size: 1em;
          transform: scale(1.1);
        }

        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  .send {
    margin-bottom: 20px;

    button {
      width: 100%;
      height: 28px;

      background-color: ${({ theme }) => theme.colors.positive};
    }
  }

  .outlink {
    text-align: center;

    button,
    a {
      border: 0;
      outline: none;
      background-color: transparent;
      font-size: 12px;
      color: ${({ theme }) => theme.dimTextColor};
      display: inline-flex;
      align-items: center;

      i {
        margin-left: 5px;
        transform: translateY(1px);

        width: 16px;
        height: 16px;
        border-radius: 50%;

        svg {
          font-size: 11px;
          transform: translateY(1px);
        }

        background-color: ${({ theme }) =>
    theme.palette_type === 'light' ? '#f1f1f1' : 'rgba(0, 0, 0, 0.15)'};
        color: ${({ theme }) =>
    theme.palette_type === 'light'
      ? '#666666'
      : 'rgba(255, 255, 255, 0.6)'};

        &:hover {
          background-color: ${({ theme }) =>
    theme.palette_type === 'light' ? '#e1e1e1' : 'rgba(0, 0, 0, 0.2)'};
          color: ${({ theme }) =>
    theme.palette_type === 'light'
      ? '#666666'
      : 'rgba(255, 255, 255, 0.6)'};
        }
      }
    }
  }
`;
