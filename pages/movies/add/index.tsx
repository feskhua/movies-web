import { MovieForm } from '@/src/components/MovieForm/MovieForm';
import { useMoviesItem, useMoviesList } from '@/src/hooks';
import { ManageMoviePayload, Status } from '@/src/types';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function Auth(): ReactNode {
  const router = useRouter();
  const list = useMoviesList();
  const item = useMoviesItem({});
  const { t } = useTranslation();

  const handleSubmit = (data: ManageMoviePayload) => {
    item
      .create(data)
      .then(() => {
        returnToList();
      });
  };

  const returnToList = () => {
    const page = list.page !== 1 ? `?page=${list.page}` : '';

    router.push(`/movies${page}`);
  };

  return (
    <div className="flex flex-col md:px-30 px-6 self-start bg-background gap-30 w-full max-w-screen-xl">
      <h2 className="font-semibold md:text-heading-two  text-heading-three text-white">{t('movies.add.title')}</h2>
      <MovieForm
        mode="add"
        onSubmit={handleSubmit}
        onCancel={returnToList}
        isLoading={item.status === Status.pending}
      />
    </div>
  );
}
