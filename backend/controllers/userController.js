import User from "../models/User.js";
import Task from "../models/Task.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const safeUser = await User.findById(user._id)
            .select("-password");

        return res.status(201).json({
            message: "User created successfully",
            user: safeUser
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// Login
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// GET PROFILE
export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(
            req.user.userId
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(
            req.user.userId
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, email } = req.body;

        if (!name && !email) {
            return res.status(400).json({
                message: "At least one field is required"
            });
        }

        // Email uniqueness check
        if (email && email !== user.email) {

            const existingUser = await User.findOne({
                email
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        await user.save();

        const updatedUser = await User.findById(
            user._id
        ).select("-password");

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// CHANGE PASSWORD
export const updateProfilePassword = async (req, res) => {
    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Both passwords are required"
            });
        }

        const user = await User.findById(
            req.user.userId
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                message:
                    "New password must be different from current password"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// Delete User
export const deleteProfile=async (req,res)=>{
    try{
        const {password} =req.body;
        
        if (!password){
            return res.status(400).json({
                message: "Password is required"
            });
        }

        const user = await User.findById(
    req.user.userId
);
        if (!user){
            return res.status(404).json({
                message:"User not found"
            });
        }


        const isMatch= await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch){
            return res.status(401).json({
                message:"Incorrect password"
            });
        }
        
        
        await Task.deleteMany({
            user:user._id
        });

        await user.deleteOne();

        return res.status(200).json({
            message:"Profile Deleted successfully"
        });

    }
    catch(error){
        return res.status(500).json({
            message:"Internal server error"
        });

    }

};
