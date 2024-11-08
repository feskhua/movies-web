import {AuthLoginFetchDataValue, AuthRegisterFetchDataValue, AuthResponse} from "@/src/types";
import {apiClient, nextApiClient} from "@/src/utils/request";

export const authLoginRequest = <T = AuthResponse>(payload: AuthLoginFetchDataValue) => {
  return nextApiClient.post<T>('login', payload);
};

export const authRegistrationRequest = <T = AuthResponse>(payload: AuthRegisterFetchDataValue) => {
  return nextApiClient.post<T>(`register`, payload);
};

export const authLogoutRequest = <T = AuthResponse>() => {
  return nextApiClient.post<T>('logout');
}
