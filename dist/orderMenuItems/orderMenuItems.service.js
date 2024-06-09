"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemService = exports.updateOrderMenuItemService = exports.createOrderMenuItemService = exports.getOrderMenuItemByIdService = exports.getOrderMenuItemsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL ORDER MENU ITEMS
const getOrderMenuItemsService = async () => {
    const orderMenuItems = await db_1.default.query.orderMenuItemTable.findMany();
    return orderMenuItems;
};
exports.getOrderMenuItemsService = getOrderMenuItemsService;
// GET ORDER MENU ITEM BY ID
const getOrderMenuItemByIdService = async (id) => {
    const orderMenuItem = await db_1.default.query.orderMenuItemTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderMenuItemTable.id, id)
    });
    return orderMenuItem;
};
exports.getOrderMenuItemByIdService = getOrderMenuItemByIdService;
// CREATE ORDER MENU ITEM
const createOrderMenuItemService = async (orderMenuItem) => {
    await db_1.default.insert(schema_1.orderMenuItemTable).values(orderMenuItem);
    return "order menu item created successfully";
};
exports.createOrderMenuItemService = createOrderMenuItemService;
//  UPDATE ORDER MENU ITEM
const updateOrderMenuItemService = async (id, orderMenuItem) => {
    await db_1.default.update(schema_1.orderMenuItemTable).set(orderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.orderMenuItemTable.id, id));
    return "order menu item updated successfully";
};
exports.updateOrderMenuItemService = updateOrderMenuItemService;
// DELETE ORDER MENU ITEM
const deleteOrderMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.orderMenuItemTable).where((0, drizzle_orm_1.eq)(schema_1.orderMenuItemTable.id, id));
    return "order menu item deleted successfully";
};
exports.deleteOrderMenuItemService = deleteOrderMenuItemService;
