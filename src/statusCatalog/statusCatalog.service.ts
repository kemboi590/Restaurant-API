import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import { TIStatusCatalog, TSStatusCatalog, statusCatalogTable } from "../drizzle/schema";

// GET ALL STATUS CATALOG
export const getStatusCatalogService = async (): Promise<TSStatusCatalog[] | null> => {
    const statusCatalog = await db.query.statusCatalogTable.findMany();
    return statusCatalog;
};

// GET STATUS CATALOG BY ID
export const getStatusCatalogByIdService = async (id: number): Promise<TSStatusCatalog | undefined> => {
    const statusCatalog = await db.query.statusCatalogTable.findFirst({
        where: eq(statusCatalogTable.id, id)
    });
    return statusCatalog;
}

// CREATE STATUS CATALOG
export const createStatusCatalogService = async (statusCatalog: TIStatusCatalog) => {
    await db.insert(statusCatalogTable).values(statusCatalog)
    return "statusCatalog created successfully";
}

//  UPDATE STATUS CATALOG
export const updateStatusCatalogService = async (id: number, statusCatalog: TIStatusCatalog) => {
    await db.update(statusCatalogTable).set(statusCatalog).where(eq(statusCatalogTable.id, id));
    return "statusCatalog updated successfully";
}

// DELETE STATUS CATALOG
export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(statusCatalogTable).where(eq(statusCatalogTable.id, id));
    return "statusCatalog deleted successfully";
}
