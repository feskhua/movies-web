import {
  ManageMoviePayload,
  Movie, MovieListParams,
  MoviesListResponse
} from '@/src/types';
import { createFormData } from '@/src/utils';
import { nextApiClient } from '@/src/utils/request';

export const moviesListRequest = <T = MoviesListResponse>(params: MovieListParams) => {
  return nextApiClient.get<T>('/movies/list', { params });
};

export const moviesItemRequest = <T = Movie>(id: number) => {
  return nextApiClient.get<T>(`/movies/${id}`);
};

export const moviesUpdateRequest = <T = Movie>(payload: ManageMoviePayload) => {
  return nextApiClient.patch<T>(`/movies/edit/${payload.id}`, createFormData(payload));
};

export const moviesCreateRequest = <T = Movie>(payload: ManageMoviePayload) => {
  return nextApiClient.post<T>('/movies/create', createFormData(payload));
};

export const moviesDeleteRequest = <T = Movie>(id: number) => {
  return nextApiClient.delete<T>(`/movies/${id}`);
};
