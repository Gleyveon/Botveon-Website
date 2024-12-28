import { Request, Response } from "express";
import { getMutualGuildsService } from "../../services/guilds";
import { getChannelsService, sortChannelsService } from "../../services/channels";
import { getRolesService, sortRolesService } from "../../services/roles";
import { User } from "../../database/models/User";
import { GuildData } from "../../database/models";


export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const guilds = await getMutualGuildsService(user.id);
        res.send(guilds);
    } catch (err) {
        console.log(err);
        res.status(400).send('Error')
    }
}

export async function getCommunitySettingsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id } = req.params;

    try {
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === id);
        if (!valid) { return res.sendStatus(403) };

        let { data: channels } = await getChannelsService(id);
        let { data: roles } = await getRolesService(id);

        channels = sortChannelsService(channels);
        roles = sortRolesService(roles)


        const guildSettings = await GuildData.findOne({ serverID: id });

        if (!guildSettings) {
            return res.status(404).send({ message: "Guild settings not found" });
        }

        res.send({
            channels: channels,
            roles: roles,
            threadChannels: guildSettings.threadChannels,
            upvoteChannels: guildSettings.upvoteChannels,
            bumpChannel: guildSettings.bumpChannel,
        });

    } catch (err) {
        console.log(err);
        res.status(400).send('Error')
    }
}

export async function getJoinSettingsController(req: Request, res: Response) {

}

export async function getEconomySettingsController(req: Request, res: Response) {

}

export async function getLevelSettingsController(req: Request, res: Response) {

}

export async function updateCommunitySettingsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id: guildId } = req.params;
    const { threadChannels, upvoteChannels, bumpChannel } = req.body;

    try {
        // Ensure the user has access to the guild
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) {
            return res.status(403).json({ error: "Forbidden: You don't have access to this guild." });
        }

        const existingSettings = await GuildData.findOne({ serverID: guildId });

        if (existingSettings) {
            existingSettings.threadChannels = threadChannels;
            existingSettings.upvoteChannels = upvoteChannels;
            existingSettings.bumpChannel = bumpChannel;
            await existingSettings.save();
        } else {
            await GuildData.create({
                guildId,
                threadChannels: threadChannels,
                upvoteChannels: upvoteChannels,
                bumpChannel: bumpChannel,
            });
        }

        return res.status(200).json({ message: "Community settings updated successfully." });
    } catch (err) {
        console.error("Error updating community settings:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}