import { MovieForm } from '@/src/components/MovieForm/MovieForm';
import { PageWrapper } from '@/src/components/PageWrapper';
import { useMoviesItem, useMoviesList } from '@/src/hooks';
import { ManageMoviePayload, Status } from '@/src/types';
import { useParams, useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const EditPage = (): ReactElement => {
  const params = useParams();
  const router = useRouter();
  const item = useMoviesItem({ autoload: true });
  const { t } = useTranslation();
  const list = useMoviesList({ autoload: false });

  useEffect(() => {
    item.setId(params?.id as string);

    return () => {
      item.clear();
    };
  }, [params?.id]);

  const handleSubmit = async (data: ManageMoviePayload) => {
    item
      .update(data)
      .catch(() => {
        toast(t('notifications.update.error'), { type: 'error' });
      })
      .then((value) => {
        if (value) {
          toast(t('notifications.update.success'), { type: 'success' });
          returnToList();
        }
      });
  };

  const handleDelete = async () => {
    item
      .remove()
      .catch(() => {
        toast(t('notifications.delete.error'), { type: 'error' });
      })
      .then((value) => {
        if (value) {
          toast(t('notifications.delete.success'), { type: 'success' });

          returnToList();
        }
      });
  };

  const returnToList = () => {
    const page = list.page !== 1 ? `?page=${list.page}` : '';

    router.push(`/movies${page}`);
  };

  return (
    <PageWrapper title={t('movies.edit.title')}>
      <MovieForm
        mode="edit"
        onSubmit={handleSubmit}
        onCancel={returnToList}
        onDelete={handleDelete}
        data={item.data ?? undefined}
        error={item.error}
        isLoading={item.status === Status.pending}
      />
    </PageWrapper>
  );
};

export default EditPage;
