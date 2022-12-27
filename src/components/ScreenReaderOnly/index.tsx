import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ScreenReaderOnly = ({ children }: Props) => {
  return <span className='sr-only'>{children}</span>;
};
