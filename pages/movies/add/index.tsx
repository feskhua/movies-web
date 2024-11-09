import { MovieForm } from '@/src/components/MovieForm/MovieForm';
import { PageWrapper } from '@/src/components/PageWrapper';
import { useMoviesItem, useMoviesList } from '@/src/hooks';
import type { ManageMoviePayload } from '@/src/types';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function Auth(): ReactNode {
  const router = useRouter();
  const list = useMoviesList();
  const item = useMoviesItem({});
  const { t } = useTranslation();

  const handleSubmit = (data: ManageMoviePayload) => {
    item
      .create(data)
      .catch(() => {
        toast(t('notifications.create.error'), { type: 'error' });
      })
      .then((value) => {
        if (value) {
          toast(t('notifications.create.success'), { type: 'success' });
          returnToList();
        }
      });
  };

  const returnToList = () => {
    const page = list.page !== 1 ? `?page=${list.page}` : '';

    router.push(`/movies${page}`);
  };

  return (
    <PageWrapper title={t('movies.add.title')}>
        <MovieForm
          onSubmit={handleSubmit}
          onCancel={returnToList}
        />
    </PageWrapper>
  );
}
