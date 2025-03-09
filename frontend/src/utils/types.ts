export type Guild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export interface Channel {
    channelID: string;
    name: string;
}

export interface Role {
    roleID: string;
    name: string;
    color: string;
}

export interface LevelRole {
    roleID: string;
    level: number;
}

export interface BoostRole {
    roleID: string;
    boost: number;
    stackable: boolean;
    equation: "add" | "multiply" | undefined;
}

export interface ShopItem {
    itemID: string | undefined;
    name: string | undefined;
    description: string | undefined;
    category: "role" | "channel" | "emoji" | "custom" | undefined;
    price: Number;
    metadata: any | undefined;
}