import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User already exits🤦");
    }

    if (!username) {
      throw new Error("Please provide username🤦");
    }

    if (!email) {
      throw new Error("Please provide email🤦");
    }

    if (!password) {
      throw new Error("Please provide password🤦");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      throw new Error("Something went wrong🤦");
    }

    const payload = {
      username,
      email,
      password: hashedPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully..🎉🎉",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      throw new Error("Please provide email🤦");
    }

    if (!password) {
      throw new Error("Please provide password🤦");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found🤦");
    }

    //Check Password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        id: user?._id,
        username: user?.username,
        email: user?.email,
      };

      //create JWT
      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      //Token Options
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", token, tokenOption).status(201).json({
        data: user,
        message: "LoggedIn successfully...🎉",
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check password🤦");
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const userData = await userModel.findById(req.user.id);
let details = {
    _id:userData?._id,
    username:userData?.username,
    email:userData?.email
}

    res.status(200).json({
      data: details,
      message: "User details...🪪",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      errror: true,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("token", tokenOption);

    res.status(200).json({
      message: "Logged out successfully...🎉",
      data: [],
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
