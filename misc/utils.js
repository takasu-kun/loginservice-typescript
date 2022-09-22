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
exports.compareStringIgnoreCase = exports.getErrorObject = exports.checkIfBodyExists = void 0;
const Logger_1 = __importDefault(require("./Logger"));
const logger = (0, Logger_1.default)("utils.ts");
function checkIfBodyExists(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!request.body.data)
            return response.status(400).json((0, exports.getErrorObject)("400", "MissingBodyData", "Request's body missing"));
        next();
    });
}
exports.checkIfBodyExists = checkIfBodyExists;
const getErrorObject = (code, type, message) => {
    return { error: { code, type, message } };
};
exports.getErrorObject = getErrorObject;
const compareStringIgnoreCase = (string1, string2) => {
    return string1.toLowerCase() === string2.toLowerCase();
};
exports.compareStringIgnoreCase = compareStringIgnoreCase;
