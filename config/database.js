"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORM_INIT_VALUES = exports.DB_PG_SCRIPT_URL = exports.DB_URL = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_NAME = void 0;
const entities_1 = require("../entities");
_a = process.env, _b = _a.DB_NAME, exports.DB_NAME = _b === void 0 ? 'postgres' : _b, _c = _a.DB_PORT, exports.DB_PORT = _c === void 0 ? '5432' : _c, _d = _a.DB_USER, exports.DB_USER = _d === void 0 ? 'postgres' : _d, _e = _a.DB_PASSWORD, exports.DB_PASSWORD = _e === void 0 ? 'postgres' : _e, _f = _a.DB_HOST, exports.DB_HOST = _f === void 0 ? 'localhost' : _f, _g = _a.DB_URL, exports.DB_URL = _g === void 0 ? `postgresql://${exports.DB_HOST}:${exports.DB_PORT}` : _g, _h = _a.DB_PG_SCRIPT_URL, exports.DB_PG_SCRIPT_URL = _h === void 0 ? `postgresql://${exports.DB_USER}:${exports.DB_PASSWORD}@${exports.DB_HOST}:${exports.DB_PORT}/${exports.DB_NAME}` : _h;
exports.ORM_INIT_VALUES = {
    entities: [entities_1.User],
    entitiesDirsTs: ['./entities'],
    entitiesDirs: ['./build/entities'],
    dbName: exports.DB_NAME,
    type: 'postgresql',
    host: exports.DB_HOST,
    clientUrl: exports.DB_URL,
    user: exports.DB_USER,
    password: exports.DB_PASSWORD,
};
