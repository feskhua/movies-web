import { moviesInitialState } from '@/src/store/init';
import { authSlice } from '@/src/store/slices/auth.slice';
import {
  moviesCreateThunk, moviesDeleteThunk,
  moviesFetchItemThunk,
  moviesFetchMovieList,
  moviesUpdateThunk
} from '@/src/store/thunks/movies.thunks';
import { MoviesState, Status } from '@/src/types';
import { find } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    setPage: (state, action) => {
      state.list.page = action.payload;
    },
    setSelected: (state, action) => {
      state.item.data = find(state.list.entities, ({ id }) => id === action.payload);
    },
    setId: (state, action) => {
      state.item.id = action.payload;
    },
    clearItem: (state) => {
      state.item.data = null;
      state.item.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(moviesFetchMovieList.pending, (state: MoviesState) => {
      state.list.status = Status.pending;
      state.list.error = undefined;
    });
    builder.addCase(moviesFetchMovieList.fulfilled, (state: MoviesState, action) => {
      state.list.entities = action.payload.data;
      state.list.total = action.payload.meta.total;
      state.list.limit = action.payload.meta.limit;
      state.list.status = Status.success;
    });
    builder.addCase(moviesFetchMovieList.rejected, (state: MoviesState, action) => {
      state.list.status = Status.error;
      state.list.error = action.payload?.[0]?.message;
    });

    builder.addCase(moviesFetchItemThunk.pending, (state: MoviesState) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
      state.item.data = undefined;
    });
    builder.addCase(moviesFetchItemThunk.fulfilled, (state: MoviesState, action) => {
      state.item.data = action.payload;
      state.item.status = Status.success;
    });
    builder.addCase(moviesFetchItemThunk.rejected, (state: MoviesState, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.[0]?.message;
    });

    builder.addCase(moviesCreateThunk.pending, (state: MoviesState) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(moviesCreateThunk.fulfilled, (state: MoviesState) => {
      state.item.status = Status.success;
    });
    builder.addCase(moviesCreateThunk.rejected, (state: MoviesState, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.[0]?.message;
    });

    builder.addCase(moviesUpdateThunk.pending, (state: MoviesState) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(moviesUpdateThunk.fulfilled, (state: MoviesState) => {
      state.item.status = Status.success;
    });
    builder.addCase(moviesUpdateThunk.rejected, (state: MoviesState, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.[0]?.message;
    });

    builder.addCase(moviesDeleteThunk.pending, (state: MoviesState) => {
      state.item.status = Status.pending;
      state.item.error = undefined;
    });
    builder.addCase(moviesDeleteThunk.fulfilled, (state: MoviesState) => {
      state.item.status = Status.success;
    });
    builder.addCase(moviesDeleteThunk.rejected, (state:MoviesState, action) => {
      state.item.status = Status.error;
      state.item.error = action.payload?.[0]?.message;
    });

    builder.addCase(authSlice.actions.clear, () => {
      return moviesInitialState;
    });
  }
});
