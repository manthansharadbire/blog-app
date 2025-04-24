import User from "./../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const postSignup = async (req, res) => {
  const { name, email, password, city } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      data: null,
      success: false,
    });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      city,
    });

    const savedUser = await newUser.save();
    savedUser.password = undefined;

    const jwtToken = jwt.sign(
      {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24
      }
    );

    return res.status(201).json({
      message: "SignUp successful",
      jwtToken,
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
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

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Invalid Email or Password",
        data: null,
        success: false,
      });
    }

    user.password = undefined;

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24
      }
    );

    return res.status(200).json({
      message: "Login successful",
      jwtToken,
      data: user,
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Server error",
      data: null,
      success: false,
    });
  }
};

export { postSignup, postLogin };
