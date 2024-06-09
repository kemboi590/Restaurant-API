"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusController = exports.updateOrderStatusController = exports.createOrderStatusController = exports.getOrderStatusByIdController = exports.getOrderStatusController = void 0;
const orderStatus_service_1 = require("./orderStatus.service");
// get all order status
const getOrderStatusController = async (c) => {
    try {
        const orderStatus = await (0, orderStatus_service_1.getOrderStatusService)();
        if (orderStatus == null || orderStatus.length == 0) {
            return c.text("No order status found", 404);
        }
        return c.json(orderStatus, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderStatusController = getOrderStatusController;
// get order status by id
const getOrderStatusByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderStatus = await (0, orderStatus_service_1.getOrderStatusByIdService)(id);
        if (orderStatus == null) {
            return c.text("Order status not found", 404);
        }
        return c.json(orderStatus, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderStatusByIdController = getOrderStatusByIdController;
// create order status
const createOrderStatusController = async (c) => {
    try {
        const orderStatus = await c.req.json();
        const newOrderStatus = await (0, orderStatus_service_1.createOrderStatusService)(orderStatus);
        if (!newOrderStatus)
            return c.text("Order status not created", 400);
        return c.json({ message: newOrderStatus }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrderStatusController = createOrderStatusController;
// update order status
const updateOrderStatusController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const orderStatus = await c.req.json();
        const updatedOrderStatus = await (0, orderStatus_service_1.getOrderStatusByIdService)(id);
        if (!updatedOrderStatus)
            return c.text("Order status not found", 404);
        // get data to update
        const res = await (0, orderStatus_service_1.updateOrderStatusService)(id, orderStatus);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrderStatusController = updateOrderStatusController;
// delete order status
const deleteOrderStatusController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const orderStatus = await (0, orderStatus_service_1.getOrderStatusByIdService)(id);
        if (!orderStatus)
            return c.text("Order status not found", 404);
        const res = await (0, orderStatus_service_1.deleteOrderStatusService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrderStatusController = deleteOrderStatusController;
