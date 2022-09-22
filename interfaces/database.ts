import { EntityManager, EntityRepository, MikroORM } from "mikro-orm"

import { User } from "../entities"

export interface ORMDatabase {
    initalized: boolean,
    orm: MikroORM,
    em: EntityManager
    userRepository: EntityRepository<User>
}