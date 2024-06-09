"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const comments_controller_1 = require("./comments.controller");
const validators_1 = require("../validators");
exports.commentsRouter = new hono_1.Hono();
// get all comments
exports.commentsRouter
    .get("comments", comments_controller_1.getCommentsController)
    .post("comments", (0, zod_validator_1.zValidator)('json', validators_1.commentsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), comments_controller_1.createCommentController);
// get comment by id
exports.commentsRouter
    .get("comments/:id", comments_controller_1.getCommentByIdController)
    .put("comments/:id", (0, zod_validator_1.zValidator)('json', validators_1.commentsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), comments_controller_1.updateCommentController)
    .delete("comments/:id", comments_controller_1.deleteCommentController);
