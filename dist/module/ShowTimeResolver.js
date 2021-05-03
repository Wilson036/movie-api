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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowTimeResolver = void 0;
const showTime_1 = require("../entity/showTime");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let ShowTimeResolver = class ShowTimeResolver {
    queryTimeByMovieId(movie_id, date, theater_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getRepository(showTime_1.Showtime);
            const showTime = yield manager.find({
                where: {
                    movie_id,
                    date,
                    theater_id: { $in: theater_ids },
                },
            });
            return showTime;
        });
    }
    queryTimeById(movie_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getRepository(showTime_1.Showtime);
            const showTime = yield manager.find({
                where: {
                    movie_id,
                },
            });
            return showTime;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => [showTime_1.Showtime]),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('date')),
    __param(2, type_graphql_1.Arg('theater_ids', () => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], ShowTimeResolver.prototype, "queryTimeByMovieId", null);
__decorate([
    type_graphql_1.Query(() => [showTime_1.Showtime]),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShowTimeResolver.prototype, "queryTimeById", null);
ShowTimeResolver = __decorate([
    type_graphql_1.Resolver()
], ShowTimeResolver);
exports.ShowTimeResolver = ShowTimeResolver;
//# sourceMappingURL=ShowTimeResolver.js.map