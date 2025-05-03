import passport from 'passport';
import { encrypt, decrypt } from "../utils/crypto";
import { Profile, Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import { config } from "dotenv";
import { User } from '../database/models';
config();

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err);
        return done(err, null);
    }
});


passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ['identify', 'email', 'guilds'],
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {

            const { id: discordId } = profile;
            try {
                const encryptedAccessToken = encrypt(accessToken);
                const encryptedRefreshToken = encrypt(refreshToken);

                const existingUser = await User.findOneAndUpdate(
                    { discordId },
                    { 
                        accessToken: encryptedAccessToken.encrypted,
                        refreshToken: encryptedRefreshToken.encrypted,
                        accessTokenIV: encryptedAccessToken.iv,
                        refreshTokenIV: encryptedRefreshToken.iv,
                    },
                    { new: true }
                );

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    discordId,
                    accessToken: encryptedAccessToken.encrypted,
                    refreshToken: encryptedRefreshToken.encrypted,
                    accessTokenIV: encryptedAccessToken.iv,
                    refreshTokenIV: encryptedRefreshToken.iv,
                });

                const savedUser = await newUser.save();
                return done(null, savedUser);

            } catch (err) {
                console.log(err);
                return done(err as any, undefined);
            }

        }
    )
);