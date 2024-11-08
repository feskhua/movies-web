import { AuthLoginFetchDataValue, AuthRegisterFetchDataValue, AuthResponse, MoviesListResponse } from '@/src/types';
import { nextApiClient } from '@/src/utils/request';

export const moviesListRequest = <T = MoviesListResponse>(payload: AuthLoginFetchDataValue) => {
  return nextApiClient.post<T>('/api/moviesList', payload);
};

export const authRegistrationRequest = <T = AuthResponse>(payload: AuthRegisterFetchDataValue) => {
  return nextApiClient.post<T>('auth/register', payload);
};
