"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRouter = void 0;
const hono_1 = require("hono");
const menu_controller_1 = require("./menu.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.menuRouter = new hono_1.Hono();
// get all menu items
exports.menuRouter
    .get("menu", menu_controller_1.getMenuItemsController)
    .post("menu", (0, zod_validator_1.zValidator)('json', validators_1.menuItemsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), menu_controller_1.createMenuItemController);
// get menu item by id
exports.menuRouter
    .get("menu/:id", menu_controller_1.getMenuItemByIdController)
    .put("menu/:id", (0, zod_validator_1.zValidator)('json', validators_1.menuItemsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), menu_controller_1.updateMenuItemController)
    .delete("menu/:id", menu_controller_1.deleteMenuItemController);
