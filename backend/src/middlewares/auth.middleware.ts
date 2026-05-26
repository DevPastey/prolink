import jwt, { type JwtPayload} from "jsonwebtoken";
import { Account } from "../models/user.model.js";
import { type Request, type Response, type NextFunction } from "express";
import {config} from "dotenv";

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

interface AccessTokenPayload extends JwtPayload {
  userId: string;
};

export const protectRoute = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({message: "Unauthorized - No access token provided"});
        }

        try {
           const decoded = jwt.verify(
                accessToken,
                ACCESS_TOKEN_SECRET as string
            ) as AccessTokenPayload;


            const user = await Account.findById(
                decoded.userId
            ).select("+passwordHash");
            
            if (!user) {
                return res.status(401).json({message: "User not found"});
            }

            req.user = {
                id: user._id.toString(),
                role: user.role as 'professional' | 'admin' | 'superAdmin'
            };

            console.log(accessToken);


            next();
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
        }

    } catch (error) {
        console.log("Error in protectRoute middleware");
        res.status(401).json({message: "Unauthorized - Invalid access token"});
        throw error;
    }
}

export const adminRoute = async(req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "admin") {
        next();
    }else{
        return res.status(403).json({message: "Access denied - Admin only"})
    }
}

export const superAdminRoute = async(req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "superAdmin") {
        next(); 
    }else{
        return res.status(403).json({message: "Access denied - Super Admin only"})
    }
};