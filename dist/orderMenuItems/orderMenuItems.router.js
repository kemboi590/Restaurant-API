"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuItemsRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const orderMenuItems_controller_1 = require("./orderMenuItems.controller");
exports.orderMenuItemsRouter = new hono_1.Hono();
// get all order menu items
exports.orderMenuItemsRouter
    .get("orderMenuItems", orderMenuItems_controller_1.getOrderMenuItemsController)
    .post("orderMenuItems", (0, zod_validator_1.zValidator)('json', validators_1.orderItemsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orderMenuItems_controller_1.createOrderMenuItemController);
// get order menu item by id
exports.orderMenuItemsRouter
    .get("orderMenuItems/:id", orderMenuItems_controller_1.getOrderMenuItemByIdController)
    .put("orderMenuItems/:id", (0, zod_validator_1.zValidator)('json', validators_1.orderItemsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orderMenuItems_controller_1.updateOrderMenuItemController)
    .delete("orderMenuItems/:id", orderMenuItems_controller_1.deleteOrderMenuItemController);
