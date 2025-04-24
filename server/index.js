import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import {postSignup, postLogin} from './controllers/user.js'

const app = express();

//middlewares
app.use(express.json());
app.use(cors());


const connectDB = async()=> {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn){
        console.log("MongoDB connected Successfully!");
    }
    else{
        console.log("MongoDB connection failed!")
    }
}

app.get("/health", (req,res)=>{
    return res.status(200).json({message:"Server is Healthy!"})
})
//login
app.post("/login", postLogin)
//signup
app.post("/signup", postSignup)

//to fetch blogs
app.get("/blogs", (req,res)=>{

 const {authorization} = req.headers;
    try{
    const jwtToken = authorization.split(" ")[1];
    console.log(`JWT Token = ${jwtToken}`)
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET)
    console.log("Decoded Token",  decodedToken)
    }catch(e){
        return res.status(401).json({
            message:`Unauthorized: ${e.message}`,
            data:null,
            success:false
        });
    }
    const blogs = [{
    title: "Blog1",
    content : "This is the content of Blog1"
    },
{
    title: "Blog2",
    content:"This is the content of Blog2"
}];
return res.status(200).json({
    message: "Blogs fetched successfully",
    data: blogs,
    success: true
})
});



const PORT = process.env.PORT || 5002;

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
    connectDB();
});