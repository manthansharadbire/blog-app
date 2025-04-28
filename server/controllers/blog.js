import BlogPost from "../models/BlogPost.js";

//to post or create a blog
const postBlogs = async (req, res) => {
  const { title, content, tags } = req.body;

  const author = req.user_id;

  const blogPost = new BlogPost({
    title,
    content,
    tags,
    author
  });

  try {
    const savedBlogPost = await blogPost.save();

    return res.status(201).json({
      message: "Blog post created successfully",
      data: savedBlogPost,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error creating BlogPost: ${error.message}`,
      data: null,
      success: false,
    });
  }
};

//to fetch or retrieve blogs
const getBlogs = async(req,res)=>{
 const blog = await BlogPost.find({status:"published"});

 if(blog.length === 0 ){
  return res.status(404).json({
    message:"Oops! Blog cannot be found",
    data:null,
    success:false
  })
 }

 return res.status(200).json({
  message:"Blogs fetched successfully",
  data:blog,
  success:true
 })
}

export { postBlogs,getBlogs };
