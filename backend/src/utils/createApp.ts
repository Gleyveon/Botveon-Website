import express, { Express } from "express";
import routes from "../routes";
import cors from "cors";
import session from "express-session"

export function createApp (): Express {
    const app = express();

    // Enable Parsing Middleware for requests
    app.use(express.json());
    app.use(express.urlencoded());

    // Enable cors
    app.use(cors({ origin: ["http://localhost:3000"], credentials: true, }));

    // Sessions
    app.use(session({
        secret: 'kml;zxhjfvoszjid0-vjiojksalkdmcklldsk;jnfv;l',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
    }));

    app.use(`/api`, routes);
    return app;
}