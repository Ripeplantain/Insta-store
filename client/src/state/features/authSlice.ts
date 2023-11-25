import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface UserState {
    id: string
    firstName: string
    lastName: string
    email: string
    address: string
    phoneNumber: string
    role: string
    createdAt: string
    updatedAt: string
}

export interface AuthState {
    user: UserState | null
    isAuth: boolean
    accessToken: string | null
    refreshToken: string | null
}

const initialState: AuthState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    isAuth: localStorage.getItem('isAuth') ? JSON.parse(localStorage.getItem('isAuth')!) : false,
    accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null,
    refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user
            state.isAuth = action.payload.isAuth
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            localStorage.setItem('accessToken', action.payload.accessToken!)
            localStorage.setItem('refreshToken', action.payload.refreshToken!)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('isAuth', true.toString())
        },
        removeCredentials: (state) => {
            state.user = null
            state.isAuth = false
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            localStorage.removeItem('isAuth')
        },
        updateUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        }
    }
})

export const { setCredentials, removeCredentials, updateUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken


export default authSlice.reducer