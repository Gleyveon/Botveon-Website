import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL as string;

router.get('/discord', (req, res, next) => {
    const redirectUri = req.query.redirect as string || `${FRONTEND_URL}/dashboard`;
    passport.authenticate('discord', {
        state: encodeURIComponent(redirectUri)
    })(req, res, next);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    const redirectUri = decodeURIComponent(req.query.state as string) || `${FRONTEND_URL}/dashboard`;
    if (!redirectUri.startsWith(FRONTEND_URL)) {
        return res.status(400).send('Invalid redirect URL');
    }
    res.redirect(redirectUri);
});

// router.get('/status', (req, res) => {
//     return req.user ? res.send(req.user) : res.status(401).send({ msg: 'Unauthorized' });
// });

export default router;