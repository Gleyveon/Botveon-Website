import axios from "axios";
import { DISCORD_API_URL } from "../../utils/constants";
import { UserData } from "../../utils/types";
import { User } from "../../database/models";

export async function getUserService(userID: string): Promise<{ data: UserData }> {
    const user = await User.findById(userID);
    if (!user) {
        throw new Error("No user found");
    }

    // Fetch user data from Discord API
    const response = await axios.get<UserData>(`${DISCORD_API_URL}/users/@me`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });

    return { data: response.data };
}
