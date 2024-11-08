import {authReducer, moviesReducer} from "@/src/store/reducers";
import {AuthState} from "@/src/types/store";
import {configureStore, createStore, Store} from "@reduxjs/toolkit";
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer
  },
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
