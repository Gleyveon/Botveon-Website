import GuildData, { Guild } from "../models/GuildData"; // Adjust the path as needed
import { Document } from "mongoose";

/**
 * Retrieves a guild from the database or creates it if it doesn't exist.
 * @param guildId - The ID of the guild to retrieve or create.
 * @returns The guild document (Mongoose instance).
 */
export async function initializeGuild(guildId: string): Promise<Document & Guild> {
  try {
    let guild = await GuildData.findOne({ serverID: guildId });

    if (!guild) {
      guild = new GuildData({ serverID: guildId });
      await guild.save();
    }

    return guild;
  } catch (error) {
    console.error("Error initializing guild:", error);
    throw new Error("Failed to initialize guild.");
  }
}