"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mikro_orm_1 = require("mikro-orm");
const uuid_1 = require("uuid");
const config_1 = require("../config");
let User = class User {
    constructor(email, name, password) {
        this.id = (0, uuid_1.v4)();
        this.isEnabled = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.email = email.toLowerCase();
        this.name = name;
        this.password = password;
    }
    //Lifecycle methods
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                bcrypt_1.default.hash(this.password, config_1.APP_SALT_ROUNDS)
                    .then(hash => {
                    this.password = hash;
                    resolve(hash);
                }).catch(error => {
                    throw new Error("Failed to generate user password: " + error);
                });
            });
        });
    }
    //Misc methods
    comparePassword(plainPassword) {
        bcrypt_1.default.compare(plainPassword, this.password, function (error, result) {
            if (error)
                throw new Error("Failed to compare user password: " + error);
            else
                return result;
        });
        return false;
    }
};
__decorate([
    (0, mikro_orm_1.PrimaryKey)()
], User.prototype, "id", void 0);
__decorate([
    (0, mikro_orm_1.Property)({ nullable: false })
], User.prototype, "name", void 0);
__decorate([
    (0, mikro_orm_1.Property)({ nullable: false, unique: true })
], User.prototype, "email", void 0);
__decorate([
    (0, mikro_orm_1.Property)({ hidden: true, nullable: false })
], User.prototype, "password", void 0);
__decorate([
    (0, mikro_orm_1.Property)({ default: true })
], User.prototype, "isEnabled", void 0);
__decorate([
    (0, mikro_orm_1.Property)()
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mikro_orm_1.Property)({ onUpdate: () => new Date() })
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, mikro_orm_1.BeforeCreate)()
], User.prototype, "hashPassword", null);
User = __decorate([
    (0, mikro_orm_1.Entity)()
], User);
exports.User = User;
