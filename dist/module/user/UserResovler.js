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
exports.UserResolver = void 0;
const users_1 = require("../../entity/users");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerInput_1 = require("./register/registerInput");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserResolver = class UserResolver {
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getManager();
            return yield manager.find(users_1.Users);
        });
    }
    registerUser({ username, password, email }, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new users_1.Users();
            const manager = typeorm_1.getManager();
            user.username = username;
            user.password = yield bcryptjs_1.default.hash(password, 12);
            user.email = email;
            user.createdAt = new Date(Date.now());
            try {
                yield manager.save(user);
                const id = user.id;
                req.session.userId = id;
                return jsonwebtoken_1.default.sign({ id: id }, `${process.env.JWT_SECRET}`);
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [users_1.Users]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('data')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerInput_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResovler.js.map