import { type Request, type Response } from 'express';

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
}

export const signup = async (req: Request, res: Response) => {
    const { email, username, password, role } = req.body;
}

export const signout = async (req: Request, res: Response) => {}

export const refreshToken = async (req: Request, res: Response) => {}

export const profile = async (req: Request, res: Response) => {}


export const forgotPassword = async (req: Request, res: Response) => {}

export const resetPassword = async (req: Request, res: Response) => {}


