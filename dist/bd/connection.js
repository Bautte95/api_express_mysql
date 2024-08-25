"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node', 'root', 'Pa$$w0rd', {
    host: 'localhost',
    dialect: 'mysql',
    //loggin: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map