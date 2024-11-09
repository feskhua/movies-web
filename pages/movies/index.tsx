import { Button, ButtonLanguage, Card } from '@/src/components';
import { IconButton } from '@/src/components/IconButton';
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

  const listMovies = !!list.movies.length;

  useEffect(() => {
    page && list.changePage(page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
  };

  const handleAddMovie = useCallback(() => {
    router.push('/movies/add');
  }, [router]);

  return (
    <div className="flex flex-col md:pt-0 h-full">
      <div className="max-h-fit md:col-start-5  flex flex-col  md:col-span-4 col-span-12 items-center gap-14">
        <div className="flex items-center w-full justify-between md:mb-20 mb-10">
          <div className="flex items-center gap-2">
            { listMovies && (
              <>
                <h2 className="font-semibold text-white text-heading-three md:text-heading-two">
                  {t('movies.title')}
                </h2>
                <IconButton icon={<PlusIcon/>} onClick={handleAddMovie}/>
              </>
            )}
          </div>
          <div className="flex">
            <ButtonLanguage/>
            <IconButton
              icon={<ExitIcon/>}
              onClick={handleLogout}
              title={t('auth.title.logout')}
              className="flex items-center justify-center gap-4 pr-0 align-middle"
            />
          </div>
        </div>
        <div className={'flex flex-col flex-auto relative w-full'}>
          <div className="flex flex-auto flex-col w-full">
            {! listMovies && (
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
              { listMovies && (
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

            { listMovies && (
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
