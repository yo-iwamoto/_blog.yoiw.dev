import Page from './index.page';
import { renderNextPage } from '@/__tests__/util';

describe('[page] /', () => {
  it('renders / unchanged', () => {
    const { container } = renderNextPage(
      <Page
        status='ok'
        data={{
          pages: [
            {
              id: 'id',
              properties: {
                title: 'title',
                tags: [
                  {
                    id: 'id',
                    name: 'name',
                    color: 'gray',
                  },
                ],
                slug: 'slug',
                is_public: true,
                created_at: 'yyyy/mm/dd',
                updated_at: 'yyyy/mm/dd',
              },
            },
          ],
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
