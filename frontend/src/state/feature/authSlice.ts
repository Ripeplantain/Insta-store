import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { AuthState, UserState } from "../../helper/types/stateTypes";


const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})


export const { setAuth, setUser, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;