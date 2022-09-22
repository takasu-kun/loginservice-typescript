import winston, { createLogger, format, Logger } from 'winston'
import { APP_COMBINED_LOG_FILE, APP_ERROR_LOG_FILE, APP_INFO_LOG_FILE, APP_LOG_LEVEL } from '../config'

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

export default function getLogger(fileName: string, logLevel: string = APP_LOG_LEVEL): Logger {
    const instance = createLogger({
        level: logLevel,
        format: format.combine(
            format.label({ label: fileName }),
            format.timestamp(),
            format.splat(),
            format.json(),
            myFormat
        ),
        transports: [
            new winston.transports.File({ filename: APP_INFO_LOG_FILE, level: 'info' }),
            new winston.transports.File({ filename: APP_ERROR_LOG_FILE, level: 'error' }),
            new winston.transports.File({ filename: APP_COMBINED_LOG_FILE }),
            new winston.transports.Console()
        ],
    })

    return instance
}
