import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose
    .connect(process.env.MONGODB_SRV!)
    .then (() => { console.log("connected to Database.");})
    .catch ((err) => { console.log(err); })

