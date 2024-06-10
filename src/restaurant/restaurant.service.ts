import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import { TIRestaurant, TSRestaurant, restaurantTable } from "../drizzle/schema";

// GET ALL RESTAURANTS
export const getRestaurantsService = async (): Promise<TSRestaurant[] | null> => {
    const restaurants = await db.query.restaurantTable.findMany();
    return restaurants;
};

// GET RESTAURANT BY ID
export const getRestaurantByIdService = async (id: number): Promise<TSRestaurant | undefined> => {
    const restaurant = await db.query.restaurantTable.findFirst({
        where: eq(restaurantTable.id, id)
    });
    return restaurant;
}

// CREATE RESTAURANT
export const createRestaurantService = async (restaurant: TIRestaurant) => {
    await db.insert(restaurantTable).values(restaurant)
    return "restaurant created successfully";
}

//  UPDATE RESTAURANT
export const updateRestaurantService = async (id: number, restaurant: TIRestaurant) => {
    await db.update(restaurantTable).set(restaurant).where(eq(restaurantTable.id, id));
    return "restaurant updated successfully";
}

// DELETE RESTAURANT

export const deleteRestaurantService = async (id: number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id));
    return "restaurant deleted successfully";
}