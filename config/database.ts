import { Options } from 'mikro-orm'
import { User } from '../entities'

export const {
    DB_NAME = 'postgres',
    DB_PORT = '5432',
    DB_USER = 'postgres',
    DB_PASSWORD = 'postgres',
    DB_HOST = 'localhost',
    DB_URL = `postgresql://${DB_HOST}:${DB_PORT}`,
    DB_PG_SCRIPT_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
} = process.env;

export const ORM_INIT_VALUES: Options = {
    entities: [ User ],
    entitiesDirsTs: ['./entities'],
    entitiesDirs: ['./build/entities'],
    dbName: DB_NAME,
    type: 'postgresql',
    host: DB_HOST,
    clientUrl: DB_URL,
    user: DB_USER,
    password: DB_PASSWORD,
}
