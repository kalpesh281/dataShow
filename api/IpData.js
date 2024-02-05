const mongoose = require("mongoose");


const IpData = new mongoose.Schema({
    name: String,
    surname: String,
    mobile: { type: Number, unique: true },
    age: Number,
    city: String,
    email: { type: String, unique: true },
    profession: String,
    nickname: String,
    hobbies: [String],
    fileContent: Buffer,
    fileType: String,
}, {
    collation: "InputData"
})

mongoose.model("InputData", IpData)
