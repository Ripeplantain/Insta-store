
export type ErrorState = {
    status: number;
    error: string
}

export type ServerError = {
    status: number;
    data: {
        message: string
    }
}