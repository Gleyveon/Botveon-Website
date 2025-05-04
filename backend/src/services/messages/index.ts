import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { Role } from "../../utils/types"
import NodeCache from 'node-cache';

const TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function sendEmbed(channelID: string, embed: any, button: any): Promise<any> {
  const actionRow = {
    type: 1, // Action row type
    components: [button], // Add the button to the components array
  };

  embed.title = embed.title?.substring(0, 256);
  embed.description = embed.description?.substring(0, 4096);
  if (embed.footer?.text) {
    embed.footer.text = embed.footer.text.substring(0, 2048);
  }

  try {
    const response = await axios.post(
      `${DISCORD_API_URL}/channels/${channelID}/messages`,
      {
        embeds: [
          embed
          // {
          //   title: "Hello from Express.js!",
          //   description: "This is an embed sent from the backend!",
          //   color: 0xcf0044,
          //   fields: [
          //     { name: "Field 1", value: "Some value", inline: true },
          //     { name: "Field 2", value: "Another value", inline: true },
          //   ],
          //   footer: {
          //     text: "Sent via Bot",
          //   },
          //   timestamp: new Date().toISOString(),
          // },
        ],
        components: [actionRow],
      },
      {
        headers: {
          Authorization: `Bot ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
    console.log("Embed sent:", response.data);
  } catch (error: any) {
    console.error("Failed to send embed:", error.response?.data || error.message);
    throw error;
  }
}