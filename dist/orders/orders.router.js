"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const orders_controllers_1 = require("./orders.controllers");
const validators_1 = require("../validators");
exports.ordersRouter = new hono_1.Hono();
// get all orders
exports.ordersRouter
    .get("orders", orders_controllers_1.getOrdersController)
    .post("orders", (0, zod_validator_1.zValidator)('json', validators_1.orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orders_controllers_1.createOrderController);
// get order by id
exports.ordersRouter
    .get("orders/:id", orders_controllers_1.getOrderByIdController)
    .put("orders/:id", (0, zod_validator_1.zValidator)('json', validators_1.orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orders_controllers_1.updateOrderController)
    .delete("orders/:id", orders_controllers_1.deleteOrderController);
