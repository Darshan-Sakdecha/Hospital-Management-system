import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists.");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.create({
            name,
            email,
            password,
            role: "patient"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};