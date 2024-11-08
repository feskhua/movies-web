import {authLoginRequest, authLogoutRequest, authRegistrationRequest} from "@/src/requests";
import {AuthResponse, HttpResponseErrorType} from "@/src/types";
import {AuthLoginRequestValue, AuthRegisterRequestValue, BaseAsyncThunkOptions} from "@/src/types";
import {handleHttpError} from "@/src/utils/request";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const authLoginThunkFactory = (type: string) => createAsyncThunk<
  AuthResponse,
  AuthLoginRequestValue,
  BaseAsyncThunkOptions
>(type, async (payload, {rejectWithValue}) => {
    try {
      const response = await authLoginRequest(payload);
      
      return response.data;
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const authRegistrationThunkFactory = (type: string) => createAsyncThunk<
  AuthResponse,
  AuthRegisterRequestValue,
  BaseAsyncThunkOptions
>(type, async (payload, {rejectWithValue}) => {
    try {
      const response = await authRegistrationRequest(payload);
      
      return response.data;
    } catch (e) {
      return rejectWithValue([handleHttpError(e as HttpResponseErrorType).error]);
    }
  },
);

export const authLogoutThunkFactory = (type: string) => createAsyncThunk<
  void,
  unknown,
  BaseAsyncThunkOptions
>(type, async () => {
    console.log('authLogoutThunkFactory');
    
    await authLogoutRequest();
    
    return undefined;
  },
);


export const authLoginThunk = authLoginThunkFactory('auth/login');
export const authRegistrationThunk = authRegistrationThunkFactory('auth/registration');
export const authLogoutThunk = authLogoutThunkFactory('auth/logout');
