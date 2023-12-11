import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { AuthState, UserState } from "../../helper/types/stateTypes";


const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('accessToken', action.payload.accessToken || '');
            localStorage.setItem('refreshToken', action.payload.refreshToken || '');
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        tokenReceived: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload)
        },
        updateUserType: (state, action: PayloadAction<string>) => {
            state.user!.role = action.payload;
        }
    }
})


export const { setAuth, setUser, logout, tokenReceived, updateUserType } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export default authSlice.reducer;