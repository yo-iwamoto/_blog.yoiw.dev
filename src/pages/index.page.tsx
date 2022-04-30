import { getStaticProps } from './index.server';
import { InferGetStaticPropsType } from 'next';

export { getStaticProps };

export default function Page({ status, data }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (status === 'error') {
    return <h1>エラーが発生しました</h1>;
  }

  return (
    <>
      {data.pages.map((page) => (
        <div key={page.id}>
          <h1>{page.properties.title}</h1>
        </div>
      ))}
    </>
  );
}
