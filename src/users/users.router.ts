import { Hono } from 'hono'
import { getUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController } from './users.controller'
import { zValidator } from '@hono/zod-validator';
import { userSchema } from '../validators';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';

export const userRouter = new Hono()

// get all users
userRouter
    .get("users", adminRoleAuth, getUsersController)
    .post("users", zValidator('json', userSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createUserController)

// get user by id
userRouter
    .get("users/:id", bothRoleAuth, getUserByIdController)
    .put("users/:id", zValidator('json', userSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, updateUserController)
    .delete("users/:id", bothRoleAuth, deleteUserController)