import { Button, Card } from '@/src/components';
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
      <div className="fixed justify-between top-0 p-30 w-full flex">
        <div className="flex-1">
          {hasMovies && (
            <>
              <h2 className="font-semibold md:text-heading-two text-white">
                {t('movies.title')}
              </h2>
              <Link
                className="hover:animate-pulse sm:scale-75 md:scale-100 md:mt-2"
                href="/movies/add"
              >
                <PlusIcon/>
              </Link>
            </>
          )}
        </div>

        <div className="flex self-end">
          <button
            onClick={handleLogout}
            className="flex align-middle justify-center items-center gap-4 pr-0"
          >
            <span className="hidden md:block text-white">
              {t('auth.title.logout')}
            </span>
            <ExitIcon/>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {!hasMovies && (
          <>
            <h2 className="font-semibold text-heading-two text-white">Your movie list is empty</h2>
            <Button text={t('movies.button.add')} onClick={handleAddMovie} className="w-50.5 self-center"
                    variant="primary"/>
          </>
        )}

        {hasMovies && (
          <div className="flex flex-col px-30 self-start bg-background gap-30 max-w-screen-xl">
            <div className="grid xl:gap-6 md:gap-4 gap-2 grid-cols-12">
              {list.movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/edit/${movie.id}`}
                  className="xl:col-span-3 md:col-span-4 col-span-6 cursor-pointer"
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
