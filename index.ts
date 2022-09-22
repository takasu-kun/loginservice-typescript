import * as application from './app'
import { APP_PORT, NODE_ENV } from './config'
import getLogger from './misc/Logger'

const logger = getLogger("index.ts")
application.init().then(app => {
    app.listen(APP_PORT, () => {
        logger.info(`Backend app started and listening on port ${APP_PORT}, env: ${NODE_ENV}`)
    })
}).catch(error => {
    logger.error(error)
})
