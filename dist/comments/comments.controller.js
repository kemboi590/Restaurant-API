"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentController = exports.updateCommentController = exports.createCommentController = exports.getCommentByIdController = exports.getCommentsController = void 0;
const comments_service_1 = require("./comments.service");
// get all comments
const getCommentsController = async (c) => {
    try {
        const comments = await (0, comments_service_1.getCommentsService)();
        if (comments == null || comments.length == 0) {
            return c.text("No comments found", 404);
        }
        return c.json(comments, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCommentsController = getCommentsController;
// get comment by id
const getCommentByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const comment = await (0, comments_service_1.getCommentByIdService)(id);
        if (comment == null) {
            return c.text("Comment not found", 404);
        }
        return c.json(comment, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCommentByIdController = getCommentByIdController;
// create comment
const createCommentController = async (c) => {
    try {
        const comment = await c.req.json();
        const newComment = await (0, comments_service_1.createCommentService)(comment);
        if (!newComment)
            return c.text("Comment not created", 400);
        return c.json({ message: newComment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCommentController = createCommentController;
//  update comment
const updateCommentController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const comment = await c.req.json();
        const updatedComment = await (0, comments_service_1.getCommentByIdService)(id);
        if (!updatedComment)
            return c.text("Comment not found", 404);
        // get data to update
        const res = await (0, comments_service_1.updateCommentService)(id, comment);
        if (!res)
            return c.text("Comment not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCommentController = updateCommentController;
// delete comment
const deleteCommentController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const comment = await (0, comments_service_1.getCommentByIdService)(id);
        if (!comment)
            return c.text("Comment not found", 404);
        const res = await (0, comments_service_1.deleteCommentService)(id);
        if (!res)
            return c.text("Comment not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCommentController = deleteCommentController;
