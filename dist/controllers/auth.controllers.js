"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.logIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        // Check for password match
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        // Check for existing user
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        // Hash password using bcrypt
        const bcrypt = require('bcryptjs');
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Avatar placeholder
        const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        // Create new user
        const newUser = new User_1.default({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? maleAvatar : femaleAvatar
        });
        yield newUser.save(); // Save the user first
        // Generate token after saving
        (0, generateToken_1.default)(newUser._id, req, res);
        res.status(201).json({
            id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
    }
    catch (error) {
        console.error("Error during signup:", error); // Log the error
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        console.log("User signup API executed");
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find user in the database
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        // Check password
        const bcrypt = require('bcryptjs');
        const isPasswordCorrect = yield bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        // Generate token and respond
        (0, generateToken_1.default)(user._id, req, res);
        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    }
    catch (error) {
        console.error("Error during login:", error); // Log the error
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.logIn = logIn;
const logOut = (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully!" });
    }
    catch (error) {
        console.error("Error logging out:", error); // Log the error
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.logOut = logOut;
