import { Context } from "hono";

import { getMenuItemsService, getMenuItemByIdService, createMenuItemService, updateMenuItemService, deleteMenuItemService } from "./menu.service";

// get all menu items
export const getMenuItemsController = async (c: Context) => {
    try {
        const menuItems = await getMenuItemsService();
        if (menuItems == null || menuItems.length == 0) {
            return c.text("No menu items found", 404);
        }
        return c.json(menuItems, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get menu item by id
export const getMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const menuItem = await getMenuItemByIdService(id);
        if (menuItem == null) {
            return c.text("Menu item not found", 404);
        }
        return c.json(menuItem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create menu item
export const createMenuItemController = async (c: Context) => {
    try {
        const menuItem = await c.req.json();
        const newMenuItem = await createMenuItemService(menuItem);

        if (!newMenuItem) return c.text("Menu item not created", 400);
        return c.json({ message: newMenuItem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update menu item
export const updateMenuItemController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const menuItem = await c.req.json();

        const updatedMenuItem = await getMenuItemByIdService(id);
        if (!updatedMenuItem) return c.text("Menu item not found", 404);

        // get data to update
        const res = await updateMenuItemService(id, menuItem);
        if (!res) return c.text("Menu item not updated", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete menu item
export const deleteMenuItemController = async (c: Context) => {
    // get id from url
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // check if menu item exists
        const menuItem = await getMenuItemByIdService(id);
        if (!menuItem) return c.text("Menu item not found", 404);

        // delete menu item
        const res = await deleteMenuItemService(id);
        if (!res) return c.text("Menu item not deleted", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};