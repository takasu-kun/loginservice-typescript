export interface IErrorResponse {
    code: string,
    type: string,
    message: string
}
// Utils
/**
 * Interface for HTTP reponse
 */
export interface IHttpErrorResponse {
    error: IErrorResponse
}
