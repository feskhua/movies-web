import { RequestStatus } from '@/src/constants/core.auth';
import { AuthState } from '@/src/types/store';

export const authInitialState: AuthState = {
  response: null,
  status: RequestStatus.UNSET,
  token: null,
  refresh: null,
};
