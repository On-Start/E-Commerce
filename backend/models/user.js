// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     }
// })

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next()
//     }
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

// module.exports = mongoose.model('User', userSchema)

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    orderHistory: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

// Password hashing before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
