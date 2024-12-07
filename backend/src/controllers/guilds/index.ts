import { Request, Response } from "express";
import { getBotGuildsService, getMutualGuildsService, getUserGuildsService } from "../../services/guilds";
import { User } from "../../database/schemas/User";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
         console.log("made api call lole");
         const guilds = await getMutualGuildsService(user.id);
         res.send({guilds});
    } catch (err) {
        console.log(err);
        res.status(400).send('Error')
    }
}