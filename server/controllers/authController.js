const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

// register user
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return next(new createError("User already exists!", 400));
        };
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body, password: hashedPassword
        });

        // assign jwt (json web token)
        const token = jwt.sign({_id: newUser._id}, 'secretkey123', {
            expiresIn: '90d'
        });
        res.status(201).json({
            status: 'success',
            message: "User created successfully!",
            token,
            user: {
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch(error) {
        next(error);
    }
};

// loggin user
exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (email === "admin@gmail.com") {
            if (password !== "admin") {
                return next(new createError("Incorrect email or password", 401));
            }
            const token = jwt.sign({_id: 1}, 'secretkey123', {
                expiresIn: '90d'
            });
            res.status(200).json({
                status:'success',
                token,
                message: "User logged in successfully!",
                user: {
                    _id: 1,
                    name: "admin",
                    email: "admin@gmail.com",
                    role: "admin"
                }
            });
        } else {
            if (!user) return next(new createError("User not found! ", 404));

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return next(new createError("Incorrect email or password", 401));
            }
            const token = jwt.sign({_id: user._id}, 'secretkey123', {
                expiresIn: '90d'
            });
            res.status(200).json({
                status:'success',
                token,
                message: "User logged in successfully!",
                user: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    } catch (err) {
        next(err);
    }
};

// Initiate Reset Password


exports.initiateResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        // Generate reset token with secret key
        const secretKey = "secretkey123"; // Add fallback mechanism
        const resetToken = jwt.sign({ _id: user._id }, secretKey, {
            expiresIn: '15m', // Token expires in 15 minutes
        });

        // Send reset token to user via email
        res.status(200).json({
            status: 'success',
            message: "Reset password token sent successfully!",
            resetToken
        });
    } catch (error) {
        next(error);
    }
};

exports.confirmResetPassword = async (req, res, next) => {
    try {
        const { resetToken, previousPassword, newPassword } = req.body;

        if (!resetToken) {
            return next(createError(400, "Reset token is required!"));
        }

        if (!previousPassword) {
            return next(createError(400, "Previous password is required!"));
        }

        // Verify reset token with secret key
        const secretKey = "secretkey123"; // Add fallback mechanism
        const decoded = jwt.verify(resetToken, secretKey);

        // Find user by decoded ID
        const user = await User.findById(decoded._id);

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        // Compare previous password with the existing password
        const isPreviousPasswordValid = await bcrypt.compare(previousPassword, user.password);
        if (!isPreviousPasswordValid) {
            return next(createError(400, "Previous password is incorrect!"));
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: "Password reset successful!"
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(createError(400, "Reset token has expired!"));
        }
        next(createError(400, "Invalid reset token or password!"));
    }
};


// Change Password
exports.changePassword = async (req, res, next) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        // Find user by ID
        const user = await User.findById(userId);

        if (!user) {
            return next(new createError("User not found!", 404));
        }

        // Check if current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return next(new createError("Current password is incorrect!", 401));
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: "Password changed successfully!"
        });
    } catch (error) {
        next(error);
    }
};