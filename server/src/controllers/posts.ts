import { Request, Response, NextFunction } from "express";
import PostMessage from "../models/postMessage";
import mongoose from "mongoose";
import { stringify } from "querystring";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  next();
};

export const createPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const post = req.body;
 
  try {
    const newPost = await PostMessage.create({...post, creator: req.body.userId });
    
    res.status(201).json({ message: "posted", newPost });
  } catch (err) {
    // res.status(409).json({ message: err.message });
    console.log(err)
  }
  next();
};
export const updatePosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id  = req.params.id;

  const { title, creator, location, description, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "no data with given id" });

  const updatedPost = {
    title,
    creator,
    location,
    description,
    selectedFile,
    _id: id,
  };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);

  next();
};
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
console.log(id);
  try {
    const newPost = await PostMessage.findByIdAndDelete(id);
   
    res.send({ status:true, newPost });
  } catch (err) {
    // res.status(409).json({ message: err.message });
    console.log(err)
  }
  next();
};

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

if(!req.body.userId){
  return res.send({status:false,message:"you are not authenticated"})
}
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send({status:false, message: "no data with given id" });

  const post =await PostMessage.findById(id);

  const index = post.likeCount.findIndex((id)=> id===String(req.body.userId))

  if(index==-1){
    post.likeCount.push(req.body.userId);
  }else{
    post.likeCount = post.likeCount.filter((id)=> id!==String(req.body.userId))
  }

  await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.send({status:true, post});

  next();
};