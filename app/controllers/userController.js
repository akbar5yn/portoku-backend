const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

//NOTE - registerUser
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    res.status(400);
    return res.json({
      message: "Tolong masukan username anda",
    });
  }
  if (!email) {
    res.status(400);
    return res.json({
      message: "Tolong masukan email anda",
    });
  }
  if (!password) {
    res.status(400);
    return res.json({
      message: "Tolong masukan password anda",
    });
  }

  // Check whether user exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return res.json({
      message: "Email sudah digunakan oleh user lain",
    });
  }

  //NOTE -  Create User
  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      status: 201,
      data: {
        _id: user.id,
        username: user.username,
        email: user.email,
      },
      message: "user berhasil ditambahkan",
    });
  } else {
    res.status(400);
    return res.json({
      status: 400,
      message: "gagal membuat data user",
    });
  }
});

//NOTE - loginUser
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(user);
  if (user && user.password === password) {
    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        ...user._doc,
      },
    });
  } else {
    res.status(400);
    return res.json({ message: "Invalid login" });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
