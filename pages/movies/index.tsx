import { Button, ButtonLanguage, Card } from '@/src/components';
import { Pagination } from '@/src/components/Pagination';
import { useAuth, useMoviesList } from '@/src/hooks';
import { ExitIcon, PlusIcon } from '@/src/icons';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function Movies(): ReactNode {
  const { t } = useTranslation();
  const queryParameters = useSearchParams();
  const page = Number(queryParameters.get('page'));

  const router = useRouter();
  const auth = useAuth();
  const list = useMoviesList({
    autoload: true,
  });

  const hasMovies = !!list.movies.length;

  useEffect(() => {
    page && list.changePage(page);
  }, []);

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
  };

  const handleAddMovie = useCallback(() => {
    router.push('/movies/add');
  }, []);

  return (
    <>
      <div className="top-0 flex w-full justify-between p-6 pb-20 md:p-30">
        <div className="flex flex-1 items-center gap-2">
          {hasMovies && (
            <>
              <h2 className="font-semibold text-white text-heading-three md:text-heading-two">
                {t('movies.title')}
              </h2>
              <Link
                className="hover:animate-pulse sm:scale-75 md:mt-2 md:scale-100"
                href="/movies/add"
              >
                <PlusIcon/>
              </Link>
            </>
          )}
        </div>
        <div className="flex">
          <ButtonLanguage/>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-4 pr-0 align-middle"
          >
            <span className="hidden text-white md:block">
              {t('auth.title.logout')}
            </span>
            <ExitIcon/>
          </button>
        </div>
      </div>
      {!hasMovies && (
        <div
          className="flex min-h-full flex-col items-center justify-center gap-10 self-center text-center h-screen-minus-128 md:h-full md:pt-40">
          <h2 className="font-semibold text-white text-heading-three md:text-heading-two">Your movie list is empty</h2>
          <Button text={t('movies.button.add')} onClick={handleAddMovie} className="w-full self-center md:w-50.5"
                  variant="primary"/>
        </div>
      )}
      <div className="flex w-full max-w-screen-xl flex-col gap-10 px-6 md:px-30">
        {hasMovies && (
          <div className="flex w-full flex-col self-start bg-background gap-30">
            <div className="grid grid-cols-12 gap-2 md:gap-4 xl:gap-6">
              {list.movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/edit/${movie.id}`}
                  className="col-span-6 cursor-pointer md:col-span-4 xl:col-span-3"
                >
                  <Card
                    title={movie.title}
                    year={movie.year}
                    path={movie.poster}
                  />
                </Link>
              ))}
            </div>
            <Pagination
              page={list.page}
              totalPages={Math.ceil(list.total / list.limit)}
              onChange={list.changePage}
            />
          </div>
        )}
      </div>
    </>
  );
}
