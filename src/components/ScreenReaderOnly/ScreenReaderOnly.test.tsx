import { ScreenReaderOnly } from '.';
import { render } from '@testing-library/react';

describe('ScreenReaderOnly', () => {
  it('正しく表示されること', () => {
    const { getByText, asFragment } = render(<ScreenReaderOnly>help text</ScreenReaderOnly>);

    expect(getByText('help text')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
