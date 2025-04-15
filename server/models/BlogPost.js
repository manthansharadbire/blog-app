import { Schema, model } from "mongoose";

const blogPostSchema = new Schema ({
title:{
    type:String,
    required:true,
},
content:{
    type:String,
    required:true,
},
tags:{
    type:[String],
},
status:{
    type:String,
    enum:["Draft", "Published"],
    default:"Draft",
},
createdAt:{
    type:Date,
},
author:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
viewCount:{
    type:Number,
    default:0,
}, 
likes:{
    type:[Schema.Types.ObjectId],
    ref:"User",
    default:[],
}
},{
    timestamps:true,
})

const BlogPost = model("BlogPost",blogPostSchema );

export default BlogPost;