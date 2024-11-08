import { AxiosError } from 'axios';

export type HttpResponseErrorType = AxiosError<{
  name: string;
  message: string;
  fields: Record<string, string[]>;
}>;
