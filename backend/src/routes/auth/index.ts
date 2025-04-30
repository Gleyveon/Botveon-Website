import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { isAuthenticated } from "../../utils/middlewares/authenticationMiddleware";
import { getUserController } from "../../controllers/user";

const router = Router();
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});


const FRONTEND_URL = process.env.FRONTEND_URL as string;

router.get('/discord', (req, res, next) => {
    const redirectUri = req.query.redirect as string || `${FRONTEND_URL}/dashboard`;
    passport.authenticate('discord', {
        state: encodeURIComponent(redirectUri)
    })(req, res, next);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    const redirectUri = decodeURIComponent(req.query.state as string) || `${FRONTEND_URL}/dashboard`;
    if (!redirectUri.startsWith(FRONTEND_URL + "/")) {
        return res.status(400).send("Invalid redirect URL");
    }

    res.redirect(redirectUri);
});

router.get('/user', isAuthenticated, getUserController);

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to log out");
        }
        res.clearCookie("connect.sid");

        res.redirect(FRONTEND_URL);
    });

});



export default router;