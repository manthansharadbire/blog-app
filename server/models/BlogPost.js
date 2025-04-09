import { Schema, model } from "mongoose";

const blogPostSchema = new Schema ({

})

const BlogPost = model("BlogPost",blogPostSchema );

export default BlogPost;