import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;

    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in register: " + error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      if (!email || !password || !role) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
  
      // Debugging: Check if user.Password exists
      if (!user.password) {
        console.log("User password not found in database"+user.password);
        return res.status(500).json({
          message: "Internal server error",
          success: false,
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
  
      if (role !== user.role) {
        return res.status(400).json({
          message: "Incorrect email or password",
          success: false,
        });
      }
  
      const tokenData = {
        userId: user._id,
      };
  
      const token = jwt.sign(tokenData, process.env.SECRATE_KEY, { expiresIn: "1d" });
  
      return res.status(200)
        .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
        .json({
          message: `Welcome back ${user.fullname}`,
          success: true,
        });
    } catch (error) {
      console.log("Error in login: " + error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  export const logout=(req,res)=>{
try{
    return res.status(200).cookie("token","",{maxAge:"0"}).json({
        message:"logout successfully",
        success:true
    })


}
catch(error)
{
  console.log("error in logout"+error)
}




   
  }


  export const update = async (req, res) => {
    try {
      const { fullname, email, phonenumber, bio, skill } = req.body;
  
      // Check for missing fields
      if (!fullname || !email || !phonenumber || !bio || !skill) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
  
      const user_id = req.id;

  
      // Convert skill string to an array
      let skillArray;
      if (skill) {
        skillArray = skill.split(",");
      }
  
      // Find user by ID
      let user = await User.findById(user_id);
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      // Update user details
      user.fullname = fullname;
      user.email = email;
      user.phonenumber = phonenumber;
      user.profile.bio = bio;
      user.profile.skills = skillArray;
  
      // Save updated user
      await user.save();
  
      return res.status(200).json({
        message: "Profile updated successfully",
        success: true,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };


 
export const delete21 = async (req, res) => {
  try {
      const userId = req.id; // Assuming req.id is set by your authentication middleware

      // Find the user by ID and delete them
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
          return res.status(404).json({
              message: 'User not found',
              success: false,
          });
      }

      return res.status(200).json({
          message: 'User deleted successfully',
          success: true,
      });
  } catch (error) {
      console.error('Error deleting user:', error.message, error.stack);
      return res.status(500).json({
          message: 'Internal server error',
          success: false,
      });
  }
};
  
  