import Page from './index.page';
import { renderNextPage } from '@/__tests__/util';

describe('[page] /', () => {
  it('renders / unchanged', () => {
    const { container } = renderNextPage(<Page />);

    expect(container).toMatchSnapshot();
  });
});
