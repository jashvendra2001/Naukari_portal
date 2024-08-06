import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
        enum:["student","recruiter"],
        required:true
     },
     profile:{
        bio:{
            type:String,
        
        },
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"company"
        },
        profilephoto:{
            type:String,
            default:""
        }
     }
},{timestamp:true});

export const User=mongoose.model("User",userSchema)

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   fullname: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   phonenumber: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     required: true,
//   },
// });

// export const User = mongoose.model("User", userSchema);
