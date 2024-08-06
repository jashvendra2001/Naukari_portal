import mongoose, { Schema } from "mongoose";
const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirment:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true

    },
    position:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.type.objectId,
        ref:"Company",
        required:true
    },
    createdBy:{
        type:mongoose.type.objectId,
        ref:"User",
        required:true

    },
    Application:{
        type:mongoose.type.objectId,
        ref:"Application",
        required:true

    }
},{timestamps:true})

export default Job=mongoose.model("Job",jobSchema)