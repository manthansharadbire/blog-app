const postBlogs = async (req, res) => {
  const { title, content, tags } = req.body;

  return res.status(201).json({
    message: "Blog post created successfully",
    data: {
      title,
      content,
      tags,
    },
    success: true,
  });
};

export { postBlogs };
