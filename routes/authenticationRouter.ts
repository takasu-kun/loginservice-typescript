import * as express from 'express'
import { Request, Response } from "express"
import { IHttpErrorResponse } from '../interfaces/common'
import { loginUser, registerUser } from './../controllers/authenticationController'
import { checkIfBodyExists } from '../misc/utils';

const router = express.Router()

router.post('/login', checkIfBodyExists, (req, res) => {
    loginUser(req, res)
})

router.post('/register', checkIfBodyExists, (req, res) => {
    registerUser(req, res)
})

//Default error handler used for schema validation
router.use((error: IHttpErrorResponse, _req: Request, res: Response, _next: any) => {
    return res.status(400).send(error)
})

export default router