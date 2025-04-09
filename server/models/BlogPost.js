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
author
})

const BlogPost = model("BlogPost",blogPostSchema );

export default BlogPost;