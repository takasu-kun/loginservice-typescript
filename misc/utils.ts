import { Request, Response } from "express"
import { IHttpErrorResponse } from "../interfaces/common"

export async function checkIfBodyExists(request: Request, response: Response, next: Function) {
    if (!request.body.data)
        return response.status(400).json(getErrorObject("400", "MissingBodyData", "Request's body missing"))
    next()
}

export const getErrorObject = (code: string, type: string, message: string): IHttpErrorResponse => {
    return { error: { code, type, message } }
}

export const compareStringIgnoreCase = (string1: string, string2: string): boolean => {
    return string1.toLowerCase() === string2.toLowerCase()
}
