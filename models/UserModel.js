import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
// Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Require']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is Require'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Password is Require'],
        minlength: [6, 'password must be at least 6 characters'],
        select: true,
    },
    location: {
        type: String,
        default: "India",
    },
},
    { timestamps: true }
);

// middlewares
userSchema.pre("save", async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare Password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatched = bcrypt.compare(userPassword, this.password)
    return isMatched
}

// JSON WEB TOKEN
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
}

export default mongoose.model("User", userSchema);