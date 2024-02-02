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


app.use(fileUpload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");

const JWT_SECRET = "H123()efurthfbhjhgjhgjthgg$%^&[]1244fheyfetftfvfgrv??><>:.ffff"

const mongoUrl = "mongodb+srv://shenvakalpesh4:wfAVqZvHUsvmLwoC@cluster0.jbmjolz.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(mongoUrl, {
    useNewUrlParser: true
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


const filesDir = path.join(__dirname, 'files');


app.use((req, res, next) => {
    if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir);
    }
    next();
});


app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const uploadedFile = req.files.file;
    const fileName = uploadedFile.name;
    const filePath = path.join(filesDir, fileName);

    uploadedFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' });
        }

        return res.status(200).json({ status: 'File uploaded successfully.', filePath });
    });
});




//mongodb+srv://shenvakalpesh4:wfAVqZvHUsvmLwoC@cluster0.jbmjolz.mongodb.net/?retryWrites=true&w=majority

//