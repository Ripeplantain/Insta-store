

export type LoginForm = {
    email: string
    password: string
}

export type RegisterForm = {
    firstName: string
    lastName: string
    email: string
    password: string
    address: string
    phoneNumber: string
}

export type VendorForm = {
    name: string
    description: string
    deliveryType: string
}

export type ProductType = {
    name: string
    description: string
    price: string
    quantity: string
    picture: string
    cartegory_id: string
}