import { Request, Response } from 'express';
import { registerInput, loginInput } from '../validators/auth.validator';
import { createUserInDB, getUserFromDB } from '../services/auth.service';
import jwt from 'jsonwebtoken';

export async function registerUser(req: Request, res: Response) {
    try {
        const validation = registerInput.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: validation.error.issues.map((e) => e.message)
            });
        }

        const { email, username, password } = validation.data;
        const newUser = await createUserInDB(email, username, password);

        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (err: any) {
        console.error('REGISTER ERROR:', err);

        return res.status(500).json({
            message: err?.message || 'Internal Server Error',
            code: err?.code || null
        });
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const validation = loginInput.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: validation.error.issues.map((e) => e.message)
            });
        }
        const { email, password } = validation.data;
        const user = await getUserFromDB(email, password);
        const token = jwt.sign(
            { userId: user.id, userRole: user.role },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1d'
            }
        );
        res.json({ message: 'Login successful', token, role: user.role });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function checkAdmin(req: Request, res: Response) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                isAdmin: false,
                error: 'No token provided'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: number;
            userRole: string;
        };

        // Check if user role is admin
        const isAdmin = decoded.userRole === 'ADMIN';

        return res.json({
            isAdmin,
            role: decoded.userRole,
            userId: decoded.userId
        });
    } catch (error) {
        return res.status(401).json({
            isAdmin: false,
            error: 'Invalid token'
        });
    }
}
