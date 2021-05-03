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
exports.MeResolver = void 0;
const toObjectID_1 = require("../../utils/toObjectID");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const users_1 = require("../../entity/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let MeResolver = class MeResolver {
    me(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = `${ctx.req.headers.authorization}`;
            const { id } = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
            const _id = toObjectID_1.toObjectId(id);
            const users = yield typeorm_1.getMongoRepository(users_1.Users).findOne({ where: { _id } });
            return users;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => users_1.Users, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeResolver.prototype, "me", null);
MeResolver = __decorate([
    type_graphql_1.Resolver()
], MeResolver);
exports.MeResolver = MeResolver;
//# sourceMappingURL=MeResolver.js.map