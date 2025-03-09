import { APITextChannel, APIGuildVoiceChannel, APIGuildCategoryChannel, APIRole} from 'discord-api-types/v9';

export type Channel = APITextChannel | APIGuildVoiceChannel | APIGuildCategoryChannel;
export type Role = APIRole;

export type Guild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
}

export type UserData = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
}