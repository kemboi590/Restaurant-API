import "dotenv/config";
import { verify } from "hono/jwt";
import { Context, Next } from "hono";


// AUTHRNICATION MIDDLEWARE
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret);
        return decoded;

    } catch (error: any) {
        return null;
    }
}

// AUTHENTICATION MIDDLEWARE
export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");

    if (!token) return c.json({ error: "Token is required" }, 401);
    const decoded = await verifyToken(token as string, process.env.JWT_SECRET as string);

    if (!decoded) return c.json({ error: "Invalid token" }, 401);
    if (decoded.role !== requiredRole) return c.json({ error: "Unauthorized" }, 401);
    return next();
}

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");