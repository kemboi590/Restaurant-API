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

// userwithComments
export const getUserWithCommentsService = async (id: number): Promise<TSUsers | undefined> => {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        with: {
            comments: true
        }
    });
    return user;
}

// userswithOrders and the driver who will deliver
export const getUsersWithOrdersService = async (id: number) => {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        columns: {
            id: true,
            name: true,
            email: true,
            contact_phone: true,
        },
        with: {
            orders: {
                columns: {
                    id: true,
                    estimated_delivery_time: true,
                    actual_delivery_time: true,
                    price: true,
                    discount: true,
                    comment: true,
                }
            }
        }
    });
    return user;
}


// getuserAddress
export const getUserAddressService = async (id: number) => {
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        columns: {
            name: true,
            contact_phone: true,
        },
        with: {
            address: {
                columns: {
                    street_address_1: true,
                    zip_code: true,
                    delivery_instructions: true,
                }
            }

        }
    });
    return user;
}