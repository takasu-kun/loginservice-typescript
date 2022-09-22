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
exports.createUser = void 0;
const Logger_1 = __importDefault(require("./../misc/Logger"));
const app_1 = require("./../app");
const logger = (0, Logger_1.default)("userService.ts");
// Database
// Helpers
/**
 *
 * @param {Object} payload
 * @param {*} body
 */
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = Object.assign({}, user);
                const newUser = app_1.db.userRepository.create(data);
                yield app_1.db.userRepository.persistAndFlush(newUser);
                resolve(newUser);
            }
            catch (error) {
                reject(error);
                logger.error(`Failed to create user: ${error}`);
            }
        }));
    });
}
exports.createUser = createUser;
