import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIComments, TSComments, commentsTable } from "../drizzle/schema";

// GET ALL COMMENTS
export const getCommentsService = async (): Promise<TSComments[] | null> => {
    const comments = await db.query.commentsTable.findMany();
    return comments;
};

// GET COMMENT BY ID
export const getCommentByIdService = async (id: number): Promise<TSComments | undefined> => {
    const comment = await db.query.commentsTable.findFirst({
        where: eq(commentsTable.id, id)
    });
    return comment;
}

// CREATE COMMENT
export const createCommentService = async (comment: TIComments) => {
    await db.insert(commentsTable).values(comment)
    return "comment created successfully";
}

//  UPDATE COMMENT
export const updateCommentService = async (id: number, comment: TIComments) => {
    await db.update(commentsTable).set(comment).where(eq(commentsTable.id, id));
    return "comment updated successfully";
}

// DELETE COMMENT
export const deleteCommentService = async (id: number) => {
    await db.delete(commentsTable).where(eq(commentsTable.id, id));
    return "comment deleted successfully";
}
