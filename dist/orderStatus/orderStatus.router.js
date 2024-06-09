"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const orderStatus_controller_1 = require("./orderStatus.controller");
const validators_1 = require("../validators");
exports.orderStatusRouter = new hono_1.Hono();
// get all order status
exports.orderStatusRouter
    .get("orderStatus", orderStatus_controller_1.getOrderStatusController)
    .post("orderStatus", (0, zod_validator_1.zValidator)('json', validators_1.orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orderStatus_controller_1.createOrderStatusController);
// get order status by id
exports.orderStatusRouter
    .get("orderStatus/:id", orderStatus_controller_1.getOrderStatusByIdController)
    .put("orderStatus/:id", (0, zod_validator_1.zValidator)('json', validators_1.orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orderStatus_controller_1.updateOrderStatusController)
    .delete("orderStatus/:id", orderStatus_controller_1.deleteOrderStatusController);
