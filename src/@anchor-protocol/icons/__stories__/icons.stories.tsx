import { Tooltip } from '@libs/neumorphism-ui/components/Tooltip';
import React, { Children, ReactElement } from 'react';
import styled from 'styled-components';
import * as icons from '../';

export default {
  title: 'assets/Icons',
};

export const Icons = () => {
  return (
    <Grid size={60}>
      {Object.keys(icons).map((iconName, index) => {
        const Icon = (icons as unknown as Record<string, React.JSX.Element>)[iconName] as unknown as React.JSX.Element;
        return (
          <Tooltip title={iconName} placement="right" key={index}>
            {Icon}
          </Tooltip>
        );
      })}
    </Grid>
  );
};

const Grid = styled(
  ({
    children,
    className,
  }: {
    children: ReactElement[];
    className?: string;
  }) => (
    <section className={className}>
      {Children.toArray(children.map((child) => <div>{child}</div>))}
    </section>
  ),
) <{ size: number }>`
  display: grid;
  grid-template-columns: repeat(5, ${({ size }) => size}px);
  grid-template-rows: repeat(
    ${({ children }) => Math.ceil(children.length / 5)},
    ${({ size }) => size}px
  );

  div {
    display: grid;
    place-content: center;
  }
`;
