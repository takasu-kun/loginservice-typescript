//AuthenticationController
export interface IRequestUser {
    email: string
    name: string
    password: string
}

export interface IErrorResponse {
    code: string,
    type: string,
    message: string
}

export interface ILoginResponse {
    user: {},
    tokens: string
}