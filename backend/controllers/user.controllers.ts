import { Request, Response } from "express";

import User from "../models/User"

export const getUsersForSidebar = async (req: Request, res: Response): Promise<void> => {
  try {
    const loggedInUserId = req.user._id; 
    const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password");
    res.status(200).json(filteredUsers);
  
  } catch (error: any) {  
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}