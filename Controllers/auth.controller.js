import User from "../Models/user.model.js";
import "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username.trim();
    password = password.trim();

    let exist = await User.findOne({ username: username });

    if (exist) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    let hash = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );
    req.body.password = hash;

    let data = new User(req.body);
    await data.save();
    return res.status(200).json({ message: "User Registered Succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username.trim();
    password = password.trim();

    let exist = await User.findOne({ username: username });

    if (!exist) {
      return res.status(400).json({ message: "User Doesn't Exist" });
    }

    let data = await bcrypt.compare(password, exist?.password);
    if (!data) {
      return res.status(400).json({ message: "Invalid Passoword" });
    }

    let token = jwt.sign({ user_id: exist?._id }, process.env.JWT_SECERET, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      maxAge: 3600000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({ message: "Logged In Succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token" , { httpOnly: true, secure: true, sameSite: "None" });
    return res.status(200).json({ message: "Logged Out Succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error: error });
  }
};

export { signup, login, logout };
