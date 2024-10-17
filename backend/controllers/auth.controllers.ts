import { Request, Response } from "express";
import User from "../models/User";
import { UserType } from "../types/userTypes";
import generateTokenAndGetToken from "../utils/generateToken";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, username, password, confirmPassword, gender}: UserType = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    const user = await User.findOne({ username})
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password using bycrpyt
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    // avatar placeholder using avatar-placeholder.iran.liara.com
    const maleAvatar =`https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? maleAvatar : femaleAvatar
    });

    if (newUser){
      generateTokenAndGetToken(newUser._id, req,  res);
      await newUser.save();

      res.status(200).json({ 
          id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic
      });

    }else{
      res.status(400).json({ message: "User not created" });
    }

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
  finally {
    console.log("User signup API");
  }
}



export const logIn = async (req: Request, res: Response): Promise<void> => {
  const bcrypt = require('bcryptjs');
  try {
    const { username, password }: UserType = req.body;

    const user = await User.findOne({ username });

    console.log("Just Logged In User", user);
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (user && !isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (user && isPasswordCorrect) {
      generateTokenAndGetToken(user._id, req,  res);
      res.status(200).json({ 
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic
      });
      return;
    }


  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export const logOut = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', "", {maxAge: 0});
    res.status(200).json({ message: "Logged out sucessfully!" });
  } catch (error) {
    console.error("Error logging out", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}