import express, { Request, Response, Application } from "express";
require("dotenv").config();
import cors from "cors";
import mongoose from "mongoose";
import postRouter from "./routes/posts";
import userRouter from "./routes/users";
import authRouter from "./routes/auth"
import cookieParser from "cookie-parser";

const app: Application = express();
const MONGO_URL: string = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

app.set("trust proxy", 1); // trust first proxy
app.use(
  cors({
    origin: 'https://mern-postapp.vercel.app',
    methods: 'GET,POST, PUT, DELETE, PATCH',
    
    credentials: true,
  })
);


mongoose
  .connect(MONGO_URL, {})
  .then(() => console.log("connected to mongo db"))
  .catch((err) => console.log(err));


app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/users", authRouter);

app.get('/',(req,res)=>{
  res.send("welcome")
})



app.listen(PORT, (): void => {
  console.log(`server is listening to port ${PORT}`);
});
