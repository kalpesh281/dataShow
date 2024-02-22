const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const path = require('path');
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const recaptcha = require('express-recaptcha');

const fs = require('fs');
const fastcsv = require('fast-csv');



app.use(fileUpload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
const { userInfo } = require("os");

const JWT_SECRET = "H123()efurthfbhjhgjhgjthgg$%^&[]1244fheyfetftfvfgrv??><>:.ffff"

const mongoUrl = "mongodb+srv://shenvakalpesh4:wfAVqZvHUsvmLwoC@cluster0.jbmjolz.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { console.log("Connected to database"); })
    .catch(e => console.log(e))

app.listen(8000, () => {
    console.log("Server Started");
})


require("./userData");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
    const { fname, lname, email, password, userType, role, department } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ error: "User Exists" });
        }

        let permissions = ['N'];
        if (userType === 'Admin') {
            permissions = ['RW'];
        }

        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
            userType: "Admin",
            role,
            department,
            permissions,
        });

        res.send({ status: "ok" });
    } catch (error) {
        console.error('Error during registration:', error);
        res.send({ status: "error" });
    }
});



app.post("/login", async (req, res) => {
    const { fname, lname, email, password, role, department, permissions } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        return res.send({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);


        if (user.userType === 'Admin') {
            return res.json({ status: 'ok', data: { token: token, fname: user.fname, lname: user.lname, userType: 'Admin', role: user.role, email: user.email, department: user.department, permissions: user.permissions } });
        } else {
            return res.json({ status: 'ok', data: { token: token, fname: user.fname, lname: user.lname, userType: 'User', role: user.role, email: user.email, department: user.department, permissions: user.permissions } });
        }
    }
    return res.json({ status: "error", error: "Invalid password" })
});



const fileSchema = new mongoose.Schema({
    fileName: String,
    fileType: String,
    fileContent: Buffer,
});


const File = mongoose.model("Model", fileSchema)


app.post("/upload", async (req, res) => {

    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const uploadedFile = req.files.file;
        const fileName = uploadedFile.name;
        const fileType = uploadedFile.mimetype;

        if (!fileType) {
            res.send({ error: "Upload Proper File" })
        }


        const fileContent = uploadedFile.data;


        const file = new File({
            fileName,
            fileType,
            fileContent,
        });
        await file.save();

        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
require("./IpData")
const IP = mongoose.model("InputData")

app.post("/ipdata", async (req, res) => {
    try {
        formData = req.body;
        let updatedData;

        const existingData = await IP.findOne({ email: formData.email });
        if (existingData) {
            existingData.name = formData.name;
            existingData.surname = formData.surname;
            existingData.age = formData.age;
            existingData.mobile = formData.mobile;
            existingData.profession = formData.profession;
            existingData.nickname = formData.nickname;
            existingData.hobbies = formData.hobbies;

            updatedData = await existingData.save();
            // console.log(updatedData)
            return res.status(200).json({ status: 'ok', data: updatedData });
        } else {
            const updatedData = await IP.create(formData)
            // console.log(updatedData)
            return res.status(200).json({ status: 'ok', data: updatedData });
        }

    } catch (error) {
        console.log(error)
    }
})


app.get("/ipdata/all", async (req, res) => {
    try {
        const allData = await IP.find();
        return res.status(200).json(allData)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})



app.get('/users', async (req, res) => {

    try {
        const users = await User.find({}, 'fname lname email role userType department permissions');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
app.get('/info', async (req, res) => {
    // const { email, permission } = req.body
    try {
        userP = await User.find({}, ' permissions email')
        res.json(userP)
        // console.log(userP)
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/permission', async (req, res) => {
    const { email, permission } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ email: email }, { $set: { permissions: [permission] } }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


require("./addUser")
const UserR = mongoose.model("UserReq")

app.post("/userR", async (req, res) => {
    const { fname, lname, email, userType, role, department } = req.body;


    try {
        const oldUser = await UserR.findOne({ email });
        if (oldUser) {
            return res.send({ error: "User Exists" });
        }

        let permissions = ['N'];
        if (userType === 'Admin') {
            permissions = ['RW'];
        }

        await UserR.create({
            fname,
            lname,
            email,
            userType: "User",
            role,
            department,
            permissions,
        });

        res.send({ status: "ok" });
    } catch (error) {
        console.error('Error during registration:', error);
        res.send({ status: "error" });
    }
});
const { check, validationResult } = require('express-validator');


app.post('/setpass', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with at least 16 characters, one capital letter, one digit, and one special character')
        .isLength({ min: 16 })
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User not found' }] });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password
        user.password = hashedPassword;

        // Save the user
        await user.save();

        res.json({ msg: 'Password set successfully' });
    } catch (error) {
        console.error('Error setting password:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/usersR', async (req, res) => {
    try {
        const users = await UserR.find({}, 'fname lname email role userType department permissions');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post("/delpass", async (req, res) => {
    const { email ,userType} = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check userType and only allow password reset if userType is not 'admin'
        if (user.userType === 'Admin') {
            return res.status(403).json({ message: "Password reset not allowed for admin users" });
        }

        // Update the password field to null
        const result = await UserInfo.findOneAndUpdate({ email }, { $unset: { password: 1 } }, { new: true });

        return res.status(200).json({ message: "Password deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


