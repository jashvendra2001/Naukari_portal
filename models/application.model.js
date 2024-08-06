import { application } from "express";
import mongoose from "mongoose";

const ApplicationSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true
    },
    application:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:[pending,accepted,rejecting],
        default:"pending"
    }
},{timestamps:true})

export default Application=mongoose.model("Application",ApplicationSchema)