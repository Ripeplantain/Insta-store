

export interface ErrorState {
    response: {
        data: string
    }
}

export type ServerError = {
    response: {
        data: {
            message: string
        }
    }
}