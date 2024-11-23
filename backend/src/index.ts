import { createApp } from "./utils/createApp";
import { config } from "dotenv"; 
import './database/index';
config();

const PORT = process.env.PORT || 3001;

async function main() {

    console.log(`Running on ${process.env.ENVIROMENT} mode.`);
    try {
        const app = createApp();
        app.listen(PORT, () => console.log(`Running on port ${PORT}.`));
    } catch (err) {
        console.log(err);
    }
}

main();