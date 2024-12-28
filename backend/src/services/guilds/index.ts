import axios from "axios";
import { User } from '../../database/models'
import { DISCORD_API_URL } from "../../utils/constants";
import { Guild } from "../../utils/types";
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 10 });
const pendingRequests: Record<string, Promise<{ data: Guild[] }> | undefined> = {};

export async function getBotGuildsService(): Promise<{ data: Guild[] }> {
    const cacheKey = 'botGuilds';
    const TOKEN = process.env.DISCORD_BOT_TOKEN;

    if (cache.has(cacheKey)) {
        const cachedData = cache.get<Guild[]>(cacheKey);
        if (cachedData) {
            return { data: cachedData };
        }
    }

    if (pendingRequests[cacheKey]) {
        return pendingRequests[cacheKey];
    }

    const promise = (async (): Promise<{ data: Guild[] }> => {
        const response = await axios.get<Guild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
            headers: { Authorization: `Bot ${TOKEN}` },
        });

        cache.set(cacheKey, response.data);
        return { data: response.data };
    })()
        .finally(() => {
            delete pendingRequests[cacheKey];
        });

    pendingRequests[cacheKey] = promise;
    return promise;
}

export async function getUserGuildsService(userID: string): Promise<{ data: Guild[] }> {
    const user = await User.findById(userID);
    if (!user) { throw new Error('No user found') }

    const cacheKey = `userGuilds_${userID}`;
    if (cache.has(cacheKey)) {
        const cachedData = cache.get<Guild[]>(cacheKey);
        if (cachedData) {
            return { data: cachedData };
        }
    }

    if (pendingRequests[cacheKey] !== undefined) {
        return pendingRequests[cacheKey]!;
    }

    const promise = (async (): Promise<{ data: Guild[] }> => {
        const response = await axios.get<Guild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        });

        cache.set(cacheKey, response.data);
        return { data: response.data };
    })()
        .finally(() => {
            delete pendingRequests[cacheKey];
        });

    pendingRequests[cacheKey] = promise;
    return promise;
}

export async function getMutualGuildsService(userID: string) {
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(userID);

    const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuilds = adminUserGuilds.filter((guild) => botGuilds.some((botGuilds) => botGuilds.id === guild.id));

    return mutualGuilds;
}