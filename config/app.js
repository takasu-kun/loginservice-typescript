"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_COMBINED_LOG_FILE = exports.APP_ERROR_LOG_FILE = exports.APP_DEBUG_LOG_FILE = exports.APP_INFO_LOG_FILE = exports.APP_LOG_LEVEL = exports.APP_LOG_DIR = exports.APP_WHITELIST_ORIGIN = exports.APP_BASE_URL = exports.APP_API_VERSION = exports.APP_SALT_ROUNDS = exports.APP_SECRET = exports.APP_HOSTNAME = exports.APP_PORT = exports.NODE_ENV = void 0;
_a = process.env
//Logger
, _b = _a.NODE_ENV, exports.NODE_ENV = _b === void 0 ? 'development' : _b, _c = _a.APP_PORT, exports.APP_PORT = _c === void 0 ? 8050 : _c, _d = _a.APP_HOSTNAME, exports.APP_HOSTNAME = _d === void 0 ? 'localhost' : _d, _e = _a.APP_SECRET, exports.APP_SECRET = _e === void 0 ? "ADD-NEW-SECRET" : _e, _f = _a.APP_SALT_ROUNDS, exports.APP_SALT_ROUNDS = _f === void 0 ? 10 : _f, _g = _a.APP_API_VERSION, exports.APP_API_VERSION = _g === void 0 ? "v1" : _g, _h = _a.APP_BASE_URL, exports.APP_BASE_URL = _h === void 0 ? `/api/${exports.APP_API_VERSION}` : _h, _j = _a.APP_WHITELIST_ORIGIN, exports.APP_WHITELIST_ORIGIN = _j === void 0 ? "*" : _j;
//Logger
exports.APP_LOG_DIR = "logs/";
exports.APP_LOG_LEVEL = 'debug';
exports.APP_INFO_LOG_FILE = exports.APP_LOG_DIR + 'info.log';
exports.APP_DEBUG_LOG_FILE = exports.APP_LOG_DIR + 'debug.log';
exports.APP_ERROR_LOG_FILE = exports.APP_LOG_DIR + 'error.log';
exports.APP_COMBINED_LOG_FILE = exports.APP_LOG_DIR + 'combined.log';
