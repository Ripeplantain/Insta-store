export type LoginInput = {
    email: string;
    password: string;
};

export type RegisterInput = {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
};


export type OrderInput = {
    product: string;
    quantity: number;
    location: string;
    total: number;
    paymentState: string;
}