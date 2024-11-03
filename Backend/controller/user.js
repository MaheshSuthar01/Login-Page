const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require("../models/user");
const nodemailer = require("nodemailer");


const JWT_SECRET = 'your_jwt_secret'; // Store this in environment variables

module.exports.signup = async (req, res) => {
  console.log(req.body);

  try {
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ code: 400, message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const newUser = new UserModel({
      username : req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ code: 200, message: 'Signup success' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send({ code: 500, message: 'Signup error' });
  }
};

module.exports.signin = async (req, res) => {
  console.log(req.body.email);

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ code: 404, message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.send({ code: 401, message: "Password incorrect" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.send({
      email : user.email,
      code: 200,
      message: "User found",
      token: token,
    });
  } catch (err) {
    console.error("Error occurred during signin:", err);
    res.send({ code: 500, message: "Signin error" });
  }
};


module.exports.sendotp = async (req, res) => {
  console.log(req.body);

  const _otp = Math.floor(100000 + Math.random() * 900000);
  console.log(_otp);

  let user = await UserModel.findOne({ email: req.body.email });

  // send to user mail
  if (!user) {
    return res.send({ code: 500, message: 'User not found' });
  }

  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // Corrected SMTP host
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  try {
    let info = await transporter.sendMail({
      from: 'maheshsuthar95888@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: "OTP", // Subject line
      text: String(_otp),
      html: `<html>
              <body> 
              Hello and Welcome, your OTP is ${_otp}
              </body>
              </html>`,
    });

    if (info.messageId) {
      console.log(info, 84);
      await UserModel.updateOne({ email: req.body.email }, { otp: _otp });
      return res.send({ code: 200, message: 'OTP sent' });
    } else {
      return res.send({ code: 500, message: 'Server error' });
    }
  } catch (err) {
    console.error(err);
    return res.send({ code: 500, message: 'Error sending email' });
  }
};

module.exports.submitotp = async (req, res) => {
  console.log(req.body);

  try {
    // Find the user by OTP
    const user = await UserModel.findOne({ otp: req.body.otp });
    if (!user) {
      return res.send({ code: 400, message: 'OTP is wrong' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Update the password
    await UserModel.updateOne({ email: user.email }, { password: hashedPassword });

    // Optionally, you may want to clear the OTP after successful update
    await UserModel.updateOne({ email: user.email }, { otp: null });

    return res.send({ code: 200, message: 'Password updated successfully' });
  } catch (err) {
    console.error("Error during OTP submission:", err);
    return res.send({ code: 500, message: 'Server error' });
  }
};
