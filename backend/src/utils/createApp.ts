import { config } from "dotenv";
import express, { Express } from "express";
import session from "express-session"
import passport from "passport";
import routes from "../routes";
import cors from "cors";
import store = require("connect-mongo");

config();
require('../strategies/discord');

export function createApp (): Express {
    const app = express();

    // Enable Parsing Middleware for requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Enable cors
    app.use(cors({ origin: ["http://localhost:3000"], credentials: true, }));

    //Enable sessions
    app.use(session({
        secret: 'asdkjhaksjdhkasjhdoiu',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
        store: store.create({mongoUrl: process.env.MONGODB_SRV})
    }));

    // Enable passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);

    return app;
}