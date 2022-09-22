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
exports.registerUser = exports.loginUser = void 0;
const Logger_1 = __importDefault(require("./../misc/Logger"));
const utils_1 = require("./../misc/utils");
const userService_1 = require("../services/userService");
const logger = (0, Logger_1.default)("authenticationController.ts");
/**
 * Controller function for login in the user
 *
 * @param request
 * @param response
 */
function loginUser(request, response) {
    const { email, password } = request.body.data;
}
exports.loginUser = loginUser;
function registerUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.body.data.user;
        const userIsValid = validateUser(user);
        if (!userIsValid.isValid)
            return response.status(400).json((0, utils_1.getErrorObject)("400", "MissingData", userIsValid.message));
        (0, userService_1.createUser)(user)
            .then(result => {
            logger.info("User successfully created.");
            response.json({ data: result });
        }).catch((err) => {
            logger.error(`Failed to create user: ${err}`);
            response.status(400).json(err);
        });
    });
}
exports.registerUser = registerUser;
//Utils functions
const validateUser = (user) => {
    if (!user.email)
        return { isValid: false, message: "User is missing email" };
    if (!user.name)
        return { isValid: false, message: "User is missing name" };
    if (!user.password)
        return { isValid: false, message: "User is missing password" };
    return { isValid: true, message: "Valid user structure" };
};
