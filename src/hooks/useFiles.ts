
export const useFiles = () => {
  const get = (path?: string) => {
    if (!path) {
      return '/images/no-image.svg';
    }

    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
  };

  return {
    get,
  };
};
