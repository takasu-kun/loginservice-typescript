export const {
    NODE_ENV = 'development',
    APP_PORT = 8050,
    APP_HOSTNAME = 'localhost',
    APP_SECRET = "1234567890",
    APP_SALT_ROUNDS = 10,
    APP_API_VERSION = "v1",
    APP_BASE_URL = `/api/${APP_API_VERSION}`,
    APP_WHITELIST_ORIGIN = "*"
} = process.env


//Logger
export const APP_LOG_DIR = "logs/"

export const APP_LOG_LEVEL = 'debug'

export const APP_INFO_LOG_FILE = APP_LOG_DIR + 'info.log'

export const APP_DEBUG_LOG_FILE = APP_LOG_DIR + 'debug.log'

export const APP_ERROR_LOG_FILE = APP_LOG_DIR + 'error.log'

export const APP_COMBINED_LOG_FILE = APP_LOG_DIR + 'combined.log'
