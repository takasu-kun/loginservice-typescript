import { Request, Response } from "express"
import { IRequestUser } from "../interfaces/authentication"
import { IErrorResponse } from "../interfaces/common"
import getLogger from "./../misc/Logger"
import { getErrorObject } from './../misc/utils'
import { createUser, login } from './../services/userService'

const logger = getLogger("authenticationController.ts")

/**
 * Controller function for login in the user
 *
 * @param request
 * @param response
 */
export function loginUser(request: Request, response: Response) {
    const { email, password } = request.body.data
    login(email, password)
        .then(result => {
            response.status(200).send({ data: result })
        })
        .catch((error: IErrorResponse) => {
            response.status(400).json(error)
        })
}

export async function registerUser(request: Request, response: Response) {
    const user = request.body.data.user as IRequestUser

    const userIsValid = validateUser(user)
    if (!userIsValid.isValid)
        return response.status(400).json(getErrorObject("400", "MissingData", userIsValid.message))

    createUser(user)
        .then(result => {
            logger.info("User successfully created.")
            response.json({ data: result })
        }).catch((err: any) => {
            logger.error(`Failed to create user: ${err}`)
            response.status(400).json(err)
        })
}

//Utils functions
const validateUser = (user: any) => {
    if (!user.email)
        return { isValid: false, message: "User is missing email" }
    if (!user.name)
        return { isValid: false, message: "User is missing name" }
    if (!user.password)
        return { isValid: false, message: "User is missing password" }

    return { isValid: true, message: "Valid user structure" }
}