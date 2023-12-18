import { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";
import userMessage from "../models/userMessage";
import createSecretToken from "../utils/secretToken";

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({status:false, message: "all fields are mandatory!!" });
    }
    const existingUser = await userMessage.findOne({ email });
    if (!existingUser) {
     return res.send({status:false, message: "email or password incorrect" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
     return res.send({status:false, message: "invalid credentials" });
    }
    if (existingUser) {
      const token = createSecretToken(existingUser._id);
      const user = {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        profilePicture: existingUser.profilePicture,
      };
      const { password: hashedPassword2, ...rest } = user;

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({status:true, rest});
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { email, password, firstName, lastName, photo } = req.body;
  try {
    const existingUser = await userMessage.findOne({ email });
    if (existingUser) {
      return res.status(404).send({status:false, message: "user already exists" });
    }
    const name = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userMessage.create({
      name:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8),
      email: email,
      password: hashedPassword,
      profilePicture: req.body.photo,
    });
    await user.save();
    const { password: hashedPassword2, ...rest } = user._doc;
    const token = createSecretToken(user._id);
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: expiryDate,
    });
    res.status(201).json(rest);
    next();
  } catch (error) {
    console.log(error);
  }
};

export const google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userMessage.findOne({ email: req.body.email });

    if (user) {
      const token = createSecretToken(user._id);
     
      const existingUser = {
        _id: user._id,
        name: user.name,
        email: req.body.email,
        password: user.password,
        profilePicture: req.body.photo,
      };
      const { password: hashedPassword, ...rest } = existingUser;

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,

          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 12);

      const newUser = await userMessage.create({
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = createSecretToken(newUser._id);
  
      const { password: hashedPassword2, ...rest } = newUser._doc;
    
      const expiryDate = new Date(Date.now() + 6000); // 1 hour

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export const signOut = (req: Request, res: Response) => {
  res.clearCookie("access_token").status(200).json("signout succesfull");
};
