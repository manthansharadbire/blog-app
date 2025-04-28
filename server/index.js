import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { postBlogs,getBlogs } from "./controllers/blog.js";

import { postSignup, postLogin } from "./controllers/user.js";

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  if (conn) {
    console.log("MongoDB connected Successfully!");
  } else {
    console.log("MongoDB connection failed!");
  }
};

const verifyJWT = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const jwtToken = authorization.split(" ")[1];
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("Decoded Token", decodedToken);

    req.user_id = decodedToken;
    next();
  } catch (e) {
    return res.status(401).json({
      message: `Unauthorized: ${e.message}`,
      data: null,
      success: false,
    });
  }
};

//health
app.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server is Healthy!" });
});

//login
app.post("/login", postLogin);

//signup
app.post("/signup", postSignup);

//to fetch blogs
app.get("/blogs", getBlogs);

//to post a blog
app.post("/blogs", verifyJWT, postBlogs);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
  connectDB();
});
