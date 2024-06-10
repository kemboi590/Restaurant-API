import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import { TIOrderStatus, TSOrderStatus, orderStatusTable } from "../drizzle/schema";

// GET ALL ORDERSTATUS
export const getOrderStatusService = async (): Promise<TSOrderStatus[] | null> => {
    const orderStatus = await db.query.orderStatusTable.findMany();
    return orderStatus;
};

// GET ORDERSTATUS BY ID
export const getOrderStatusByIdService = async (id: number): Promise<TSOrderStatus | undefined> => {
    const orderStatus = await db.query.orderStatusTable.findFirst({
        where: eq(orderStatusTable.id, id)
    });
    return orderStatus;
}

// CREATE ORDERSTATUS   
export const createOrderStatusService = async (orderStatus: TIOrderStatus) => {
    await db.insert(orderStatusTable).values(orderStatus)
    return "orderStatus created successfully";
}

//  UPDATE ORDERSTATUS
export const updateOrderStatusService = async (id: number, orderStatus: TIOrderStatus) => {
    await db.update(orderStatusTable).set(orderStatus).where(eq(orderStatusTable.id, id));
    return "orderStatus updated successfully";
}

// DELETE ORDERSTATUS
export const deleteOrderStatusService = async (id: number) => {
    await db.delete(orderStatusTable).where(eq(orderStatusTable.id, id));
    return "orderStatus deleted successfully";
}
