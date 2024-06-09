import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import { TICity, TSCity, cityTable } from "../drizzle/schema";

// GET ALL CITIES
export const getCitiesService = async (): Promise<TSCity[] | null> => {
    const cities = await db.query.cityTable.findMany();
    return cities;
};


// GET CITY BY ID
export const getCityByIdService = async (id: number): Promise<TSCity | undefined> => {
    const city = await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id)
    });
    return city;
}

// CREATE CITY
export const createCityService = async (city: TICity) => {
    await db.insert(cityTable).values(city)
    return "city created successfully";
}

//  UPDATE CITY
export const updateCityService = async (id: number, city: TICity) => {
    await db.update(cityTable).set(city).where(eq(cityTable.id, id));
    return "city updated successfully";
}

// DELETE CITY
export const deleteCityService = async (id: number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id));
    return "city deleted successfully";
}