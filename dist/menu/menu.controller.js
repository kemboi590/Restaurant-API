"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemController = exports.updateMenuItemController = exports.createMenuItemController = exports.getMenuItemByIdController = exports.getMenuItemsController = void 0;
const menu_service_1 = require("./menu.service");
// get all menu items
const getMenuItemsController = async (c) => {
    try {
        const menuItems = await (0, menu_service_1.getMenuItemsService)();
        if (menuItems == null || menuItems.length == 0) {
            return c.text("No menu items found", 404);
        }
        return c.json(menuItems, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getMenuItemsController = getMenuItemsController;
// get menu item by id
const getMenuItemByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const menuItem = await (0, menu_service_1.getMenuItemByIdService)(id);
        if (menuItem == null) {
            return c.text("Menu item not found", 404);
        }
        return c.json(menuItem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getMenuItemByIdController = getMenuItemByIdController;
// create menu item
const createMenuItemController = async (c) => {
    try {
        const menuItem = await c.req.json();
        const newMenuItem = await (0, menu_service_1.createMenuItemService)(menuItem);
        if (!newMenuItem)
            return c.text("Menu item not created", 400);
        return c.json({ message: newMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createMenuItemController = createMenuItemController;
//  update menu item
const updateMenuItemController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const menuItem = await c.req.json();
        const updatedMenuItem = await (0, menu_service_1.getMenuItemByIdService)(id);
        if (!updatedMenuItem)
            return c.text("Menu item not found", 404);
        // get data to update
        const res = await (0, menu_service_1.updateMenuItemService)(id, menuItem);
        if (!res)
            return c.text("Menu item not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateMenuItemController = updateMenuItemController;
// delete menu item
const deleteMenuItemController = async (c) => {
    // get id from url
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // check if menu item exists
        const menuItem = await (0, menu_service_1.getMenuItemByIdService)(id);
        if (!menuItem)
            return c.text("Menu item not found", 404);
        // delete menu item
        const res = await (0, menu_service_1.deleteMenuItemService)(id);
        if (!res)
            return c.text("Menu item not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteMenuItemController = deleteMenuItemController;
