const mongoose = require("mongoose");

const UserRegisterSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    userType: String,
    role: String,
    department: String,
    permissions: [String]
},
    {
        collection: "UserReq",
    });

mongoose.model("UserReq", UserRegisterSchema)