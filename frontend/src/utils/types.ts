export type Guild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export interface Role {
    id: string;
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