const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require('./controller/user');
const cors = require("cors");

const port = 5000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("DB connected");
    } catch (err) {
        console.log("connection error", err);
    }
}

connectToDatabase();



app.post('/signup', userController.signup);
app.post('/signin', userController.signin);
app.post('/send-otp', userController.sendotp);
app.post('/submit-otp', userController.submitotp);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
