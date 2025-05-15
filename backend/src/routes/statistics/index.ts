import { Router, Request, Response } from "express";
import GuildData, { Guild } from "../../database/models/GuildData";
 import memberData, { Member } from "../../database/models/MemberData";

const router = Router();

router.get('/', async (req: Request, res: Response) => {

    try {
        const guildCount = await GuildData.countDocuments();
        const uniqueUserIDs = await memberData.distinct('userID');
        const userCount = uniqueUserIDs.length;

        res.send({ userCount, guildCount });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to fetch statistics" });
    }
});




export default router;