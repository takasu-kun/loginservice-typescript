"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const config_1 = require("../config");
const myFormat = winston_1.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
function getLogger(fileName, logLevel = config_1.APP_LOG_LEVEL) {
    const instance = (0, winston_1.createLogger)({
        level: logLevel,
        format: winston_1.format.combine(winston_1.format.label({ label: fileName }), winston_1.format.timestamp(), winston_1.format.splat(), winston_1.format.json(), myFormat),
        transports: [
            new winston_1.default.transports.File({ filename: config_1.APP_INFO_LOG_FILE, level: 'info' }),
            new winston_1.default.transports.File({ filename: config_1.APP_ERROR_LOG_FILE, level: 'error' }),
            new winston_1.default.transports.File({ filename: config_1.APP_COMBINED_LOG_FILE }),
            new winston_1.default.transports.Console()
        ],
    });
    return instance;
}
exports.default = getLogger;
