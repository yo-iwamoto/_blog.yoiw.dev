import { NextSeo } from 'next-seo';
import type { NextSeoProps } from 'next-seo';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  seo?: NextSeoProps;
};

export const PageContainer: FC<Props> = ({ children, seo = {} }) => (
  <>
    <NextSeo {...seo} />
    {children}
  </>
);
