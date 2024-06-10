import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TIDriver, TSDriver, driverTable } from "../drizzle/schema";

// GET ALL DRIVERS
export const getDriversService = async (): Promise<TSDriver[] | null> => {
    const drivers = await db.query.driverTable.findMany();
    return drivers;
};

// GET DRIVER BY ID
export const getDriverByIdService = async (id: number): Promise<TSDriver | undefined> => {
    const driver = await db.query.driverTable.findFirst({
        where: eq(driverTable.id, id)
    });
    return driver;
}

// CREATE DRIVER
export const createDriverService = async (driver: TIDriver) => {
    await db.insert(driverTable).values(driver)
    return "driver created successfully";
}

//  UPDATE DRIVER
export const updateDriverService = async (id: number, driver: TIDriver) => {
    await db.update(driverTable).set(driver).where(eq(driverTable.id, id));
    return "driver updated successfully";
}

// DELETE DRIVER
export const deleteDriverService = async (id: number) => {
    await db.delete(driverTable).where(eq(driverTable.id, id));
    return "driver deleted successfully";
}