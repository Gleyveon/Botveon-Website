import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose
    .connect(process.env.MONGODB_SRV!)
    .then (() => { console.log("connected to Database.");})
    .catch ((err) => { console.log(err); })

