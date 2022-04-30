import { pagesPath } from '@/lib/$path';
import { useRouter } from 'next/router';
import { useCallback, useState, ChangeEvent, FormEvent } from 'react';

export const useHooks = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');

  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const openSearchBox = useCallback(() => setIsSearchBoxOpen(true), [setIsSearchBoxOpen]);

  const onChangeKeyword = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setKeyword(value),
    [setKeyword]
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      router.push(pagesPath.search.$url({ query: { q: keyword } }));
    },
    [keyword, router]
  );

  return {
    isSearchBoxOpen,
    openSearchBox,
    keyword,
    onChangeKeyword,
    onSubmit,
  };
};
