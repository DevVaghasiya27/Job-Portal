import UserModel from "../models/UserModel.js";

export const registerController = async (req, res, next) => {

    const { name, email, password, lastName, location } = req.body

    // Validate the input data
    if (!name) {
        next("Name is required")
    }
    if (!email) {
        next("Email is required")
    }
    if (!password) {
        next("Password is required and greater then 6 characters")
    }
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        next("User already exists")
    }

    const user = await UserModel.create({ name, email, password, lastName, location })
    // token
    const token = user.createJWT()
    res.status(201).send({
        message: 'User registered successfully',
        success: true,
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token,
    })
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body
    // validation
    if (!email) {
        next("Email is required")
    }
    if (!password) {
        next("Password is required")
    }
    // Find User by Email
    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
        next("Invalid UserName or Password")
    }
    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next("Invalid UserName or Password")
    }

    // to increase security
    user.password = undefined;

    // Generate JWT
    const token = user.createJWT()
    res.status(200).send({
        message: 'User logged in successfully',
        success: true,
        user,
        token,
    })
}