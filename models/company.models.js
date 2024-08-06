import mongoose from "mongoose";

const companySchema=new mongoose.model({
    name:{
        type:String
    },
    description:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    logo:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }

},{timestamps:true})


export default Company= mongoose.model("Company",companySchema)