import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

import aust from './assets/aust.svg';
import aust2x from './assets/aust@2x.png';
import aust3x from './assets/aust@3x.png';
import aust4x from './assets/aust@4x.png';

import aluna from './assets/aluna.svg';
import aluna2x from './assets/aluna@2x.png';
import aluna3x from './assets/aluna@3x.png';
import aluna4x from './assets/aluna@4x.png';

import bluna from './assets/bluna.svg';
import bluna2x from './assets/bluna@2x.png';
import bluna3x from './assets/bluna@3x.png';
import bluna4x from './assets/bluna@4x.png';

import bWhale from './assets/bWHALE.svg';
import bWhale2x from './assets/bWHALE@2x.png';
import bWhale3x from './assets/bWHALE@3x.png';
import bWhale4x from './assets/bWHALE@4x.png';

import luna from './assets/luna.svg';
import luna2x from './assets/luna@2x.png';
import luna3x from './assets/luna@3x.png';
import luna4x from './assets/luna@4x.png';

import whale from './assets/whale.svg';
import whale2x from './assets/whale@2x.png';
import whale3x from './assets/whale@3x.png';
import whale4x from './assets/whale@4x.png';

import ust from './assets/ust.svg';
import ust2x from './assets/ust@2x.png';
import ust3x from './assets/ust@3x.png';
import ust4x from './assets/ust@4x.png';

import ampLuna from './assets/ampLuna.svg';
import ampLuna2x from './assets/ampLuna@2x.png';
import ampLuna3x from './assets/ampLuna@3x.png';
import ampLuna4x from './assets/ampLuna@4x.png';

import stLuna from './assets/stLuna.svg';
import stLuna2x from './assets/stLuna@2x.png';
import stLuna3x from './assets/stLuna@3x.png';
import stLuna4x from './assets/stLuna@4x.png';

import ampWhale from './assets/ampLuna.svg';
import ampWhale2x from './assets/ampWhale@2x.png';
import ampWhale3x from './assets/ampWhale@3x.png';
import ampWhale4x from './assets/ampWhale@4x.png';


import astroportLunaUSDC from "./assets/axlUSDC-LUNA.svg";
import spec from "./assets/spec.svg"
import amp from "./assets/eris.svg"

import { RegisteredLSDs } from 'env';
import { IconObject } from 'queries';

type RegisteredLSDsValues = `${RegisteredLSDs}`
export const lsds = Object.values(RegisteredLSDs);

export const tokens = ['ust', 'aust', 'luna', "whale", 'aluna', 'aLuna', 'wampLuna', "Spec Usdc Luna Lp", "Eris Usdc Luna Lp", "astroport-luna-axlUSDC"] as const;
export const variants = ['svg', '@2x', '@3x', '@4x'] as const;

export type Tokens = typeof tokens[number] | RegisteredLSDsValues;
export type IconVariant = typeof variants[number];

export type TokenImage = { src: string };

function convert(icon: any): TokenImage {
  return icon
}

export const tokenImages: Record<Tokens, Record<IconVariant, TokenImage>> = {
  ust: {
    'svg': convert(ust),
    '@2x': convert(ust2x),
    '@3x': convert(ust3x),
    '@4x': convert(ust4x),
  },
  aust: {
    'svg': convert(aust),
    '@2x': convert(aust2x),
    '@3x': convert(aust3x),
    '@4x': convert(aust4x),
  },
  luna: {
    'svg': convert(luna),
    '@2x': convert(luna2x),
    '@3x': convert(luna3x),
    '@4x': convert(luna4x),
  },
  whale: {
    'svg': convert(whale),
    '@2x': convert(whale2x),
    '@3x': convert(whale3x),
    '@4x': convert(whale4x),
  },
  aluna: {
    'svg': convert(aluna),
    '@2x': convert(aluna2x),
    '@3x': convert(aluna3x),
    '@4x': convert(aluna4x),
  },
  aLuna: {
    'svg': convert(aluna),
    '@2x': convert(aluna2x),
    '@3x': convert(aluna3x),
    '@4x': convert(aluna4x),
  },
  ampLuna: {
    'svg': convert(ampLuna),
    '@2x': convert(ampLuna2x),
    '@3x': convert(ampLuna3x),
    '@4x': convert(ampLuna4x),
  },
  wampLuna: {
    'svg': convert(ampLuna),
    '@2x': convert(ampLuna2x),
    '@3x': convert(ampLuna3x),
    '@4x': convert(ampLuna4x),
  },
  bLuna: {
    'svg': convert(bluna),
    '@2x': convert(bluna2x),
    '@3x': convert(bluna3x),
    '@4x': convert(bluna4x),
  },
  stLuna: {
    'svg': convert(stLuna),
    '@2x': convert(stLuna2x),
    '@3x': convert(stLuna3x),
    '@4x': convert(stLuna4x),
  },
  ampWhale: {
    'svg': convert(ampWhale),
    '@2x': convert(ampWhale2x),
    '@3x': convert(ampWhale3x),
    '@4x': convert(ampWhale4x),
  },
  bWhale: {
    'svg': convert(bWhale),
    '@2x': convert(bWhale2x),
    '@3x': convert(bWhale3x),
    '@4x': convert(bWhale4x),
  },
  "Spec Usdc Luna Lp": {
    'svg': convert(spec),
    '@2x': convert(spec),
    '@3x': convert(spec),
    '@4x': convert(spec),
  },
  "Eris Usdc Luna Lp": {
    'svg': convert(amp),
    '@2x': convert(amp),
    '@3x': convert(amp),
    '@4x': convert(amp),
  },
  "astroport-luna-axlUSDC": {
    'svg': convert(astroportLunaUSDC),
    '@2x': convert(astroportLunaUSDC),
    '@3x': convert(astroportLunaUSDC),
    '@4x': convert(astroportLunaUSDC),
  }
};

export interface IconProps
  extends Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'src'
  > {
  token?: Tokens;
  symbol?: string;
  path?: string;
  variant?: IconVariant;
}

const displayTokenIconAsPredefined = (variant: IconVariant, symbol: string) => {
  if (symbol.toLowerCase() in tokens) {
    return tokenImages[symbol.toLowerCase() as Tokens][variant].src
  } else {
    return undefined
  }
}

const displayPredefinedIcon = (token: Tokens, variant: IconVariant) => {
  return tokenImages[token]?.[variant]?.src;
}

export function TokenIconBase({
  symbol,
  path,
  token,
  variant = 'svg',
  ...imgProps
}: IconProps) {
  const icon = token
    ? displayPredefinedIcon(token, variant)
    : symbol
      ? displayTokenIconAsPredefined(variant, symbol) ?? path
      : path;

  return <img alt="" {...imgProps} src={icon} />;
}

export const TokenIcon = styled(TokenIconBase)`
  width: 1em;
  height: 1em;
`;

export const GifIcon = styled.img`
  width: 1em;
  height: 1em;
`;


export interface PossibleLPIconProps
  extends Omit<Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'src'>, "ref"
  > {
  icon: IconObject | undefined;
}

export function PossibleLpIcon({ icon, ...elProps }: PossibleLPIconProps) {
  return <>{
    icon && (typeof (icon) == "string") &&
    <TokenIcon
      path={icon}
      {...elProps}
    />
  }
    {
      icon && (typeof (icon) != "string") &&
      <span className="lp_token" {...elProps} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TokenIcon
          path={icon.protocol_icon}
        />
        <span>
        </span>
        <span style={{ display: "flex", flexDirection: "row", gap: "-10px" }} >
          <TokenIcon
            style={{ marginRight: "-13px" }}
            path={icon.asset1}
          />
          <TokenIcon
            path={icon.asset2}
          />
        </span>
      </span>
    }
  </>
}