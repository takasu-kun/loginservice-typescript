"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.init = exports.application = exports.db = void 0;
const express_1 = __importDefault(require("express"));
const mikro_orm_1 = require("mikro-orm");
const config_1 = require("./config");
const User_1 = require("./entities/User");
const authenticationRouter_1 = __importDefault(require("./routes/authenticationRouter"));
const Logger_1 = __importDefault(require("./misc/Logger"));
exports.db = {};
const app = (0, express_1.default)();
const port = config_1.APP_PORT;
const logger = (0, Logger_1.default)("app.ts");
exports.application = {};
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server is running.');
// });
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield initDB();
                app.use((req, res, next) => mikro_orm_1.RequestContext.create(exports.db.em, next));
                app.use((req, res, next) => {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Methods", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                    next();
                });
                app.use(`${config_1.APP_BASE_URL}/auth`, authenticationRouter_1.default);
                resolve(app);
            }
            catch (err) {
                reject(err);
                logger.error(`Failed to start app: ${err}`);
            }
        }));
    });
}
exports.init = init;
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (exports.db.initalized == true)
                    return resolve(exports.db);
                logger.info("Setting up database");
                const orm = yield mikro_orm_1.MikroORM.init(Object.assign({}, config_1.ORM_INIT_VALUES));
                exports.db.initalized = true;
                exports.db.orm = orm;
                exports.db.em = orm.em;
                exports.db.userRepository = orm.em.getRepository(User_1.User);
                resolve(exports.db);
                logger.info("Finished setting up database");
            }
            catch (error) {
                reject(error);
                logger.error(`Failed to initialize database: ${error}`);
            }
        }));
    });
}
exports.initDB = initDB;
