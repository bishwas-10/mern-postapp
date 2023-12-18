import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Document, model, Schema } from "mongoose";

export interface AuthProps {
    _id:string;
    name?:string;
    email:string;
    password:string;
    profilePicture:string;
    confirmPassword?:string;
    _doc: any;
}

const userSchema  =new mongoose.Schema<AuthProps>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
  },
},
{ timestamps: true }
  
)



const userMessage = mongoose.model("usermessage", userSchema);

export default userMessage;
