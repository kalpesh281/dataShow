const mongoose = require("mongoose");


const IpData = new mongoose.Schema({
    name: String,
    surname: String,
    mobile: { type: Number, unique: true },
    age: Number,
    city: String,
    email: { type: String, unique: true ,require},
    profession: String,
    nickname: [String],
    hobbies: [String],
   
},
    {
        collection: "InputData"
    })

mongoose.model("InputData", IpData)
