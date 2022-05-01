import { useHooks } from './Layout.hook';
import { cn } from '@/lib/classNames';
import { pagesPath } from '@/lib/$path';
import { FaSearch } from 'react-icons/fa';
import { ReactNode, FC } from 'react';
import Link from 'next/link';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const { isSearchBoxOpen, openSearchBox, keyword, onChangeKeyword, onSubmit, $searchInput } = useHooks();

  return (
    <div className='font-sans text-slate-800'>
      <div className='mx-4 my-6'>
        <div className='mx-auto max-w-5xl px-2'>
          <header className='flex items-center justify-between'>
            <Link href={pagesPath.$url()} passHref>
              <a>
                <p className='font-mono text-lg font-bold'>blog.yoiw.dev</p>
              </a>
            </Link>
            <form onSubmit={onSubmit} className='flex h-12 items-center justify-end gap-4'>
              <input
                ref={$searchInput}
                type='text'
                value={keyword}
                onChange={onChangeKeyword}
                className={cn(
                  'w-auto max-w-[128px] border-b-2 border-b-slate-500 py-1 px-2 transition-opacity focus:outline-blue-300 sm:w-56 sm:max-w-none md:w-80',
                  {
                    'opacity-0': !isSearchBoxOpen,
                    'opacity-100': isSearchBoxOpen,
                  }
                )}
              />
              {isSearchBoxOpen ? (
                <button type='submit'>
                  <FaSearch className='cursor-pointer text-xl' />
                </button>
              ) : (
                <FaSearch onClick={openSearchBox} className='cursor-pointer text-xl' />
              )}
            </form>
          </header>
          <div className='mt-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};
