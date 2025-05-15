import mongoose, { Schema } from "mongoose";

export interface Member {
    userID: string;
    serverID: string;
    messages: number;
    level: number;
    xp: number;
    currency: number;
    status: any[],
    daily: {
        last: Date;
        count: number;
    },
    vote: {
        last: Date;
        count: number;
    },
    inventory: any[];
    upvotes: number;
    downvotes: number;
    bumps: number;
    infractions: any;
    alt: number;
    joinedAt: Date;
    retrievableLeftRoles: string[];
    retrievableBannedRoles: string[];
    retrievableBanishedRoles: string[];
}


const profileSchema = new Schema<Member>(
    {
        userID: { type: Schema.Types.String, require: true },
        serverID: { type: Schema.Types.String, require: true },
        messages: { type: Schema.Types.Number, default: 0 },
        level: { type: Schema.Types.Number, default: 1 },
        xp: { type: Schema.Types.Number, default: 0 },
        currency: { type: Schema.Types.Number, default: 0 },
        status: [Schema.Types.Mixed],
        daily: {
            last: { type: Date },
            count: { type: Schema.Types.Number, default: 0 }
        },
        vote: {
            last: { type: Date },
            count: { type: Schema.Types.Number, default: 0 }
        },
        inventory: [Schema.Types.Mixed],
        upvotes: { type: Schema.Types.Number, default: 0 },
        downvotes: { type: Schema.Types.Number, default: 0 },
        bumps: { type: Schema.Types.Number, default: 0 },
        infractions: { type: Object, default: { count: { minor: 0, medium: 0, big: 0, unacceptable: 0 }, data: [] } },
        alt: { type: Schema.Types.Number },
        joinedAt: { type: Date },
        retrievableLeftRoles: { type: [Schema.Types.String] },
        retrievableBannedRoles: { type: [Schema.Types.String] },
        retrievableBanishedRoles: { type: [Schema.Types.String] },
    },
    {
        versionKey: false,
    });

export default mongoose.model<Member>('profileModels', profileSchema);