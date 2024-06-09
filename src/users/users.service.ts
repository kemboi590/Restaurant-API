import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";

import { TIUsers, TSUsers, usersTable } from "../drizzle/schema";

// GET ALL USERS
export const getUsersService = async (): Promise<TSUsers[] | null> => {
    const users = await db.query.usersTable.findMany();
    return users;
};

// GET USER BY ID
export const getUserByIdService = async (id: number): Promise<TSUsers | undefined> => {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    });
    return user;
}

// CREATE USER
export const createUserService = async (user: TIUsers) => {
    await db.insert(usersTable).values(user)
    return "user created successfully";
}

//  UPDATE USER
export const updateUserService = async (id: number, user: TIUsers) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id));
    return "user updated successfully";
}

// DELETE USER
export const deleteUserService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return "user deleted successfully";
}