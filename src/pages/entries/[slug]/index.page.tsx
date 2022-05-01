import { getStaticProps, getStaticPaths } from './index.server';
import { PageContainer } from '@/components/layout/PageContainer';
import { NotionBlock } from '@/components/NotionBlock';
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

  const { blocks, properties } = data;
  return (
    <PageContainer
      seo={{
        title: `${properties.title} | blog.yoiw.dev`,
      }}
    >
      <div className='mt-6'>
        <h1 className='mb-2 text-xl font-bold sm:text-2xl md:text-3xl'>{properties.title}</h1>
        <p className='mb-2 text-slate-500'>{properties.created_at}</p>
        {blocks.map((block) => (
          <NotionBlock key={block.id} {...block} />
        ))}
      </div>
    </PageContainer>
  );
}
