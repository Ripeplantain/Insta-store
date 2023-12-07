
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

export type CartegoryState = {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export type CartegorySliceState = {
    cartegory: CartegoryState[];
    selectedCartegory: string | null;
}

export type ProductState = {
    _id: string;
    name: string;
    description: string;
    cartegory_id: string;
    vendor_id: {
        _id: string;
        name: string;
    };
    price: number;
    quantity: number;
    owner: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
}