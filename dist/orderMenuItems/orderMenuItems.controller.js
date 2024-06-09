"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemController = exports.updateOrderMenuItemController = exports.createOrderMenuItemController = exports.getOrderMenuItemByIdController = exports.getOrderMenuItemsController = void 0;
const orderMenuItems_service_1 = require("./orderMenuItems.service");
// get all order menu items
const getOrderMenuItemsController = async (c) => {
    try {
        const orderMenuItems = await (0, orderMenuItems_service_1.getOrderMenuItemsService)();
        if (orderMenuItems == null || orderMenuItems.length == 0) {
            return c.text("No order menu items found", 404);
        }
        return c.json(orderMenuItems, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderMenuItemsController = getOrderMenuItemsController;
// get order menu item by id
const getOrderMenuItemByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderMenuItem = await (0, orderMenuItems_service_1.getOrderMenuItemByIdService)(id);
        if (orderMenuItem == null) {
            return c.text("Order menu item not found", 404);
        }
        return c.json(orderMenuItem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderMenuItemByIdController = getOrderMenuItemByIdController;
// create order menu item
const createOrderMenuItemController = async (c) => {
    try {
        const orderMenuItem = await c.req.json();
        const newOrderMenuItem = await (0, orderMenuItems_service_1.createOrderMenuItemService)(orderMenuItem);
        if (!newOrderMenuItem)
            return c.text("Order menu item not created", 400);
        return c.json({ message: newOrderMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrderMenuItemController = createOrderMenuItemController;
//  update order menu item
const updateOrderMenuItemController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const orderMenuItem = await c.req.json();
        const updatedOrderMenuItem = await (0, orderMenuItems_service_1.getOrderMenuItemByIdService)(id);
        if (!updatedOrderMenuItem)
            return c.text("Order menu item not found", 404);
        // get data to update
        const res = await (0, orderMenuItems_service_1.updateOrderMenuItemService)(id, orderMenuItem);
        if (!res)
            return c.text("Order menu item not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrderMenuItemController = updateOrderMenuItemController;
// delete order menu item
const deleteOrderMenuItemController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const orderMenuItem = await (0, orderMenuItems_service_1.getOrderMenuItemByIdService)(id);
        if (!orderMenuItem)
            return c.text("Order menu item not found", 404);
        const res = await (0, orderMenuItems_service_1.deleteOrderMenuItemService)(id);
        if (!res)
            return c.text("Order menu item not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrderMenuItemController = deleteOrderMenuItemController;
