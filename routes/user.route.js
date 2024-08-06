import express from "express"
import  {register,login,logout,update,delete21} from "../controller/user.controller.js"
import { isAuthentication } from "../middleware/isAuthenticated.js";


export const userRouter=express.Router();
userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/profile/update").post(isAuthentication,update);
userRouter.route("/profile/delete").post(isAuthentication,delete21);




