import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import {
    getCommentsController, getCommentByIdController, createCommentController,
    updateCommentController, deleteCommentController, getCommentWithUserController
} from './comments.controller';
import { commentsSchema } from "../validators";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const commentsRouter = new Hono()

// get all comments
commentsRouter
    .get("comments", adminRoleAuth, getCommentsController)
    .post("comments", zValidator('json', commentsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, createCommentController)

// get comment by id

commentsRouter
    .get("comments/:id", bothRoleAuth, getCommentByIdController)
    .put("comments/:id", zValidator('json', commentsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, updateCommentController)
    .delete("comments/:id", bothRoleAuth, deleteCommentController)

// get comment with user
commentsRouter
    .get("comments/:id/user", bothRoleAuth, getCommentWithUserController)