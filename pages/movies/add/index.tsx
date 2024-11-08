import {MovieForm} from "@/src/components/MovieForm/MovieForm";
import {useMoviesItem, useMoviesList} from "@/src/hooks";
import {ManageMoviePayload, MovieFormValues, Status} from "@/src/types";
import {useRouter} from "next/navigation";
import type {ReactNode} from "react";
import {useTranslation} from "react-i18next";


export default function Auth(): ReactNode {
  const router = useRouter();
  const list = useMoviesList();
  const item = useMoviesItem({});
  const { t } = useTranslation()
  
  const handleSubmit = async (data: ManageMoviePayload) => {
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
    <div className="flex flex-col px-30 self-start bg-background gap-30 max-w-screen-xl">
      <h2 className="font-semibold text-heading-two text-white">{t('movies.add.title')}</h2>
      <MovieForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={returnToList}
        isLoading={item.status === Status.pending}
        error={item.error}
      />
    </div>
  );
}
