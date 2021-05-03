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
exports.MoviesResolver = void 0;
const movies_1 = require("../entity/movies");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let MoviesResolver = class MoviesResolver {
    queryAllMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getManager();
            return yield manager.find(movies_1.Movies);
        });
    }
    queryMoviesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getManager();
            const movie = yield manager.findOne(movies_1.Movies, { movie_id: id });
            if (!movie) {
                throw new Error('movie not found');
            }
            return movie;
        });
    }
    queryMoviesByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = typeorm_1.getRepository(movies_1.Movies);
            const movies = yield manager.find({
                where: {
                    release_date: { $gt: new Date(date) },
                },
            });
            if (!movies) {
                throw new Error('movie not found');
            }
            return movies;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [movies_1.Movies]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "queryAllMovies", null);
__decorate([
    type_graphql_1.Query(() => movies_1.Movies),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "queryMoviesById", null);
__decorate([
    type_graphql_1.Query(() => [movies_1.Movies]),
    __param(0, type_graphql_1.Arg('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "queryMoviesByDate", null);
MoviesResolver = __decorate([
    type_graphql_1.Resolver()
], MoviesResolver);
exports.MoviesResolver = MoviesResolver;
//# sourceMappingURL=MovieResolver.js.map