import { getStaticPaths, getStaticProps } from './index.server';
import { PageContainer } from '@/components/layout/PageContainer';
import { isEmptyPageProps } from '@/lib/isEmptyPageProps';
import { pagesPath } from '@/lib/$path';
import { titleWithSiteName } from '@/lib/titleWithSiteName';
import Link from 'next/link';
import type { InferGetStaticPropsType } from 'next';

export { getStaticPaths, getStaticProps };

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  if (isEmptyPageProps(props)) {
    // TODO: SSR中の表示
    return null;
  }

  const { status, data } = props;

  if (status === 'error') {
    return <h1>エラーが発生しました</h1>;
  }

  const { name, pages } = data;

  return (
    <PageContainer
      seo={{
        title: titleWithSiteName(`「${name}」に関するエントリ`),
      }}
    >
      <h1 className='mb-6'>「{name}」に関するエントリ</h1>
      <div className='flex flex-col gap-4'>
        {pages.map(({ id, properties }) => (
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
