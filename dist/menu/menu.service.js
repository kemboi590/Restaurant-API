"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemService = exports.updateMenuItemService = exports.createMenuItemService = exports.getMenuItemByIdService = exports.getMenuItemsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET ALL MENU ITEMS
const getMenuItemsService = async () => {
    const menuItems = await db_1.db.query.menuItemTable.findMany();
    return menuItems;
};
exports.getMenuItemsService = getMenuItemsService;
// GET MENU ITEM BY ID
const getMenuItemByIdService = async (id) => {
    const menuItem = await db_1.db.query.menuItemTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.menuItemTable.id, id)
    });
    return menuItem;
};
exports.getMenuItemByIdService = getMenuItemByIdService;
// CREATE MENU ITEM
const createMenuItemService = async (menuItem) => {
    await db_1.db.insert(schema_1.menuItemTable).values(menuItem);
    return "Menu item created successfully";
};
exports.createMenuItemService = createMenuItemService;
//  UPDATE MENU ITEM
const updateMenuItemService = async (id, menuItem) => {
    await db_1.db.update(schema_1.menuItemTable).set(menuItem).where((0, drizzle_orm_1.eq)(schema_1.menuItemTable.id, id));
    return "menu item updated successfully";
};
exports.updateMenuItemService = updateMenuItemService;
// DELETE MENU ITEM
const deleteMenuItemService = async (id) => {
    await db_1.db.delete(schema_1.menuItemTable).where((0, drizzle_orm_1.eq)(schema_1.menuItemTable.id, id));
    return "menu item deleted successfully";
};
exports.deleteMenuItemService = deleteMenuItemService;
