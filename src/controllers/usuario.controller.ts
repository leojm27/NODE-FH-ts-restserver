import { Request, Response } from 'express'
import Usuario from '../models/usuario';

/**
 * Devuelve todos los Usuarios
 * @param req 
 * @param res 
 */
export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json({ data: usuarios })
}

/**
 * Devuelve Usuario por ID
 * @param req params
 * @param res 
 */
export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        res.status(404).json({
            msg: `No existe un Usuario con el id ${id}`
        })
    }

    res.json(usuario)
}

/**
 * Crear Usuario
 * @param req 
 * @param res 
 */
export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el mail ' + body.email
            })

        }
        const usuario = new Usuario();
        Object.assign(usuario, body);
        await usuario.save()

        res.json(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el Administrador.'
        })
    }
}

/**
 * Actualizar Usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        // añadir validacion de email unico

        await usuario.update(body)
        res.json(usuario);
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: 'Hable con el Administrador.'
        })
    }
}

/**
 * Eliminar usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        // eliminacion fisica
        // await usuario.destroy();

        await usuario.update({ estado: false })
        res.json({
            msg: `Usuario con id ${id} se elimino correctamente.`
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: 'Hable con el Administrador.'
        })
    }
}