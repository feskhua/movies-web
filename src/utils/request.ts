import { HttpResponseErrorType, ErrorType, ResponseBodyFailed } from '@/src/types';
import axios from 'axios';
import { assign } from 'lodash';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  signal: new AbortController().signal,
});

export const nextApiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api`,
  signal: new AbortController().signal,
});

export const handleHttpError = (error: HttpResponseErrorType): ResponseBodyFailed => ({
  ok: false,
  error: assign({}, {
    code: error?.response?.status ?? 0,
    name: error?.response?.data?.name ?? 'error',
    message: error?.response?.data?.message ?? 'Uncaught server error, please try again later',
    fields: error.response?.data?.fields,
  }) as ErrorType,
});

