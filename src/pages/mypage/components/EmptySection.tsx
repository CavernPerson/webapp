import { ChevronRightRounded } from '@mui/icons-material';
import { Section } from '@libs/neumorphism-ui/components/Section';

import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface EmptySectionProps {
  className?: string;
  to: string;
  children: ReactNode;
}

function EmptySectionBase({ className, to, children }: EmptySectionProps) {
  return (
    <Section className={className}>
      <Link to={to}>
        {children} <ChevronRightRounded />
      </Link>
    </Section>
  );
}

export const StyledEmptySection = styled(EmptySectionBase)`
  .NeuSection-content {
    text-align: right;
  }

  a {
    text-decoration: none;

    font-size: 16px;
    font-weight: 500;

    color: ${({ theme }) => theme.dimTextColor};

    svg {
      font-size: 1em;
      transform: scale(1.3) translateY(0.1em);
    }

    &:hover {
      color: ${({ theme }) => theme.textColor};
    }
  }
`;

export const EmptySection = StyledEmptySection;
