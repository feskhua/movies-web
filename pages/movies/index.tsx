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
    <div className="flex flex-col md:pt-0 py-8 h-full">
      <div className="max-h-fit md:col-start-5  flex flex-col  md:col-span-4 col-span-12 items-center gap-14">
        <div className="flex items-center w-full justify-between md:mb-20 mb-10">
          <div className="flex items-center gap-2">
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
        <div className={'flex flex-col flex-auto relative w-full'}>
          <div className="flex flex-auto flex-col w-full">
            {!hasMovies && (
              <div
                className="flex flex-col  justify-center items-center gap-8"
              >
                <h2
                  className="font-semibold text-white text-heading-three md:text-heading-two"
                >
                  {t('movies.noItems')}
                </h2>
                <Button
                  text={t('movies.button.add')}
                  onClick={handleAddMovie}
                  className="w-full self-center md:w-50.5"
                  variant="primary"
                />
              </div>
            )}
              {hasMovies && (
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
              )}

            {hasMovies && (
              <div className="my-16">
                <Pagination
                  page={list.page}
                  totalPages={Math.ceil(list.total / list.limit)}
                  onChange={list.changePage}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
