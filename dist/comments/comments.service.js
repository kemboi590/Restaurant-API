"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.updateCommentService = exports.createCommentService = exports.getCommentByIdService = exports.getCommentsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL COMMENTS
const getCommentsService = async () => {
    const comments = await db_1.default.query.commentsTable.findMany();
    return comments;
};
exports.getCommentsService = getCommentsService;
// GET COMMENT BY ID
const getCommentByIdService = async (id) => {
    const comment = await db_1.default.query.commentsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.commentsTable.id, id)
    });
    return comment;
};
exports.getCommentByIdService = getCommentByIdService;
// CREATE COMMENT
const createCommentService = async (comment) => {
    await db_1.default.insert(schema_1.commentsTable).values(comment);
    return "comment created successfully";
};
exports.createCommentService = createCommentService;
//  UPDATE COMMENT
const updateCommentService = async (id, comment) => {
    await db_1.default.update(schema_1.commentsTable).set(comment).where((0, drizzle_orm_1.eq)(schema_1.commentsTable.id, id));
    return "comment updated successfully";
};
exports.updateCommentService = updateCommentService;
// DELETE COMMENT
const deleteCommentService = async (id) => {
    await db_1.default.delete(schema_1.commentsTable).where((0, drizzle_orm_1.eq)(schema_1.commentsTable.id, id));
    return "comment deleted successfully";
};
exports.deleteCommentService = deleteCommentService;
