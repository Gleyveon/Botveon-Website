import { Request, Response } from "express";
import { getMutualGuildsService } from "../../services/guilds";
import { getChannelsService, sortChannelsService } from "../../services/channels";
import { getRolesService, sortRolesService } from "../../services/roles";
import { initializeGuild } from "../../database/utility/initializeGuild"
import { User } from "../../database/models/User";
import isEqual from "lodash/isEqual";
import { sendEmbed } from "../../services/messages";


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
    const { id: guildId } = req.params;

    try {
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) { return res.sendStatus(403) };

        let { data: channels } = await getChannelsService(guildId);
        let { data: roles } = await getRolesService(guildId);

        channels = sortChannelsService(channels);
        roles = sortRolesService(roles)


        const guildSettings = await initializeGuild(guildId);

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

        const guildSettings = await initializeGuild(guildId);     

        guildSettings.threadChannels = threadChannels;
        guildSettings.upvoteChannels = upvoteChannels;
        guildSettings.bumpChannel = bumpChannel;

        await guildSettings.save();

        return res.status(200).json({ message: "Community settings updated successfully." });
    } catch (err) {
        console.error("Error updating community settings:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export async function getJoinSettingsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id: guildId } = req.params;

    try {
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) { return res.sendStatus(403) };

        let { data: channels } = await getChannelsService(guildId);
        let { data: roles } = await getRolesService(guildId);

        channels = sortChannelsService(channels);
        roles = sortRolesService(roles)


        const guildSettings = await initializeGuild(guildId);     

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

        const guildSettings = await initializeGuild(guildId); 
        
        if (!isEqual(guildSettings.registration, registration && registration.channelID && registration.roleID)) {

            console.log(registration);

            const embed = {
                title: registration.embed.title ,
                description: registration.embed.description,
                footer: {
                  text: registration.embed.footer?.text,
                },
                color: 0xcf0044,
              }

            try {
                sendEmbed(registration.channelID, embed);
            } catch (error) {
                
            }
        }

        guildSettings.joinRoles = joinRoles;
        guildSettings.stickyRoles = stickyRoles;
        guildSettings.registration = registration;
        guildSettings.welcomeChannel = welcomeChannel;
        guildSettings.goodbyeChannel = goodbyeChannel;
        guildSettings.persistentRoles = persistentRoles;

        await guildSettings.save();

        return res.status(200).json({ message: "Community settings updated successfully." });
    } catch (err) {
        console.error("Error updating community settings:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export async function getEconomySettingsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id: guildId } = req.params;

    try {
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) { return res.sendStatus(403) };

        let { data: channels } = await getChannelsService(guildId);
        let { data: roles } = await getRolesService(guildId);

        channels = sortChannelsService(channels);
        roles = sortRolesService(roles)

        const guildSettings = await initializeGuild(guildId);

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
    const user = req.user as User;
    const { id: guildId } = req.params;
    const { currency, shopItems } = req.body;

    try {
        // Ensure the user has access to the guild
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) {
            return res.status(403).json({ error: "Forbidden: You don't have access to this guild." });
        }

        const guildSettings = await initializeGuild(guildId);

        guildSettings.currency = currency;
        guildSettings.shopItems = shopItems;

        await guildSettings.save();

        return res.status(200).json({ message: "economy settings updated successfully." });
    } catch (err) {
        console.error("Error updating economy settings:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export async function getLevelSettingsController(req: Request, res: Response) {
    const user = req.user as User;
    const { id: guildId } = req.params;

    try {
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        if (!valid) { return res.sendStatus(403) };

        let { data: channels } = await getChannelsService(guildId);
        let { data: roles } = await getRolesService(guildId);

        channels = sortChannelsService(channels);
        roles = sortRolesService(roles)


        const guildSettings = await initializeGuild(guildId);

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

        const guildSettings = await initializeGuild(guildId);

        guildSettings.levelUpMessages = levelUpMessages;
        guildSettings.levelUpRoles = levelUpRoles;
        guildSettings.boostRoles = boostRoles;

        await guildSettings.save();

        return res.status(200).json({ message: "Level settings updated successfully." });
    } catch (err) {
        console.error("Error updating level settings:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
}