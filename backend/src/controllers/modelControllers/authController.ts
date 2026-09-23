import prisma from "../../config/db";
import { loginSchema, registerSchema } from "../../validators/authValidation";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { SignOptions }  from "jsonwebtoken";

// Register User
// Typescript: dont understand req, res so we should mention
const registerUser = async (req: Request, res: Response) => {
    try{
        // safeParse() is a Zod method used to check whether data follows your schema without throwing an error.
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error,
            });
        }

        const {name, email, password} = result.data;

        // Find user by email
        const existingUser  = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // Check if user exists
        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

         // Send response without password
        res.status(201).json({
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error){
        console.error("Register error:", error);

        res.status(500).json({
             message: "Internal Server Error",
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try{
        // Read email and password
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        const {email, password} = result.data;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Compare password
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

         // Create JWT
         const token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
            },

            // as string: TypeScript 
            process.env.JWT_SECRET as string,
            {
                expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as jwt.SignOptions["expiresIn"],
            }
         );

        //  Send a cookie called token to the browser and put my JWT inside it.
        // Store JWT in HTTP-only cookie
         res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
         });

         // Login successful
        res.status(200).json({
            message: "Login successful",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch(error){
         console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// get already logedin user from db and display in frontend
const getProfile = async (req: Request, res: Response) => {
    try{
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "Profile retrieved successfully",
            data: user,
        });
    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Logout User
const logoutUser = async (req: Request, res: Response) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.status(200).json({
            message: "Logout successful",
        });
    } catch(error){
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export {
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
};