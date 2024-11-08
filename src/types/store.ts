import { RequestStatus } from '@/src/constants/core.auth';
import { RootState } from '@/src/store';
import { AuthLoginFetchDataValue, AuthRegisterFetchDataValue, Movie } from '@/src/types/fetch';

export interface ResponseBodyFailed {
  ok: false;
  error: ErrorType;
}

export interface ErrorType {
  message: string;
  name: string;
  fields?: Record<string, string[]>;
  code?: number;
}

export interface AuthLoginRequestValue extends AuthLoginFetchDataValue {
}

export interface AuthRegisterRequestValue extends AuthRegisterFetchDataValue {
}

export interface BaseAsyncThunkOptions<E = ErrorType[], S = RootState> {
  rejectValue: E;
  state: any;
}

export interface BaseResolveType {
  message?: string;
  name?: string;
  code?: number;
}

export type ResponseMessageFormats =
  | SuccessResponseFormat
  | ErrorResponseFormat
  | InfoResponseFormat
  | WarningResponseFormat;

export interface SuccessResponseFormat {
  type: 'success';
  data: BaseResolveType | undefined;
}

export interface ErrorResponseFormat {
  type: 'error';
  data: ErrorType | undefined;
}

export interface InfoResponseFormat {
  type: 'info';
  data: BaseResolveType | undefined;
}

export interface WarningResponseFormat {
  type: 'warning';
  data: ErrorType | undefined;
}

export interface AuthState {
  status: RequestStatus;
  response: ResponseMessageFormats | null;
  id?: string | null;
  token: string | null;
  refresh: string | null;
}

export enum Status {
  unset = 'unset',
  pending = 'pending',
  success = 'success',
  error = 'error'
}

export interface MoviesState {
  list: {
    entities: Movie[];
    status: Status;
    error?: string;
    page: number;
    total: number;
    limit: number;
  };

  item: {
    data: Movie | null | undefined;
    id: number | null;
    status: Status;
    error?: string;
  };
}
