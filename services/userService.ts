import { User } from '../entities'
import { compare } from 'bcryptjs'
import { APP_SECRET } from '../config'
import { IRequestUser, ILoginResponse } from '../interfaces/authentication'
import getLogger from './../misc/Logger'
import { db } from './../app'
import jwt from 'jsonwebtoken'
const logger = getLogger("userService.ts")


export async function createUser(user: IRequestUser): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const data = Object.assign({}, user)
            const newUser = db.userRepository.create(data)
            await db.userRepository.persistAndFlush(newUser)
            resolve(newUser)
        } catch (error) {
            reject(error)
            logger.error(`Failed to create user: ${error}`)
        }
    })
}

export async function login(email: string, password: string): Promise<ILoginResponse> {
    return new Promise<ILoginResponse>(async (resolve, reject) => {
        try {
            // const data = Object.assign({}, email, password)
            const user = db.userRepository.findOneOrFail({email})
            let tokens: string = "";
            await compare(password, (await user).password).then(async (res: any) => {
                if (res) {
                    tokens = jwt.sign( {
                        user_id: (await user).id,
                        email,
                    }, APP_SECRET, {
                        expiresIn: "1h",
                    });
                }
            })
            
            resolve({
                user,
                tokens
            })
        } catch (error) {
            reject(error)
            logger.error(`Failed to create user: ${error}`)
        }
    })
}