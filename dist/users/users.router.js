"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.userRouter = new hono_1.Hono();
// get all users
exports.userRouter
    .get("users", users_controller_1.getUsersController)
    .post("users", (0, zod_validator_1.zValidator)('json', validators_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), users_controller_1.createUserController);
// get user by id
exports.userRouter
    .get("users/:id", users_controller_1.getUserByIdController)
    .put("users/:id", (0, zod_validator_1.zValidator)('json', validators_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), users_controller_1.updateUserController)
    .delete("users/:id", users_controller_1.deleteUserController);
