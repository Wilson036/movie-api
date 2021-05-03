"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObjectId = void 0;
const mongodb_1 = require("mongodb");
const toObjectId = (value) => {
    return typeof value === 'string' ? new mongodb_1.ObjectID(value) : value;
};
exports.toObjectId = toObjectId;
//# sourceMappingURL=toObjectID.js.map