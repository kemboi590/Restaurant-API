import { Context } from "hono";
import { getOrderMenuItemsService, getOrderMenuItemByIdService, createOrderMenuItemService, updateOrderMenuItemService, deleteOrderMenuItemService } from "./orderMenuItems.service";

// get all order menu items
export const getOrderMenuItemsController = async (c: Context) => {
    try {
        const orderMenuItems = await getOrderMenuItemsService();
        if (orderMenuItems == null || orderMenuItems.length == 0) {
            return c.text("No order menu items found", 404);
        }
        return c.json(orderMenuItems, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order menu item by id
export const getOrderMenuItemByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderMenuItem = await getOrderMenuItemByIdService(id);
        if (orderMenuItem == null) {
            return c.text("Order menu item not found", 404);
        }
        return c.json(orderMenuItem, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


// create order menu item
export const createOrderMenuItemController = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const newOrderMenuItem = await createOrderMenuItemService(orderMenuItem);

        if (!newOrderMenuItem) return c.text("Order menu item not created", 400);
        return c.json({ message: newOrderMenuItem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order menu item
export const updateOrderMenuItemController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const orderMenuItem = await c.req.json();

        const updatedOrderMenuItem = await getOrderMenuItemByIdService(id);
        if (!updatedOrderMenuItem) return c.text("Order menu item not found", 404);

        // get data to update
        const res = await updateOrderMenuItemService(id, orderMenuItem);
        if (!res) return c.text("Order menu item not updated", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete order menu item
export const deleteOrderMenuItemController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        const orderMenuItem = await getOrderMenuItemByIdService(id);
        if (!orderMenuItem) return c.text("Order menu item not found", 404);

        const res = await deleteOrderMenuItemService(id);
        if (!res) return c.text("Order menu item not deleted", 400);
        return c.json({ message: res }, 200);

    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};