
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

export type ProductSliceState = {
    product: ProductState[];
    searchedProduct: string | null;
}

export type CartState = {
    items: ProductState[];
    count: number;
    total: number;
}

export type OrderState = {
    _id: string;
    client: string;
    product: string[];
    quantity: number[];
    status: string;
    location: string;
    total: number;
    paymentState: string;
    createdAt: string;
    updatedAt: string;
}

export type VendorState = {
    _id: string;
    name: string;
    description: string;
    user: string;
    diliveryType: string;
    createdAt: string;
    updatedAt: string;
}