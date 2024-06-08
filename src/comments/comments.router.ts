import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getCommentsController, getCommentByIdController, createCommentController, updateCommentController, deleteCommentController } from './comments.controller';
import { commentsSchema } from "../validators";

export const commentsRouter = new Hono()

// get all comments
commentsRouter
    .get("comments", getCommentsController)
    .post("comments", zValidator('json', commentsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createCommentController)

// get comment by id

commentsRouter
    .get("comments/:id", getCommentByIdController)
    .put("comments/:id", zValidator('json', commentsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateCommentController)
    .delete("comments/:id", deleteCommentController)