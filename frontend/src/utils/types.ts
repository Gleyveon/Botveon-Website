export type Guild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export interface Channel {
    id: string;
    name: string;
    type: number;
}

export interface Role {
    id: string;
    name: string;
    color: string;
}

export interface LevelRole {
    roleID: string;
    level?: number | undefined;
}

export interface BoostRole {
    roleID: string;
    boost?: number;
    stackable?: boolean;
    equation?: "add" | "multiply";
}

export interface ShopItem {
    itemID: string;
    title?: string | undefined;
    description?: string | undefined;
    category: "role" | "channel" | "emoji" | "custom" | undefined;
    price?: number;
    metadata?: any | undefined;
}