const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())
const cors = require("cors");
app.use(cors());
const path = require('path');
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const XLSX = require('xlsx');


app.use(fileUpload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");

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
    const { fname, lname, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ error: "User Exists" });
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        });
        res.send({ status: "ok" })
    }

    catch (error) {
        res.send({ status: "error" })
    }

});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.send({ error: "User Not Found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: "ok", data: token })
        } else {
            return res.json({ error: "error" })
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

// app.post("/ipdata", async (req, res) => {
//     const formData = req.body;

//     IP.findOne({ email: formData.email })
//         .then(existingData => {
//             if (existingData) {

//                 existingData.name = formData.name;
//                 existingData.surname = formData.surname;
//                 existingData.age=formData.age
//                 existingData.mobile=formData.age
//                 existingData.profession=formData.profession
//                 existingData.nickname = formData.nickname
//                 existingData.hobbies=formData.hobbies
//                 return existingData.save();
//             } else {

//                 return IP.create({ ...formData });
//             }
//         })
//         .then(updatedData => {

//             const ws = XLSX.utils.json_to_sheet([updatedData.toObject()]);
//             const wb = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

//             const fileType = 'xlsx';
//             const fileContent = XLSX.write(wb, { bookType: fileType, type: 'buffer' });


//             updatedData.fileContent = fileContent;
//             updatedData.fileType = fileType;

//             return updatedData.save();
//         })
//         .then(() => {
//             return res.status(200).json({ status: 'ok' });
//         })
//         .catch(err => {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         });
// });



app.post("/ipdata", async (req, res) => {
    try {
        const formData = req.body;
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
        } else {
            updatedData = await IP.create({ ...formData });
        }

        const allData = await IP.find();
        const wsAllData = XLSX.utils.json_to_sheet(allData.map(data => data.toObject()));
        const wbAllData = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wbAllData, wsAllData, 'Sheet 1');
        const fileTypeAllData = 'xlsx';
        const fileContentAllData = XLSX.write(wbAllData, { bookType: fileTypeAllData, type: 'buffer' });


        await IP.updateOne({}, { fileContentAllData, fileTypeAllData });

        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
})


