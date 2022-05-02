import { getStaticProps, getStaticPaths } from './index.server';
import { PageContainer } from '@/components/layout/PageContainer';
import { NotionBlock } from '@/components/notion/NotionBlock';
import { pagesPath } from '@/lib/$path';
import { isEmptyPageProps } from '@/lib/isEmptyPageProps';
import Link from 'next/link';
import type { InferGetStaticPropsType } from 'next';

export { getStaticProps, getStaticPaths };

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  if (isEmptyPageProps(props)) {
    // TODO: SSR中の表示
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
        <div className='flex gap-2'>
          {properties.tags.map((tag) => (
            <Link key={tag.id} href={pagesPath.categories._name(tag.name).$url()}>
              <a>
                <span
                  key={tag.id}
                  className='border-b-2 border-b-transparent text-slate-700 transition-colors before:pr-0.5  before:content-["#"] hover:border-b-slate-700'
                >
                  {tag.name}
                </span>
              </a>
            </Link>
          ))}
        </div>

        {blocks.map((block) => (
          <NotionBlock key={block.id} {...block} />
        ))}
      </div>
    </PageContainer>
  );
}
