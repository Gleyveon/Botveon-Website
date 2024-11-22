import { config } from "dotenv"; 
config();

import express, { Express } from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

async function main() {
    
    console.log(`Running on ${process.env.ENVIROMENT} mode.`);

    function createApp (): Express {
        const app = express();
        app.use(`/api`, routes);
        return app;
    }

    try {
        const app = createApp();
        app.listen(PORT, () => console.log(`Running on port ${PORT}.`));
    } catch (err) {
        console.log(err);
    }

}

main();