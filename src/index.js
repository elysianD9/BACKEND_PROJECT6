import mongoose from "mongoose";
import { DB } from "./constants.js";

import dotenv from 'dotenv';
dotenv.config({ path : './.env'})


import dbConnection from "./db/db.js";
import app from "./app.js";
import express from "express";
import cors from 'cors';
import cookieParser  from 'cookie-parser';

app.use(cors({
    origin : process.env.ORIGIN,
    credentials : true
}));
app.use(express.json({
    limit : '16kb'
}));
app.use(express.urlencoded({
    extended : true,
    limit : '16kb'
}));
app.use(express.static('public'));
app.use(cookieParser());


dbConnection().then(
   () => {
     app.listen(process.env.PORT || 8000 , () => {
        console.log(`Listening to port : ${process.env.PORT}`);
    }),
    app.on('error' , (error) => {
        console.error("error : " , error);
        throw error;
    })
   }
).catch((error) => {
    console.error("connection failed...",error);
});



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