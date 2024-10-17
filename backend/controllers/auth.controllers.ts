import { Request, Response } from "express";
import User from "../models/User";
import { UserType } from "../types/userTypes";
import generateTokenAndGetToken from "../utils/generateToken";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, username, password, confirmPassword, gender }: UserType = req.body;

    // Check for password match
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash password using bcrypt
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Avatar placeholder
    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? maleAvatar : femaleAvatar
    });

    await newUser.save(); // Save the user first

    // Generate token after saving
    generateTokenAndGetToken(newUser._id, req, res);

    res.status(201).json({
      id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    });

  } catch (error) {
    console.error("Error during signup:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    console.log("User signup API executed");
  }
};

export const logIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: UserType = req.body;

    // Find user in the database
    const user = await User.findOne({ username });
    
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return
    }

    // Check password
    const bcrypt = require('bcryptjs');
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Invalid credentials" });
      return
    }

    // Generate token and respond
    generateTokenAndGetToken(user._id, req, res);
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    });

  } catch (error) {
    console.error("Error during login:", error); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logOut = (req: Request, res: Response): void => {
  try {
    res.cookie('jwt', "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.error("Error logging out:", error); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};
