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
exports.LoginWithOauthResolver = void 0;
const users_1 = require("../../entity/users");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let LoginWithOauthResolver = class LoginWithOauthResolver {
    LoginWithOauth(email, id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getManager();
            let user = yield manager.findOne(users_1.Users, { email: email });
            if (!user) {
                user = new users_1.Users();
                user.username = email.split('@')[0];
                user.password = yield bcryptjs_1.default.hash(`${id}`, 12);
                user.email = email;
                user.createdAt = new Date(Date.now());
                try {
                    yield manager.save(user);
                }
                catch (err) {
                    console.error(err);
                }
            }
            const userId = user.id;
            req.session.userId = userId;
            return jsonwebtoken_1.default.sign({ id: userId }, `${process.env.JWT_SECRET}`);
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('id')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LoginWithOauthResolver.prototype, "LoginWithOauth", null);
LoginWithOauthResolver = __decorate([
    type_graphql_1.Resolver()
], LoginWithOauthResolver);
exports.LoginWithOauthResolver = LoginWithOauthResolver;
//# sourceMappingURL=LoginByOAuthResolver.js.map