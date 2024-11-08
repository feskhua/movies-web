import { MoviesState, Status } from '@/src/types';

export const moviesInitialState: MoviesState = {
  list: {
    entities: [],
    status: Status.unset,
    error: undefined,
    page: 1,
    total: 0,
    limit: 8,
  },

  item: {
    id: null,
    status: Status.unset,
    error: undefined,
    data: undefined,
  },
};
