import { config } from "dotenv";
import express, { Express } from "express";
import session from "express-session"
import passport from "passport";
import routes from "../routes";
import cors from "cors";
import store = require("connect-mongo");
import rateLimit from "express-rate-limit";


config();
require('../strategies/discord');

export function createApp (): Express {
    const app = express();

    // Rate Limiting: Limit to 100 requests per IP per 15 minutes
    const limiter = rateLimit({
        windowMs: 1000 * 60, // 1 minutes
        max: 100, // Limit each IP to 100 requests
        standardHeaders: true, // Send rate limit info in response headers
        legacyHeaders: false, // Disable X-RateLimit-* headers
        message: "Too many requests from this IP, please try again later.",
    });

    // Apply the rate limiter to all API routes
    app.use("/api", limiter);

    // Enable Parsing Middleware for requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Enable cors
    app.use(cors({ origin: ["http://localhost:5173"], credentials: true, }));

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