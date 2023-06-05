import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({
        users
    })
}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            msg: `There is no a user with id ${id}`
        })
    }

    res.json(user)
}
export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const exitstsEmail = await User.findOne({
            where: {
                email: body.email
            }
        })

        if (exitstsEmail) {
            return res.status(400).json({
                msg: 'There is registered a user with this email ' + body.email
            });
        }

        const user = await User.create(body);
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact Administrator',
        })
    }
}

export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'There is no a user with id ' + id
            })
        }

        await user.update(body);

        return res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact Administrator',
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);
    
    if (!user) {
        return res.status(404).json({
            msg: 'There is no a user with id ' + id
        })
    }

    await user.update({ status: false });
    // await user.destroy();
    res.json(user);
}
