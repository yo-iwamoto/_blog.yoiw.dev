import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useHooks = () => {
  const router = useRouter();

  const query = useMemo(() => {
    const { q } = router.query;
    if (typeof q !== 'string') {
      return null;
    }

    return q;
  }, [router.query]);

  return {
    query,
  };
};
