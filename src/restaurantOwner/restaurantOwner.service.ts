import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import { TIRestaurantOwner, TSRestaurantOwner, restaurantOwnerTable } from "../drizzle/schema";

// GET ALL RESTAURANTOWNERS
export const getRestaurantOwnersService = async (): Promise<TSRestaurantOwner[] | null> => {
    const restaurantOwners = await db.query.restaurantOwnerTable.findMany();
    return restaurantOwners;
};

// GET RESTAURANTOWNER BY ID
export const getRestaurantOwnerByIdService = async (id: number): Promise<TSRestaurantOwner | undefined> => {
    const restaurantOwner = await db.query.restaurantOwnerTable.findFirst({
        where: eq(restaurantOwnerTable.id, id)
    });
    return restaurantOwner;
}

// CREATE RESTAURANTOWNER
export const createRestaurantOwnerService = async (restaurantOwner: TIRestaurantOwner) => {
    await db.insert(restaurantOwnerTable).values(restaurantOwner)
    return "restaurantOwner created successfully";
}

//  UPDATE RESTAURANTOWNER
export const updateRestaurantOwnerService = async (id: number, restaurantOwner: TIRestaurantOwner) => {
    await db.update(restaurantOwnerTable).set(restaurantOwner).where(eq(restaurantOwnerTable.id, id));
    return "restaurantOwner updated successfully";
}

// DELETE RESTAURANTOWNER
export const deleteRestaurantOwnerService = async (id: number) => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id));
    return "restaurantOwner deleted successfully";
}