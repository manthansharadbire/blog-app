import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
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

const PORT = process.env.PORT || 5002;

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
    connectDB();
});