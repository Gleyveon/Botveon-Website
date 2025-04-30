import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { Role } from "../../utils/types"
import NodeCache from 'node-cache';

const TOKEN = process.env.DISCORD_BOT_TOKEN;

export async function sendEmbed(channelID: string, embed: any): Promise<void> {

    try {
        const response = await axios.post(
          `${DISCORD_API_URL}/channels/${channelID}/messages`,
          {
            embeds: [
              embed
              // {
              //   title: "Hello from Express.js!",
              //   description: "This is an embed sent from the backend!",
              //   color: 0x5865f2, // Discord blurple
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
          },
          {
            headers: {
              Authorization: `Bot ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        console.log("Embed sent:", response.data);
      } catch (error: any) {
        console.error("Failed to send embed:", error.response?.data || error.message);
        throw error;
      }
}