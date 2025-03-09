import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "../utils/api";

interface User {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
}

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userData = await fetchUser();
                if (userData.data && userData.data.id) {
                    setUser(userData.data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setUser(null);
            }
        };

        getUser();
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);