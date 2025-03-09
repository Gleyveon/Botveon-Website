import { Request, Response } from "express";
import { getUserService } from "../../services/user";
import { User } from "../../database/models/User";


export async function getUserController(req: Request, res: Response) {
    const user = req.user as User;
    
    try {
        const userData = await getUserService(user.id);
        res.send(userData);
    } catch (err) {
        console.log(err);
        res.status(400).send('Error')
    }
}