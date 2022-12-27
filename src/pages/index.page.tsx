import { getStaticProps } from './index.server';
import { PageContainer } from '@/components/layout/PageContainer';
import { pagesPath } from '@/lib/$path';
import Link from 'next/link';
import type { InferGetStaticPropsType } from 'next';

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
                <p className='mb-1 text-sm text-slate-500 md:text-lg'>{properties.created_at}</p>
                <div className='flex gap-2'>
                  {properties.tags.map((tag) => (
                    <span key={tag.id} className='text-slate-700 before:pr-0.5 before:content-["#"]'>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
