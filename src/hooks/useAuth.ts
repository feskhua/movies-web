import { useAppDispatch, useAppSelector } from '@/src/store';
import { authSlice } from '@/src/store/slices';
import { authLoginThunk, authLogoutThunk, authRegistrationThunk } from '@/src/store/thunks';
import { AuthLoginRequestValue, AuthRegisterRequestValue } from '@/src/types/store';
import { useCallback } from 'react';

export const useAuth = () => {
  const id = useAppSelector((store) => store.auth.id);
  const status = useAppSelector((store) => store.auth.status);
  const token = useAppSelector((store) => store.auth.token);
  const refreshToken = useAppSelector((store) => store.auth.refresh);
  const dispatch = useAppDispatch();

  // login request
  const login = useCallback((value: AuthLoginRequestValue) => {
    return dispatch(authLoginThunk(value)).unwrap();
  }, [dispatch]);

  // registration request
  const registration = useCallback((value: AuthRegisterRequestValue) => {
    return dispatch(authRegistrationThunk(value)).unwrap();
  }, []);

  // logout
  const logout = useCallback(() => {
    dispatch(authSlice.actions.clear());

    return dispatch(authLogoutThunk({})).unwrap();
  }, []);

  return {
    status,
    token,
    refreshToken,
    login,
    logout,
    registration,
    id,
  };
};
