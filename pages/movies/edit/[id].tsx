import {MovieForm} from "@/src/components/MovieForm/MovieForm";
import {useMoviesItem, useMoviesList} from "@/src/hooks";
import {ManageMoviePayload, Status} from "@/src/types";
import { useParams, useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';
import {useTranslation} from "react-i18next";

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
      .then((value: unknown) => {
        returnToList();
      });
  };
  
  const handleDelete = async () => {
    item
      .remove()
      .then((value: unknown) => {
        returnToList();
      });
  };
  
  const returnToList = () => {
    const page = list.page !== 1 ? `?page=${list.page}` : '';
    
    router.push(`/movies${page}`);
  };
  
  return (
    <div className="flex flex-col px-30 self-start bg-background gap-30 w-full">
      <h2 className="font-semibold text-heading-two text-white">${t('movies.edit.title')}</h2>
      <MovieForm
        mode="edit"
        onSubmit={handleSubmit}
        onCancel={returnToList}
        onDelete={handleDelete}
        data={item.data ?? undefined}
        error={item.error}
        isLoading={item.status === Status.pending}
      />
    </div>
  );
};

export default EditPage;
