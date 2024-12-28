import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { Role } from "../../utils/types"
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 10 });
const pendingRoleRequests: Record<string, Promise<{ data: Role[] }> | undefined> = {};

export async function getRolesService(guildID: string) : Promise<{ data: Role[] }> {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;

    const cacheKey = `roles_${guildID}`;
    if (cache.has(cacheKey)) {
        const cachedData = cache.get<Role[]>(cacheKey);
        if (cachedData) {
            return { data: cachedData };
        }
    }

    if (pendingRoleRequests[cacheKey] !== undefined) {
        return pendingRoleRequests[cacheKey]!;
    }

    const promise = (async (): Promise<{ data: Role[] }> => {
        const response = await axios.get<Role[]>(`${DISCORD_API_URL}/guilds/${guildID}/roles`, {
            headers: { Authorization: `Bot ${TOKEN}` },
        });

        cache.set(cacheKey, response.data);
        return { data: response.data };
    })()
        .finally(() => {
            delete pendingRoleRequests[cacheKey];
        });

        pendingRoleRequests[cacheKey] = promise;

    return promise;
}

export function sortRolesService(roles: Role[]): Role[] {
    return roles.sort((a, b) => b.position - a.position);
}