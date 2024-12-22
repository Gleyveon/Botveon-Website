import axios from "axios";
import { User } from '../../database/schemas'
import { DISCORD_API_URL } from "../../utils/constants";
import { authenticate } from "passport";
import { Guild } from "../../utils/types";

export function getBotGuildsService() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<Guild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}`}
    });
}

export async function getUserGuildsService(id: string) {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('No user found')
    }
    return axios.get<Guild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}`}
    });
}

export async function getMutualGuildsService(id: string) {
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(id);

    const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuilds = adminUserGuilds.filter((guild) => botGuilds.some((botGuilds) => botGuilds.id === guild.id));

    return mutualGuilds;
}

export function getGuildService(id: string) {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get(`${DISCORD_API_URL}/guilds/${id}`, {
        headers: { Authorization: `Bot ${TOKEN}`}
    });
}