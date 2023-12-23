import {Request, Response, NextFunction } from "express";
import userMessage from "../models/userMessage";
import bcrypt from "bcrypt";

export const updateUser = async(req:Request, res:Response)=>{

    if (req.body._id !== req.params.id) {
        return res.status(401).send({message:"you can only update your account"});
      }
      try {
        if (req.body.password) {
          req.body.password =await bcrypt.hash(req.body.password, 10);
        }
    
        const updatedUser = await userMessage.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              profilePicture: req.body.profilePicture,
            },
          },
          { new: true }
        );
      
        const { password, ...rest } = updatedUser._doc;
       
        res.status(200).json(rest);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}

export const deleteUser = async (req:Request, res:Response) => {

    if (req.body.userId !== req.params.id) {
      return  res.send({status:false, message: "you can only delete your account" });
    }
    try {
      await userMessage.findByIdAndDelete(req.params.id);
     
      res.send({status:true, message:'User has been deleted...'});
    } catch (error) {
        res.status(404).json({status:false, message: error.message });
    }
  
  }