import bcrypt from 'bcrypt'
import { BeforeCreate, Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from 'mikro-orm'
import { v4 } from 'uuid'
import { APP_SALT_ROUNDS } from '../config'

@Entity()
export class User {

    @PrimaryKey()
    id: string = v4()

    @Property({ nullable: false })
    name: string

    @Property({ nullable: false, unique: true })
    email: string

    @Property({ hidden: true, nullable: false })
    password: string

    @Property({ default: true })
    isEnabled: boolean = false

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()

    constructor(email: string, name: string, password: string) {
        this.email = email.toLowerCase()
        this.name = name
        this.password = password
    }

    //Lifecycle methods
    @BeforeCreate()
    async hashPassword(): Promise<string> {
        return new Promise(resolve => {
            bcrypt.hash(this.password, APP_SALT_ROUNDS)
                .then(hash => {
                    this.password = hash
                    resolve(hash)
                }).catch(error => {
                    throw new Error("Failed to generate user password: " + error)
                })
        })
    }

    //Misc methods
    comparePassword(plainPassword: string): boolean {
        bcrypt.compare(plainPassword, this.password, function (error, result) {
            if (error)
                throw new Error("Failed to compare user password: " + error)
            else
                return result
        })
        return false
    }
}
