import {
  moviesCreateRequest,
  moviesDeleteRequest,
  moviesItemRequest,
  moviesListRequest,
  moviesUpdateRequest
} from '@/src/requests/movies';
import { HttpResponseErrorType, ManageMoviePayload, Movie, MovieListParams, MoviesListResponse } from '@/src/types';
import { BaseAsyncThunkOptions } from '@/src/types/store';
import { handleHttpError } from '@/src/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const moviesFetchMovieListFactory = (type: string) => createAsyncThunk<
  MoviesListResponse,
  MovieListParams,
  BaseAsyncThunkOptions
>(type, async (params, { rejectWithValue }) => {
  try {
    const response = await moviesListRequest(params);

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
    const response = await moviesCreateRequest(data);

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
    const response = await moviesItemRequest(id);

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
    const response = await moviesUpdateRequest(data);

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
    const response = await moviesDeleteRequest(id);

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
