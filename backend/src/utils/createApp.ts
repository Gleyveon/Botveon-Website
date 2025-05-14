import dotenv from 'dotenv';
import path from 'path';
import express, { Express } from "express";
import session from "express-session"
import passport from "passport";
import routes from "../routes";
import cors from "cors";
import store = require("connect-mongo");
import rateLimit from "express-rate-limit";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

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
    if (process.env.NODE_ENV !== 'production') {
        app.use(cors({
            origin: "http://localhost:5173",  // Replace with your frontend's URL
            credentials: true,               // Allow credentials if you're sending cookies
        }));
    }

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

    if (process.env.NODE_ENV === 'production') {
        // Serve static files from the 'frontend/dist' directory
        app.use(express.static(path.join(__dirname, '../../../frontend/dist')))
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, '../../../frontend/dist', 'index.html'))
        })
      }

    return app;
}