import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { Channel } from "../../utils/types"
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 10 });
const pendingChannelRequests: Record<string, Promise<{ data: Channel[] }> | undefined> = {};

export async function getChannelsService(guildID: string) : Promise<{ data: Channel[] }> {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;

    const cacheKey = `channels_${guildID}`;
    if (cache.has(cacheKey)) {
        const cachedData = cache.get<Channel[]>(cacheKey);
        if (cachedData) {
            return { data: cachedData };
        }
    }

    if (pendingChannelRequests[cacheKey] !== undefined) {
        return pendingChannelRequests[cacheKey]!;
    }

    const promise = (async (): Promise<{ data: Channel[] }> => {
        const response = await axios.get<Channel[]>(`${DISCORD_API_URL}/guilds/${guildID}/channels`, {
            headers: { Authorization: `Bot ${TOKEN}` },
        });

        cache.set(cacheKey, response.data);
        return { data: response.data };
    })()
        .finally(() => {
            delete pendingChannelRequests[cacheKey];
        });

        pendingChannelRequests[cacheKey] = promise;

    return promise;
}

// sorts and filters all text and voice channels in order by the channel position
export function sortChannelsService(channels: Channel[]) {

    // Filter out category channels
    const categories = channels.filter((channel) => channel.type === 4);

    // Gives values to channels to sort on position using map
    const channelValues = channels.filter((channel) => channel.type !== 4).map((channel) => {
        let categoryPosition = 0;
        const channelType = channel.type;
        const channelPosition = channel.position;

        // Get category position
        if (channel.parent_id) {
            let channelParent = categories.find((category) => category.id === channel.parent_id)

            if (channelParent) {
                categoryPosition = channelParent.position;
            }
        }

        return { channel, categoryPosition, channelType, channelPosition }
    });

    const sortedChannels = channelValues.sort((a, b) => {
        // Compare category positions
        if (a.categoryPosition !== b.categoryPosition) {
            return a.categoryPosition - b.categoryPosition;
        }

        // If category positions are equal, prioritize text channels over voice channels
        if (a.channelType === 2 && b.channelType !== 2) {
            return 1;  // Text channels come first
        }
        if (b.channelType === 2 && a.channelType !== 2) {
            return -1; // Voice channels come last
        }

        // If both are of the same type, compare by channel position
        return a.channelPosition - b.channelPosition;
    });

    // Return the sorted channels (only the channels, not the extra properties)
    return sortedChannels.map(item => item.channel);
}