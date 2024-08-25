import { Request, response, Response } from "express";
import User from "../models/user";
import { Op } from "sequelize";


export const getAllUsers = async (req:Request, resp:Response) => {

    try {
        const users = await User.findAll();

        if(!users)
            return resp.status(404).json({
                msg: 'No se encontraron usuarios'
            })

        resp.status(200).json({
            msg: 'consulta exitosa',
            users
        });

    } catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistema'
        })
    }

}

export const getUser = async (req:Request, resp:Response) => {

    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if(!user){
            return resp.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        };

        resp.status(200).json({
            msg: `Usuario con el id ${id} encontrado`,
            user
        })

    } catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistema'
        })
    }
}

export const postUser = async (req: Request, resp:Response) => {
    const { body } = req;

    try {

        const existsEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(existsEmail)
            return resp.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })

        const user = User.build(body);

        await user.save();

        resp.status(200).json({
            msg: `Usuario creado correctamente`,
            user
        })

    } catch (error) {
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistema'
        })
    }
}


export const putUser = async (req: Request, resp:Response) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk(id);

        if(!user){
            return resp.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        };

        const existsEmail = await User.findOne({
            where: {
                email: body.email,
                id: {[Op.ne] : id}
            }
        });

        if(existsEmail)
            return resp.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })

        await user.update(body);

        resp.status(200).json({
            msg: `Usuario con el id ${id} actualizado correctamente`,
            user
        })

    } catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistemas'
        })
    }
}

export const deleteUser = async (req: Request,resp:Response) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({
            where: {
                id: id,
                state: true
            }
        });

        if(!user)
            return resp.status(500).json({
                msg: `No se encontro un usuario con el id ${id}`
            })

        await user.update({
            state: false
        })

        resp.status(200).json({
            msg: `Usuario con el id ${id} desactivado correctamente`
        })

    } catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Error en el servidor, comunicarse con el administrador del sistemas'
        })
    }
}
