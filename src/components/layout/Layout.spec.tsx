import { Layout } from './Layout';
import { render } from '@testing-library/react';

describe('[component] Layout', () => {
  it('renders Layout unchanged', () => {
    const { container } = render(
      <Layout>
        <h1>Hello World!</h1>
      </Layout>
    );

    expect(container).toMatchSnapshot();
  });
});
