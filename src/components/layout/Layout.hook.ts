import { pagesPath } from '@/lib/$path';
import { useRouter } from 'next/router';
import { useCallback, useState, ChangeEvent, FormEvent, useRef } from 'react';

export const useHooks = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');

  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const $searchInput = useRef<HTMLInputElement | null>(null);

  const openSearchBox = useCallback(() => {
    $searchInput.current?.focus();
    setIsSearchBoxOpen(true);
  }, [setIsSearchBoxOpen]);

  const onChangeKeyword = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setKeyword(value),
    [setKeyword]
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (keyword === '') {
        return;
      }

      setKeyword('');
      setIsSearchBoxOpen(false);
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
    $searchInput,
  };
};
