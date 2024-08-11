// require('dotenv').config({path:'./env'});//code ki consistency ko kharb krta h
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from"express"

import dotenv from "dotenv" 
import connectDB from "./db/index.js";
import {app} from "./app.js";

//database always in other continent
// 1. approach

// ;(async()=>{
//     try{
// await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
// app.on("error",(error)=>{
//     console.log("ERROR",error);
//     throw error
// })

// app.listen(process.env.PORT,()=>{
//     console.log(`App is Listenining on port ${process.env.PORT}`);
// })
//     } catch(error){
//         console.log('ERROR',error)
//     }
// })()

// approch2
// import {app} from './app.js '
dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port:${process.env.PORT}`);
    })
})
.catch((err)=>{
console.log("Mongo db connection failed!!!",err);
})