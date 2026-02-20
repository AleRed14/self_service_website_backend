import bcrypt from "bcrypt";

import UserModels from "../models/user.models.ts";

import { Request, Response } from "express";

export const insertUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Invalid data, please ensure you submit all fields on the form."
            });
        }

       
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

       
        const [rows] = await UserModels.insertUser(name, email, hashedPassword);

        res.status(201).json({
            message: "User crated successfully",
            userId: rows.insertId
        });
    } catch (error) {
        console.log("Internal server error: ", error);
        
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
            
        }
    }
};