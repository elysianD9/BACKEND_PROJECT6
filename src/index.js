import mongoose from "mongoose";
import { DB } from "./constants.js";

import dotenv from 'dotenv';
dotenv.config({ path : './.env'})

import express from 'express';
import dbConnection from "./db/db.js";
const app = express();

dbConnection();

app.listen(process.env.PORT , () => {
    console.log(`CONNECTED TO PORT : ${process.env.PORT}`);
})

// //effee 
// (async () => {
//     try {
//         console.log(process.env.MONGODB_URI);
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB}`);
//         app.on('error' , (error) => {
//             console.log('Err : ' , error);
//             throw error
//         })

//         app.listen(process.env.PORT , () => {
//             console.log(`App is listening to port : ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error('NOT CONNECTING TO DB : ',error.message)
//     }
// })()