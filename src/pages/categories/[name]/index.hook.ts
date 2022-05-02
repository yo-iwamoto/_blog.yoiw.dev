import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useHooks = () => {
  const router = useRouter();

  const query = useMemo(() => {
    const { name } = router.query;
    if (typeof name !== 'string') {
      return null;
    }

    return name;
  }, [router.query]);

  return {
    query,
  };
};
