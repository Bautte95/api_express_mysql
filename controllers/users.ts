import { Request, Response } from "express";
import User from "../models/user";


export const getUsers = async (req:Request, resp:Response) => {

    const users = await User.findAll();

    resp.json({
        users
    })

}

export const getUser = async (req:Request, resp:Response) => {

    const { id } = req.params;
    const user = await User.findByPk(id);

    if(!user){
        resp.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        })
    } else {

        resp.json(user);
    };
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

        const usuario = User.build(body);
        await usuario.save();

        resp.json(usuario);

    } catch (error) {
        resp.status(500).json({
            msg: 'Erro en el servidor, comunicarse con el administrador del sistema'
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
                msg: `No existe un usuario con el id  ${id}`
            })
        };

        const existsEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(existsEmail)
            return resp.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })

        await user.update(body);

        resp.json(user);

    } catch (error) {
        console.log('error :>> ', error);
        resp.status(500).json({
            msg: 'Erro en el servidor, comunicarse con el administrador del sistemas'
        })
    }
}

export const deleteUser = (req: Request,resp:Response) => {
    const { id } = req.params;

    resp.json({
        msg: 'deleteUsuario',
        id
    })
}
