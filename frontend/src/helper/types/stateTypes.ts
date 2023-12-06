
export type UserState = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    address: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}


export type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    user: UserState | null;
}