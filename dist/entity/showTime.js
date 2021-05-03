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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Showtime = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Showtime = class Showtime {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", typeorm_1.ObjectID)
], Showtime.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Showtime.prototype, "theater_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Showtime.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Showtime.prototype, "movie_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Showtime.prototype, "show_time", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Showtime.prototype, "date", void 0);
Showtime = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Showtime);
exports.Showtime = Showtime;
//# sourceMappingURL=showTime.js.map