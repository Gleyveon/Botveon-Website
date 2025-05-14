import axios from "axios";
import { User } from '../../database/models'
import { DISCORD_API_URL } from "../../utils/constants";
import { Guild } from "../../utils/types";
import GuildData, { Guild as GuildModel } from "../../database/models/GuildData";
import NodeCache from 'node-cache';

const GuildsModelCache = new NodeCache({ stdTTL: 10 });
const GuildsCache = new NodeCache({ stdTTL: 10 });

const PendingGuildsModel: Record<string, Promise<{ data: GuildModel[] }> | undefined> = {};
const PendingGuilds: Record<string, Promise<{ data: Guild[] }> | undefined> = {};

export async function getBotGuildsService(): Promise<{ data: GuildModel[] }> {
    const cacheKey = 'botGuilds';

    if (GuildsModelCache.has(cacheKey)) {
        const cachedData = GuildsModelCache.get<GuildModel[]>(cacheKey);
        if (cachedData) {
            return { data: cachedData };
        }
    }

    if (PendingGuildsModel[cacheKey]) {
        return PendingGuildsModel[cacheKey];
    }

    const promise = (async (): Promise<{ data: GuildModel[] }> => {
        const response = await GuildData.find().lean();

        GuildsModelCache.set(cacheKey, response);
        return { data: response };
    })()
        .finally(() => {
            delete PendingGuildsModel[cacheKey];
        });

    PendingGuildsModel[cacheKey] = promise;
    return promise;
}

export async function getUserGuildsService(userID: string): Promise<{ data: Guild[] }> {
    const user = await User.findById(userID);
    if (!user) { throw new Error('No user found') }

    const cacheKey = `userGuilds_${userID}`;
    if (GuildsCache.has(cacheKey)) {
        const cachedData = GuildsCache.get<Guild[]>(cacheKey);
        if (cachedData) {
            return { data: cachedData };
        }
    }

    if (PendingGuilds[cacheKey] !== undefined) {
        return PendingGuilds[cacheKey]!;
    }

    const promise = (async (): Promise<{ data: Guild[] }> => {
        const response = await axios.get<Guild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        });

        GuildsCache.set(cacheKey, response.data);
        return { data: response.data };
    })()
        .finally(() => {
            delete PendingGuilds[cacheKey];
        });

    PendingGuilds[cacheKey] = promise;
    return promise;
}

export async function getMutualGuildsService(userID: string) {
    const { data: userGuilds } = await getUserGuildsService(userID);
    const { data: botGuilds } = await getBotGuildsService();

    const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuilds = adminUserGuilds.filter((guild) => botGuilds.some((botGuilds) => botGuilds.serverID === guild.id));

    return mutualGuilds;
}