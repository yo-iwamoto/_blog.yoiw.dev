import { getStaticProps } from './index.server';
import { PageContainer } from '@/components/layout/PageContainer';
import { pagesPath } from '@/lib/$path';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export { getStaticProps };

export default function Page({ status, data }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (status === 'error') {
    return <h1>エラーが発生しました</h1>;
  }

  return (
    <PageContainer
      seo={{
        title: 'blog.yoiw.dev',
        description: 'github: you-5805 の個人ブログです',
      }}
    >
      <div className='flex flex-col gap-4'>
        {data.pages.map(({ id, properties }) => (
          <Link key={id} href={pagesPath.entries._slug(properties.slug).$url()} passHref>
            <a>
              <div className='cursor-pointer rounded-lg bg-slate-50 p-4 shadow-md transition-all hover:opacity-80 hover:shadow-lg'>
                <h1 className='text-lg font-bold sm:text-xl md:text-2xl'>{properties.title}</h1>
                <p className='text-sm text-slate-500 md:text-lg'>{properties.created_at}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
