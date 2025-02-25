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

export async function getJoinSettingsController(req: Request, res: Response) {
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

        console.log(guildSettings);

        res.send({
            channels: channels,
            roles: roles,
            joinRoles: guildSettings.joinRoles,
            stickyRoles: guildSettings.stickyRoles,
            registration: guildSettings.registration,
            welcomeChannel: guildSettings.welcomeChannel,
            goodbyeChannel: guildSettings.goodbyeChannel,
            persistentRoles: guildSettings.persistentRoles
        });

    } catch (err) {
        console.log(err);
        res.status(400).send('Error')
    }
}

export async function updateJoinSettingsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id: guildId } = req.params;
    const { joinRoles, stickyRoles, registration, welcomeChannel, goodbyeChannel, persistentRoles } = req.body;

    try {
        // Ensure the user has access to the guild
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) {
            return res.status(403).json({ error: "Forbidden: You don't have access to this guild." });
        }

        const existingSettings = await GuildData.findOne({ serverID: guildId });

        console.log(existingSettings?.registration);
        console.log(registration);        

        if (existingSettings) {
            existingSettings.joinRoles = joinRoles;
            existingSettings.stickyRoles = stickyRoles;
            existingSettings.registration = registration;
            existingSettings.welcomeChannel = welcomeChannel;
            existingSettings.goodbyeChannel = goodbyeChannel;
            existingSettings.persistentRoles = persistentRoles;

            await existingSettings.save();
        } else {
            await GuildData.create({
                guildId,
                joinRoles: joinRoles,
                stickyRoles: stickyRoles,
                registration: registration,
                welcomeChannel: welcomeChannel,
                goodbyeChannel: goodbyeChannel,
                persistentRoles: persistentRoles,
            });
        }

        return res.status(200).json({ message: "Community settings updated successfully." });
    } catch (err) {
        console.error("Error updating community settings:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export async function getEconomySettingsController(req: Request, res: Response) {
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
            currency: guildSettings.currency,
            shopItems: guildSettings.shopItems,
        });

    } catch (err) {
        console.log(err);
        res.status(400).send('Error')
    }
}

export async function updateEconomySettingsController(req: Request, res: Response) {

}

export async function getLevelSettingsController(req: Request, res: Response) {
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
            levelUpMessages: guildSettings.levelUpMessages,
            levelUpRoles: guildSettings.levelUpRoles,
            boostRoles: guildSettings.boostRoles,
        });

    } catch (err) {
        console.log(err);
        res.status(400).send('Error')
    }
}

export async function updateLevelSettingsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id: guildId } = req.params;
    const { levelUpMessages, levelUpRoles, boostRoles } = req.body;

    try {
        // Ensure the user has access to the guild
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) {
            return res.status(403).json({ error: "Forbidden: You don't have access to this guild." });
        }

        const existingSettings = await GuildData.findOne({ serverID: guildId });

        if (existingSettings) {
            existingSettings.levelUpMessages = levelUpMessages;
            existingSettings.levelUpRoles = levelUpRoles;
            existingSettings.boostRoles = boostRoles;

            await existingSettings.save();
        } else {
            await GuildData.create({
                guildId,
                levelUpMessages: levelUpMessages,
                levelUpRoles: levelUpRoles,
                boostRoles: boostRoles,
            });
        }

        return res.status(200).json({ message: "Level settings updated successfully." });
    } catch (err) {
        console.error("Error updating level settings:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}