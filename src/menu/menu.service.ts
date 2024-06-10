import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";


import { TIMenuItem, TSMenuItem, menuItemTable } from "../drizzle/schema";

// GET ALL MENU ITEMS
export const getMenuItemsService = async (): Promise<TSMenuItem[] | null> => {
    const menuItems = await db.query.menuItemTable.findMany();
    return menuItems;
};

// GET MENU ITEM BY ID
export const getMenuItemByIdService = async (id: number): Promise<TSMenuItem | undefined> => {
    const menuItem = await db.query.menuItemTable.findFirst({
        where: eq(menuItemTable.id, id)
    });
    return menuItem;
}

// CREATE MENU ITEM
export const createMenuItemService = async (menuItem: TIMenuItem) => {
    await db.insert(menuItemTable).values(menuItem)
    return "Menu item created successfully";
}

//  UPDATE MENU ITEM
export const updateMenuItemService = async (id: number, menuItem: TIMenuItem) => {
    await db.update(menuItemTable).set(menuItem).where(eq(menuItemTable.id, id));
    return "menu item updated successfully";
}

// DELETE MENU ITEM
export const deleteMenuItemService = async (id: number) => {
    await db.delete(menuItemTable).where(eq(menuItemTable.id, id));
    return "menu item deleted successfully";
}