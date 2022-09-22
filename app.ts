import express, { Express, Request, Response } from 'express';
import { MikroORM, RequestContext } from 'mikro-orm'
import { APP_PORT, APP_BASE_URL, ORM_INIT_VALUES } from './config';
import { User } from './entities/User'
import authenticationRouter from './routes/authenticationRouter';
import { ORMDatabase } from './interfaces/database';
import getLogger from './misc/Logger'
export const db = {} as ORMDatabase
const app: Express = express();
const port = APP_PORT;
const logger = getLogger("app.ts");
export let application = {} as express.Application
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server is running.');
// });


export async function init(): Promise<express.Application> {
  return new Promise(async (resolve, reject) => {
    try{
      await initDB();
      app.use((req, res, next) => RequestContext.create(db.em, next))
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        next()
      })
      app.use(`${APP_BASE_URL}/auth`, authenticationRouter)
  
      resolve(app);
    } catch(err) {
      reject(err)
      logger.error(`Failed to start app: ${err}`)
    }
  })
}



export async function initDB() {
  return new Promise<ORMDatabase>(async (resolve, reject) => {
      try {
          if (db.initalized == true)
              return resolve(db)
          logger.info("Setting up database")
          const orm = await MikroORM.init({
              ...ORM_INIT_VALUES
          })
          db.initalized = true
          db.orm = orm
          db.em = orm.em
          db.userRepository = orm.em.getRepository(User)

          resolve(db)
          logger.info("Finished setting up database")
      } catch (error) {
          reject(error)
          logger.error(`Failed to initialize database: ${error}`)
      }
  })
}