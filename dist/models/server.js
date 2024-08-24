"use strict";
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
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../bd/connection"));
const errorHandlerMiddleware_1 = require("../middlewares/errorHandlerMiddleware");
class Server {
    constructor() {
        this.apiPath = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.app.use(errorHandlerMiddleware_1.errorHandler);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(`Error presentado: ${error}`);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        // LECTURA DEL BODY
        this.app.use(express_1.default.json());
        //CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPath.users, users_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corrriendo en el puerto !!! ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map