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
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const user = yield User_1.default.findOne({ username });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password using bycrpyt
        const bcrypt = require('bcryptjs');
        const hashedPassword = yield bcrypt.hash(password, 10);
        console.log("hashedPassword", hashedPassword);
        // avatar placeholder using avatar-placeholder.iran.liara.com
        const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User_1.default({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? maleAvatar : femaleAvatar
        });
        if (newUser) {
            (0, generateToken_1.default)(newUser._id, req, res);
            yield newUser.save();
            res.status(200).json({
                id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({ message: "User not created" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    finally {
        console.log("User signup API");
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bcrypt = require('bcryptjs');
    try {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username });
        console.log("Just Logged In User", user);
        const isPasswordCorrect = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (user && !isPasswordCorrect) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        if (user && isPasswordCorrect) {
            (0, generateToken_1.default)(user._id, req, res);
            res.status(200).json({
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.logIn = logIn;
const logOut = (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out sucessfully!" });
    }
    catch (error) {
        console.error("Error logging out", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.logOut = logOut;
