import { useAppDispatch, useAppSelector } from '@/src/store';
import { moviesSlice } from '@/src/store/slices';
import { moviesFetchMovieList } from '@/src/store/thunks/movies.thunks';
import { UseMoviesListParams } from '@/src/types/hooks';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useMoviesList = (params: UseMoviesListParams = {}) => {
  const movies = useAppSelector((state) => state.movies.list.entities);
  const status = useAppSelector((state) => state.movies.list.status);
  const total = useAppSelector((state) => state.movies.list.total);
  const limit = useAppSelector((state) => state.movies.list.limit);
  const page = useAppSelector((state) => state.movies.list.page);
  const dispatch = useAppDispatch();
  const [autoloadState, setAutoloadState] = useState(params.autoload ?? false);

  useEffect(() => {
    if (!autoloadState) {
      return;
    }

    const loadDebounce = debounce(load, 400);

    loadDebounce();

    return () => {
      loadDebounce.cancel();
    };
  }, [autoloadState, page]);

  const load = () => {
    dispatch(moviesFetchMovieList({ page }));
  };

  const changePage = (page: number) => {
    dispatch(moviesSlice.actions.setPage(page));
  };

  return {
    movies,
    status,
    page,
    total,
    limit,
    load,
    changePage,
    setAutoloadState,
  };
};
