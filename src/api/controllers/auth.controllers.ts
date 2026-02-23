import bcrypt from "bcrypt";
import authModels from "../models/auth.models.js";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "login",
                about: "Login dashboard",
                error: "All fields are required"
            });
        } 
        
        
        const [rows] = await authModels.validateUser(email);

        
        if (rows.length === 0) {
            return res.render("login", {
                title: "login",
                about: "Login dashboard",
                error: "Incorrect credentials"
            });
        }
        
        
        const user = rows[0]; 
        console.table(user);

        
        const match = await bcrypt.compare(password, user.password); 
        
        if (match) {
            
            if (typeof user.id === "number") {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email            
                }
            } else {
            return res.render("login", {
                title: "login",
                about: "Error with the id",
                error: "Error with the id"
            });
        }
            res.redirect("/"); 
        } else {
            return res.render("login", {
                title: "login",
                about: "Incorrect password",
                error: "Incorrect password"
            });
        }

        

        
    } catch (error) {
        console.error("Login error: ", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
}

export const logoutController = (req: Request, res: Response) => {
    
    req.session.destroy((err) => {
        if (err) { 
            console.log("Error destroying session: ", err);
            return res.status(500).json({
                error: "Error closing session"
            });
            
        }

        
        res.redirect("/login");
    });
}