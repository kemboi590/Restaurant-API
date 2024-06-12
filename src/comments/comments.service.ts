import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
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

// commentwithUser
// only get user name and email
// "user": {
//     "id": 1,
//     "name": "Brian Kemboi",
//     "contact_phone": "0712345678",
//     "phone_verified": true,
//     "email": "kemboi@gmail.com",
//     "email_verified": true,
//     "confirmation_code": "1234",
//     "created_at": "2024-06-09T11:00:53.294Z",
//     "updated_at": "2024-06-09T11:00:53.294Z"
//   }
export const getCommentWithUserService = async (id: number) => {
    const comment = await db.query.commentsTable.findFirst({
        where: eq(commentsTable.id, id),
        columns: {
            id: true,
            comment_text: true,
            is_praise: true,
            is_complaint: true,
        },
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
    return comment;
}