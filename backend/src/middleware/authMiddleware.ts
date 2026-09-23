// Check whether the user has a valid JWT in their cookie. If yes, let them continue. If not, reject them.

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// NextFunction → lets the request continue to the next middleware/controller
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from HTTP-only cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Verify JWT (checks whether the JWT is genuine and still valid.)
        // token: is data like id, name that is made into long string by jwt
        // so here verfy token using secret key and put in decoded
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        // tells TypeScript: " JWT contains userId and name." because it doesnt know whast inside token
        ) as {
            userId: number;
            name: string;
        };

        // Store decoded user information in request
        // the next controller also needs to know which user is logged in.
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

export default authenticateUser;