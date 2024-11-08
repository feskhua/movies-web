import { HttpResponseErrorType, ManageMoviePayload, Movie, MovieListParams, MoviesListResponse } from '@/src/types';
import { BaseAsyncThunkOptions } from '@/src/types/store';
import { createFormData } from '@/src/utils';
import { handleHttpError, nextApiClient } from '@/src/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const moviesFetchMovieListFactory = (type: string) => createAsyncThunk<
  MoviesListResponse,
  MovieListParams,
  BaseAsyncThunkOptions
>(type, async (params, { rejectWithValue }) => {
  try {
    const response = await nextApiClient.get<MoviesListResponse>('movies/list', { params });

    return response.data;
  } catch (e) {
    return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
  }
});

export const moviesCreateThunkFactory = (type:string) => createAsyncThunk<
  Movie,
  ManageMoviePayload,
  BaseAsyncThunkOptions
>(type, async (data, { rejectWithValue }) => {
  try {
    const response = await nextApiClient.post<Movie>('movies/create', createFormData(data), {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (e) {
    return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
  }
});

export const moviesFetchItemThunkFactory = (type: string) => createAsyncThunk<
  Movie,
  number,
  BaseAsyncThunkOptions
>(type, async (id, { rejectWithValue }) => {
  try {
    const response = await nextApiClient.get<Movie>(`movies/${id}`);

    return response.data;
  } catch (e) {
    return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
  }
});

export const moviesUpdateThunkFactory = (type: string) => createAsyncThunk<
  Movie,
  ManageMoviePayload,
  BaseAsyncThunkOptions
>(type, async (data, { rejectWithValue }) => {
  try {
    const response = await nextApiClient.patch<Movie>(`movies/${data.id}`, createFormData(data));

    return response.data;
  } catch (e) {
    return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
  }
});

export const moviesDeleteThunkFactory = (type: string) => createAsyncThunk<
  unknown,
  number,
  BaseAsyncThunkOptions
>(type, async (id, { rejectWithValue }) => {
  try {
    const response = await nextApiClient.delete<Movie>(`movies/${id}`);

    return response.data;
  } catch (e) {
    return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
  }
});

export const moviesFetchMovieList = moviesFetchMovieListFactory('movies/list');
export const moviesCreateThunk = moviesCreateThunkFactory('movies/create');
export const moviesFetchItemThunk = moviesFetchItemThunkFactory('movies/item');
export const moviesUpdateThunk = moviesUpdateThunkFactory('movies/update');
export const moviesDeleteThunk = moviesDeleteThunkFactory('movies/delete');
