import mongoose, { Schema } from "mongoose";

export interface Guild {
    serverID: string;
    currency: {
        icon: string;
        nameSingular: string;
        namePlural: string;
    };
    adminRoles: string[];
    boostRoles: {
        roleID: string;
        boost: number;
        stackable: boolean;
        equation: "add" | "multiply";
    }[];
    joinRoles: string[];
    stickyRoles: string[];
    levelUpRoles: {
        roleID: string;
        level: number;
    }[];
    shopItems: {
        itemID: string;
        name: string;
        description: string;
        category: "role" | "channel" | "emoji" | "custom";
        price: number;
        metadata: Record<string, any>;
    }[];
    modRoles: string[];
    bannedRole?: string;
    levelUpMessages: boolean;
    levelUpChannel: string;
    persistentRoles: boolean;
    threadChannels: string[];
    upvoteChannels: string[];
    welcomeChannel?: {
        channelID: string;
        message: string;
        embeds: {
            title?: string;
            description?: string;
            url?: string;
            color?: number;
            footer?: {
                text?: string;
                icon_url?: string;
            };
        }[];
        includeUserAvatar: boolean;
        sendImmediate: boolean;
    };
    goodbyeChannel?: {
        channelID: string;
        message: string;
        embeds: {
            title?: string;
            description?: string;
            url?: string;
            color?: number;
            footer?: {
                text?: string;
                icon_url?: string;
            };
        }[];
        includeUserAvatar: boolean;
        sendImmediate: boolean;
    };
    infractionChannel?: string;
    bumpChannel?: string;
    registration?: {
        channelID: string;
        messageID: string;
        roleID: string;
        message: string;
        embeds: {
            title?: string;
            description?: string;
            url?: string;
            color?: number;
            footer?: {
                text?: string;
                icon_url?: string;
            };
        }[];
    };
}

const GuildSchema = new Schema<Guild>(
    {
        serverID: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            minlength: 17,
            maxlength: 20,
            match: /^[0-9]+$/
        },
        currency: {
            icon: {
                type: Schema.Types.String,
                // default: "🪙",
                maxlength: 64
            },
            nameSingular: {
                type: Schema.Types.String,
                // default: "coin",
                maxlength: 32
            },
            namePlural: {
                type: Schema.Types.String,
                // default: "coins",
                maxlength: 32
            }
        },
        adminRoles: {
            type: [Schema.Types.String],
            default: [],
            validate: {
                validator: function (values: string[]) {
                    return values.every(value => /^[0-9]{17,20}$/.test(value));
                },
                message: "Each role ID must be a numeric string between 17 and 20 characters."
            }
        },
        boostRoles: {
            type: [
                {
                    roleID: {
                        type: Schema.Types.String,
                        required: true,
                        validate: {
                            validator: function (value: string) {
                                return /^[0-9]{17,20}$/.test(value);
                            },
                            message: "Role ID must be a numeric string between 17 and 20 characters."
                        }
                    },
                    boost: {
                        type: Schema.Types.Number,
                        required: true,
                        min: [0, "boost must be at least 0."],
                        max: [9999, "Boost must be under 9999"],
                        validate: {
                            validator: function (value: number) {
                                return typeof value === "number" && !isNaN(value);
                            },
                            message: "Boost must be a valid number."
                        }
                    },
                    stackable: {
                        type: Boolean,
                        required: true
                    },
                    equation: {
                        type: String,
                        enum: ["add", "multiply"],
                        required: true
                    }
                }
            ],
            default: [],
        },
        joinRoles: {
            type: [Schema.Types.String],
            default: [],
            validate: {
                validator: function (values: string[]) {
                    return values.every(value => /^[0-9]{17,20}$/.test(value));
                },
                message: "Each role ID must be a numeric string between 17 and 20 characters."
            }
        },
        stickyRoles: {
            type: [Schema.Types.String],
            default: [],
            validate: {
                validator: function (values: string[]) {
                    return values.every(value => /^[0-9]{17,20}$/.test(value));
                },
                message: "Each role ID must be a numeric string between 17 and 20 characters."
            }
        },
        levelUpRoles: {
            type: [
                {
                    roleID: {
                        type: Schema.Types.String,
                        required: true,
                        validate: {
                            validator: function (value: string) {
                                return /^[0-9]{17,20}$/.test(value);
                            },
                            message: "Role ID must be a numeric string between 17 and 20 characters."
                        }
                    },
                    level: {
                        type: Schema.Types.Number,
                        required: true,
                        min: [1, "Level must be at least 1."],
                        validate: {
                            validator: function (value: number) {
                                return Number.isInteger(value);
                            },
                            message: "Level must be an integer."
                        }
                    }
                }
            ],
            default: []
        },
        shopItems: {
            type: [
                {
                    itemID: {
                        type: Schema.Types.String,
                        required: true,
                        validate: {
                            validator: function (value: string) {
                                return /^[0-9]{17,20}$/.test(value);
                            },
                            message: "Item ID must be a numeric string between 17 and 20 characters."
                        }
                    },
                    name: {
                        type: Schema.Types.String,
                        required: true,
                        maxlength: 64,
                        trim: true
                    },
                    description: {
                        type: Schema.Types.String,
                        maxlength: 256,
                        trim: true
                    },
                    category: {
                        type: Schema.Types.String,
                        required: true,
                        enum: ["role", "channel", "emoji", "custom"],
                        default: "role"
                    },
                    price: {
                        type: Schema.Types.Number,
                        required: true,
                        min: [0, "Price must be non-negative."]
                    },
                    metadata: {
                        type: Schema.Types.Mixed,
                        default: {} // Extra data specific to the category (e.g., channel type, badge rarity) EXAMPLES= role: { color: "red", hoist: true } channel: { type: "text", nsfw: false } badges: { rarity: "legendary", animated: true }
                    }
                }
            ],
            default: []
        },
        modRoles: {
            type: [Schema.Types.String],
            default: [],
            validate: {
                validator: function (values: string[]) {
                    return values.every(value => /^[0-9]{17,20}$/.test(value));
                },
                message: "Each role ID must be a numeric string between 17 and 20 characters."
            }
        },
        bannedRole: {
            type: Schema.Types.String,
            validate: {
                validator: function (value: string) {
                    return /^[0-9]{17,20}$/.test(value);
                },
                message: "Banned role ID must be a numeric string between 17 and 20 characters."
            }
        },
        levelUpMessages: {
            type: Schema.Types.Boolean,
            default: true
        },
        levelUpChannel: {
            type: Schema.Types.String,
            validate: {
                validator: function (value: string) {
                    return /^[0-9]{17,20}$/.test(value);
                },
                message: "LevelUpChannel must be a numeric string between 17 and 20 characters."
            } 
        },
        persistentRoles: {
            type: Schema.Types.Boolean,
            default: false
        },
        threadChannels: {
            type: [Schema.Types.String],
            default: [],
            validate: {
                validator: function (values: string[]) {
                    return values.every(value => /^[0-9]{17,20}$/.test(value)); // Validate channel IDs as 17-20 numeric strings
                },
                message: "Each channel ID must be a numeric string between 17 and 20 characters."
            }
        },
        upvoteChannels: {
            type: [Schema.Types.String],
            default: [],
            validate: {
                validator: function (values: string[]) {
                    return values.every(value => /^[0-9]{17,20}$/.test(value)); // Validate channel IDs as 17-20 numeric strings
                },
                message: "Each channel ID must be a numeric string between 17 and 20 characters."
            }
        },
        welcomeChannel: {
            type: {
                channelID: {
                    type: Schema.Types.String,
                    match: /^[0-9]{17,20}$/, // Validate channel ID to be a string of 17-20 digits
                },
                message: {
                    type: Schema.Types.String,
                    maxlength: 2000,
                },
                embed: {
                    type: {
                        title: {
                            type: Schema.Types.String,
                            maxlength: 256,
                        },
                        description: {
                            type: Schema.Types.String,
                            maxlength: 4096,
                        },
                        url: {
                            type: Schema.Types.String,
                            match: /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?$/, // URL validation
                        },
                        color: {
                            type: Schema.Types.Number, // Hex color for embed
                            min: 0,
                            max: 16777215, // Hex range (0xFFFFFF)
                        },
                        footer: {
                            text: {
                                type: Schema.Types.String,
                                maxlength: 2048,
                            },
                            icon_url: {
                                type: Schema.Types.String,
                                match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/, // Valid URL for image
                            },
                        },
                    },
                },
                includeUserAvatar: {
                    type: Schema.Types.Boolean,
                    default: true,
                },
                sendImmediate: {
                    type: Schema.Types.Boolean,
                    default: false,
                },
            },
        },
        goodbyeChannel: {
            type: {
                channelID: {
                    type: Schema.Types.String,
                    match: /^[0-9]{17,20}$/, // Validate channel ID to be a string of 17-20 digits
                },
                message: {
                    type: Schema.Types.String,
                    maxlength: 2000,
                },
                embed: {
                    type: {
                        title: {
                            type: Schema.Types.String,
                            maxlength: 256,
                        },
                        description: {
                            type: Schema.Types.String,
                            maxlength: 4096,
                        },
                        url: {
                            type: Schema.Types.String,
                            match: /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?$/, // URL validation
                        },
                        color: {
                            type: Schema.Types.Number, // Hex color for embed
                            min: 0,
                            max: 16777215, // Hex range (0xFFFFFF)
                        },
                        footer: {
                            text: {
                                type: Schema.Types.String,
                                maxlength: 2048,
                            },
                            icon_url: {
                                type: Schema.Types.String,
                                match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/, // Valid URL for image
                            },
                        },
                    },
                },
                includeUserAvatar: {
                    type: Schema.Types.Boolean,
                    default: true,
                },
                sendImmediate: {
                    type: Schema.Types.Boolean,
                    default: true,
                },
            },
        },
        infractionChannel: {
            type: Schema.Types.String,
            match: /^[0-9]{17,20}$/,
        },
        bumpChannel: {
            type: Schema.Types.String,
            match: /^[0-9]{17,20}$/,
        },
        registration: {
            type: {
                channelID: {
                    type: Schema.Types.String,
                    match: /^[0-9]{17,20}$/,
                },
                messageID: {
                    type: Schema.Types.String,
                    match: /^[0-9]{17,20}$/,
                },
                roleID: {
                    type: Schema.Types.String,
                    match: /^[0-9]{17,20}$/,
                },
                message: {
                    type: Schema.Types.String,
                    maxlength: 2000,
                },
                embed: {
                    title: {
                        type: Schema.Types.String,
                        maxlength: 256,
                    },
                    description: {
                        type: Schema.Types.String,
                        maxlength: 4096,
                    },
                    url: {
                        type: Schema.Types.String,
                        match: /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?$/, // URL validation
                    },
                    color: {
                        type: Schema.Types.Number, // Hex color for embed
                        min: 0,
                        max: 16777215, // Hex range (0xFFFFFF)
                    },
                    footer: {
                        text: {
                            type: Schema.Types.String,
                            maxlength: 2048,
                        },
                        icon_url: {
                            type: Schema.Types.String,
                            match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/, // Valid URL for image
                        },
                    },
                },
            },
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model<Guild>("servermodels", GuildSchema);