import { getStaticProps, getStaticPaths } from './index.server';
import { PageContainer } from '@/components/layout/PageContainer';
import type { InferGetStaticPropsType } from 'next';

export { getStaticProps, getStaticPaths };

export default function Page(props: { [x: string]: never } | InferGetStaticPropsType<typeof getStaticProps>) {
  if (Object.keys(props).length === 0) {
    return null;
  }

  const { status, data } = props;
  if (status === 'error') {
    return <h1>エラーが発生しました</h1>;
  }

  const { properties } = data.page;
  return (
    <PageContainer>
      <div className='mt-12'>
        <h1 className='mb-2 text-3xl font-bold'>{properties.title}</h1>
        <p className='text-slate-500'>{properties.created_at}</p>
      </div>
    </PageContainer>
  );
}
