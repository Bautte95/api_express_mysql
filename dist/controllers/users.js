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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const sequelize_1 = require("sequelize");
const getAllUsers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        if (!users)
            return resp.status(404).json({
                msg: 'No se encontraron usuarios'
            });
        resp.status(200).json({
            msg: 'consulta exitosa',
            users
        });
    }
    catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistema'
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return resp.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        ;
        resp.status(200).json({
            msg: `Usuario con el id ${id} encontrado`,
            user
        });
    }
    catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistema'
        });
    }
});
exports.getUser = getUser;
const postUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existsEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existsEmail)
            return resp.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            });
        const user = user_1.default.build(body);
        yield user.save();
        resp.status(200).json({
            msg: `Usuario creado correctamente`,
            user
        });
    }
    catch (error) {
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistema'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return resp.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        ;
        const existsEmail = yield user_1.default.findOne({
            where: {
                email: body.email,
                id: { [sequelize_1.Op.ne]: id }
            }
        });
        if (existsEmail)
            return resp.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            });
        yield user.update(body);
        resp.status(200).json({
            msg: `Usuario con el id ${id} actualizado correctamente`,
            user
        });
    }
    catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistemas'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findOne({
            where: {
                id: id,
                state: true
            }
        });
        if (!user)
            return resp.status(500).json({
                msg: `No se encontro un usuario con el id ${id}`
            });
        yield user.update({
            state: false
        });
        resp.status(200).json({
            msg: `Usuario con el id ${id} desactivado correctamente`
        });
    }
    catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistemas'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map