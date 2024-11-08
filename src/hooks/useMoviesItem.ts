import { useAppDispatch, useAppSelector } from '@/src/store';
import { moviesSlice } from '@/src/store/slices';
import {
  moviesCreateThunk,
  moviesDeleteThunk,
  moviesFetchItemThunk,
  moviesUpdateThunk
} from '@/src/store/thunks/movies.thunks';
import { ManageMoviePayload } from '@/src/types';
import { UseMoviesItemParams } from '@/src/types/hooks';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useMoviesItem = (params: UseMoviesItemParams) => {
  const id = useAppSelector((state) => state.movies.item.id);
  const data = useAppSelector((state) => state.movies.item.data);
  const status = useAppSelector((state) => state.movies.item.status);
  const error = useAppSelector((state) => state.movies.item.error);
  const dispatch = useAppDispatch();
  const [autoloadState, setAutoloadState] = useState(params.autoload ?? false);

  useEffect(() => {
    console.log('useEffect', autoloadState, id);

    if (!autoloadState) {
      return;
    }

    const loadDebounce = debounce(load, 400);

    loadDebounce();

    return () => {
      loadDebounce.cancel();
    };
  }, [autoloadState, id]);

  const load = () => {
    id && dispatch(moviesFetchItemThunk(id)).unwrap();
  };

  const create = (data: ManageMoviePayload) => {
    const { id, ...rest } = data;

    return dispatch(moviesCreateThunk(rest)).unwrap();
  };

  const update = async (data: ManageMoviePayload) => {
    return id && dispatch(moviesUpdateThunk({ ...data, id })).unwrap();
  };

  const remove = async () => {
    return id && dispatch(moviesDeleteThunk(id)).unwrap();
  };

  const setId = (id: string) => {
    dispatch(moviesSlice.actions.setId(id));
  };

  const clear = () => {
    dispatch(moviesSlice.actions.clearItem());
  };

  return {
    id,
    data,
    status,
    error,
    setId,
    create,
    update,
    remove,
    load,
    setAutoloadState,
    clear,
  };
};
