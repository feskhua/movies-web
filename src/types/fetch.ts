export interface AuthResponse {
  id: string;
  token: string;
  refresh?: string;
}

export interface AuthLoginFetchDataValue {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthRegisterFetchDataValue {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
}

export interface MoviesListResponse {
  data: Movie[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface MovieListParams {
  page?: number;
  perPage?: number;
}

export interface ManageMoviePayload {
  id?: number;
  title: string;
  year: number;
  file?: File | null;
}
