import { Hono } from 'hono'
import {
    getUsersController, getUserByIdController, createUserController, updateUserController,
    deleteUserController, getUserWithOrdersController, getUserAddressController, getUserCommentsController
} from './users.controller'
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

// get user with orders
userRouter
    .get("users/:id/orders", bothRoleAuth, getUserWithOrdersController)

// get user address
userRouter
    .get("users/:id/address", adminRoleAuth, getUserAddressController)

// get user comments
userRouter
    .get("users/:id/comments", bothRoleAuth, getUserCommentsController)