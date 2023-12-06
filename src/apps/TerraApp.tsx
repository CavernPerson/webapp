"use client"
import { GlobalStyle } from 'components/GlobalStyle';
import { Header } from 'components/Header';


import { TerraAppProviders } from 'providers/terra/TerraAppProviders';
import React, { ReactNode } from 'react';
import '../configurations/chartjs';

export function TerraApp({ children }: { children?: ReactNode }) {
  return (
    (
      <TerraAppProviders>
        <div>
          <GlobalStyle />
          <Header />
          {children}
        </div>
      </TerraAppProviders>
    )
  );
}
