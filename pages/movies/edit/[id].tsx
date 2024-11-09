import { IconButton } from '@/src/components/IconButton';
import { MovieForm } from '@/src/components/MovieForm/MovieForm';
import { PageWrapper } from '@/src/components/PageWrapper';
import { useMoviesItem, useMoviesList } from '@/src/hooks';
import { DeleteIcon } from '@/src/icons';
import { ManageMoviePayload } from '@/src/types';
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <PageWrapper
      title={t('movies.edit.title')}
      headerChildren={
      <IconButton
        icon={<DeleteIcon/>}
        onClick={handleDelete}
      />
    }>
      <MovieForm
        onSubmit={handleSubmit}
        onCancel={returnToList}
        data={item.data ?? undefined}
        error={item.error}
      />
    </PageWrapper>
  );
};

export default EditPage;
