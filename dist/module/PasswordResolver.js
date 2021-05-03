"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.PasswordResolver = void 0;
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const users_1 = require("../entity/users");
const redis_1 = require("../redis");
const sendEmail_1 = require("../utils/sendEmail");
const typeorm_1 = require("typeorm");
const redisPrefix_1 = require("../constant/redisPrefix");
const ChangePasswordInput_1 = require("./password/ChangePasswordInput");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const toObjectID_1 = require("../utils/toObjectID");
let PasswordResolver = class PasswordResolver {
    sendComfiredEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getManager();
            const user = yield manager.findOne(users_1.Users, { where: { email } });
            if (!user) {
                return true;
            }
            const token = uuid_1.v4();
            yield redis_1.redis.set(redisPrefix_1.forgotPasswordPrefix + token, `${user.id}`, 'ex', 60 * 60 * 24);
            sendEmail_1.sendEMail(email, `http://localhost:3000/change-password/${token}`);
            return true;
        });
    }
    changePassword({ token, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getManager();
            const id = yield redis_1.redis.get(redisPrefix_1.forgotPasswordPrefix + token);
            if (!id) {
                return false;
            }
            const _id = toObjectID_1.toObjectId(id);
            const user = yield manager.findOne(users_1.Users, { where: { _id } });
            if (!user) {
                return false;
            }
            yield redis_1.redis.del(redisPrefix_1.forgotPasswordPrefix + token);
            user.password = yield bcryptjs_1.default.hash(password, 12);
            manager.save(user);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordResolver.prototype, "sendComfiredEmail", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean, { nullable: true }),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangePasswordInput_1.ChangePasswordInput]),
    __metadata("design:returntype", Promise)
], PasswordResolver.prototype, "changePassword", null);
PasswordResolver = __decorate([
    type_graphql_1.Resolver()
], PasswordResolver);
exports.PasswordResolver = PasswordResolver;
//# sourceMappingURL=PasswordResolver.js.map