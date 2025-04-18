import User from "./../models/User.js";
import bcrypt from 'bcrypt';

const postSignup = async (req, res) => {
  const { name, email, password, city } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
      data: null,
      success: false,
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
      data: null,
      success: false,
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
      data: null,
      success: false,
    });
  }

   const encryptedPassword = await bcrypt.hash(password,10)

  const newUser = new User({
    name,
    email,
    password:encryptedPassword,
    city,
  });

  try {
    const savedUser = await newUser.save();

    savedUser.password = undefined; //To remove password from the response

    return res.status(201).json({
      message: "SignUp successfull",
      data: savedUser,
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      data: null,
      success: false,
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email & Password are required",
      data: null,
      success: false,
    });
  }

  const user = await User.findOne({ email })
   
  if(!user){
    return res.status(400).json({
      message:"Invalid Email or Passsword",
      data:null,
      success:false
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid Email or Password",
      data:null,
      success:false
    })
  }

  if (user) {
    return res.status(200).json({
      message: "Login successful",
      data: user,
      success: true,
    });
  }
};

export { postSignup, postLogin };
