import mongoose, { Schema } from "mongoose";

export interface Guild {
    serverID: string;
    currency: string;
    currencyIcon: string;
    adminRoles: string[];
    boostRoles: string[];
    joinRoles: string[];
    stickyRoles: string[];
    levelUpRoles: string[];
    shopRoles: string[];
    modRoles: string[];
    bannedRole?: string;
    levelUpMessages: boolean;
    persistentRoles: boolean;
    threadChannels: string[];
    upvoteChannels: string[];
    welcomeChannel?: Record<string, any>;
    goodbyeChannel?: Record<string, any>;
    infractionChannel?: string;
    bumpChannel?: string;
    registration?: Record<string, any>;
}

const GuildSchema = new Schema<Guild>(
    {
        serverID: { type: Schema.Types.String, required: true, unique: true },
        currency: { type: Schema.Types.String, default: "coins" },
        currencyIcon: { type: Schema.Types.String, default: "🪙" },
        adminRoles: { type: [Schema.Types.String], default: [] },
        boostRoles: { type: [Schema.Types.String], default: [] },
        joinRoles: { type: [Schema.Types.String], default: [] },
        stickyRoles: { type: [Schema.Types.String], default: [] },
        levelUpRoles: { type: [Schema.Types.String], default: [] },
        shopRoles: { type: [Schema.Types.String], default: [] },
        modRoles: { type: [Schema.Types.String], default: [] },
        bannedRole: { type: Schema.Types.String },
        levelUpMessages: { type: Schema.Types.Boolean, default: true },
        persistentRoles: { type: Schema.Types.Boolean, default: false },
        threadChannels: { type: [Schema.Types.String], default: [] },
        upvoteChannels: { type: [Schema.Types.String], default: [] },
        welcomeChannel: { type: Schema.Types.Mixed },
        goodbyeChannel: { type: Schema.Types.Mixed },
        infractionChannel: { type: Schema.Types.String },
        bumpChannel: { type: Schema.Types.String },
        registration: { type: Schema.Types.Mixed },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<Guild>("servermodels", GuildSchema);