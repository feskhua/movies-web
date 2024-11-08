import { RequestStatus } from '@/src/constants/core.auth';
import { authInitialState } from '@/src/store/init/auth.init';
import { authLoginThunk, authLogoutThunk, authRegistrationThunk } from '@/src/store/thunks';
import { AuthState } from '@/src/types/store';
import { createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    clearResponses: (state) => {
      state.response = null;
    },

    clear: (state) => {
      state = authInitialState;
    }
  },

  extraReducers: (builder) => {
    // login

    builder.addCase(authLoginThunk.pending, (state: AuthState) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(authLoginThunk.fulfilled, (state: AuthState, { payload }) => {
      state.status = RequestStatus.SUCCESS;
      state.token = payload.token;

      if (payload.refresh) {
        state.refresh = payload.refresh;
      }
    });

    builder.addCase(authLoginThunk.rejected, (state: AuthState, { payload }) => {
      const isAuth = get(payload, [0, 'name']) === 'validation';
      const error = payload ? payload[0] : undefined;
      const data = isAuth ? { name: 'authorisation', message: '' } : error;

      state.status = RequestStatus.ERROR;
      state.response = {
        type: 'error',
        data: data,
      };
    });

    // registration

    builder.addCase(authRegistrationThunk.pending, (state: AuthState) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(authRegistrationThunk.fulfilled, (state: AuthState, { payload }) => {
      state.status = RequestStatus.SUCCESS;
      state.token = payload.token;
      state.id = payload.id;

      if (payload.refresh) {
        state.refresh = payload.refresh;
      }

      state.response = {
        type: 'success',
        data: {
          name: 'created',
        },
      };
    });

    builder.addCase(authRegistrationThunk.rejected, (state: AuthState, { payload }) => {
      state.status = RequestStatus.ERROR;
      state.response = {
        type: 'error',
        data: payload ? payload[0] : undefined,
      };
    });

    // logout
    builder.addCase(authLogoutThunk.fulfilled, (state: AuthState) => {
      state = authInitialState;
    });
  },
});
