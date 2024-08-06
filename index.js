import mongoose from "mongoose";
import dotenv from "dotenv"
import express from "express"
import connectDB from "./utilies/db.js";
import { userRouter} from "./routes/user.route.js";
import cookieParser from "cookie-parser";
// console.log(dotenv.config({}))
const app=express()

// app.use(cookieParser());
app.use(cookieParser())
app.use(express.json());



app.get("/",(req,res)=>{
    return res.status(200).json({
   message:"hi it is run successfully",
   success:"true"
    })
})
 
const port=3000;
app.use("/api/v1/user",userRouter)



"http://localhost:3000/api/v1/user/register"

"http://localhost:3000/api/v1/user/login"
app.listen(port,()=>{
    connectDB()
    console.log("server is running "+port)
})




