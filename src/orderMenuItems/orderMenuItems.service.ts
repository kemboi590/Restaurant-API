import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import { TIOrderMenuItem, TSOrderMenuItem, orderMenuItemTable } from "../drizzle/schema";

// GET ALL ORDER MENU ITEMS
export const getOrderMenuItemsService = async (): Promise<TSOrderMenuItem[] | null> => {
    const orderMenuItems = await db.query.orderMenuItemTable.findMany();
    return orderMenuItems;
};

// GET ORDER MENU ITEM BY ID
export const getOrderMenuItemByIdService = async (id: number): Promise<TSOrderMenuItem | undefined> => {
    const orderMenuItem = await db.query.orderMenuItemTable.findFirst({
        where: eq(orderMenuItemTable.id, id)
    });
    return orderMenuItem;
}

// CREATE ORDER MENU ITEM
export const createOrderMenuItemService = async (orderMenuItem: TIOrderMenuItem) => {
    await db.insert(orderMenuItemTable).values(orderMenuItem)
    return "order menu item created successfully";
}

//  UPDATE ORDER MENU ITEM
export const updateOrderMenuItemService = async (id: number, orderMenuItem: TIOrderMenuItem) => {
    await db.update(orderMenuItemTable).set(orderMenuItem).where(eq(orderMenuItemTable.id, id));
    return "order menu item updated successfully";
}

// DELETE ORDER MENU ITEM
export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(orderMenuItemTable).where(eq(orderMenuItemTable.id, id));
    return "order menu item deleted successfully";
}
