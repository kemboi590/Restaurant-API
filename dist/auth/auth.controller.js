"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.registerUserController = void 0;
require("dotenv/config");
const auth_service_1 = require("./auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const registerUserController = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPassword;
        const createUser = await (0, auth_service_1.createAuthUserService)(user);
        if (!createUser)
            return c.text("User not created", 400);
        return c.json({ message: createUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerUserController = registerUserController;
const loginUserController = async (c) => {
    try {
        const user = await c.req.json();
        // check if user exists
        const userExists = await (0, auth_service_1.userLoginService)(user);
        if (userExists === null)
            return c.json({ error: "User not found" }, 404); // user not found
        const userMatch = await bcrypt_1.default.compare(user.password, userExists?.password);
        if (!userMatch) {
            return c.json({ error: "Invalid Credentials" }, 400); // invalid password
        }
        else {
            // create a payload
            const payload = {
                sub: userExists?.username,
                role: userExists?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180) // 3 hours
            };
            let secret = process.env.JWT_SECRET; // secret key
            const token = await (0, jwt_1.sign)(payload, secret); // generate token
            let user = userExists?.user;
            let role = userExists?.role;
            return c.json({ token, user: { role, ...user } }, 200); // return token and user details
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUserController = loginUserController;
