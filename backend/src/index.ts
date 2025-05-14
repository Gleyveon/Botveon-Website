import { createApp } from "./utils/createApp";
import dotenv from 'dotenv';
import path from 'path';
import './database/index';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

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