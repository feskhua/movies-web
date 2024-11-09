import { useCallback } from 'react';

export const useFiles = () => {
  const get = useCallback((path?: string) => {
    if (!path) {
      return '/images/no-image.svg';
    }

    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
  }, []);

  return {
    get,
  };
};
