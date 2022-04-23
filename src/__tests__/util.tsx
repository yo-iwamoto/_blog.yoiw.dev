import { Layout } from '@/components/Layout';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => <Layout>{children}</Layout>;

export const renderNextPage = (ui: JSX.Element, options?: RenderOptions) => render(ui, { wrapper, ...options });
