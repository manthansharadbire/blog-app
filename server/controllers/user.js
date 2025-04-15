import User from "./../models/User.js";

const postSignup = async (req, res) => {
  const { name, email, password, city } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    city,
  });

  const savedUser = await newUser.save();
};

export { postSignup };
