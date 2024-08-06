import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config({})
const connectDB=async()=>{

    
try{
//    console.log(process.env.MONGO_URI) 
await  mongoose.connect(process.env.MONGO_URI)
console.log("mongodb connect successfuly")
}
catch(err)
{
    console.log("Database is not connect "+err)
}

}
export default connectDB