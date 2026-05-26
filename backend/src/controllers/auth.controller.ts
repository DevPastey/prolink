import { type Request, type Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { Account } from '../models/user.model.js';
import { redis } from '../lib/redis.js';

const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

const storeRefreshTokens = async(userId: string, refreshToken: string) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, { ex: 60 * 60 * 24 * 7 }); // 7 days
};

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie("access_token", accessToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 60 * 1000, // 30 minutes
    });


    res.cookie("refresh_token", refreshToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const signin = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        const user = await Account.findOne({ email }).select("+passwordHash");

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = generateTokens(user.id.toString());
        await storeRefreshTokens(user._id.toString(), refreshToken);
        setCookies(res, accessToken, refreshToken);
        res.json({ message: "Signin successful" });

    }catch(error: any){  
        res.status(500).json({message: "Server Error", error: error.message})  
    }
    
}


export const signup = async (req: Request, res: Response) => {
    const { email, name, password, confirmPassword, role } = req.body;
    const UserExist = await Account.findOne({email});

    try{
        
        if (UserExist) {
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = await Account.create({name: name, email, passwordHash: password, role});

        const { accessToken, refreshToken } = generateTokens(newUser._id.toString());

        await storeRefreshTokens(newUser._id.toString(), refreshToken);

        setCookies(res, accessToken, refreshToken);

        res.status(201).json({ user:{
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        },
            message: "User created successfully",
        });

    }catch(error: any){
        console.log("Signup error", error)
        res.status(500).json({message: error.message});
    }


};

export const signout = async (req: Request, res: Response) => {
    try{
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.json({message: "Signout successful"});

    }catch(error: any){
        res.status(500).json({message: "Server Error", error: error.message})
    }
};

export const refreshToken = async (req: Request, res: Response) => {

    try{
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({message: "Unauthorized - No refresh token provided"});
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if (storedToken !== refreshToken) {
            return res.status(401).json({message: "Unauthorized - Invalid refresh token"});
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });
        setCookies(res, accessToken, refreshToken);
        res.json({ message: "Token refreshed successfully" });
    }catch(error: any){
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized - Refresh token expired" });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try{
        const user = req.user;

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json({ user });
    }catch(error: any){
        res.status(500).json({message: "Server Error", error: error.message});
    }
};


export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try{
        const user = await Account.findOne({ email });

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        


    }catch(error: any){
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

export const resetPassword = async (req: Request, res: Response) => {

};


