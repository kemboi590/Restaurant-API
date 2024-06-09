"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderController = exports.updateOrderController = exports.createOrderController = exports.getOrderByIdController = exports.getOrdersController = void 0;
const orders_services_1 = require("./orders.services");
// get all orders
const getOrdersController = async (c) => {
    try {
        const orders = await (0, orders_services_1.getOrdersService)();
        if (orders == null || orders.length == 0) {
            return c.text("No orders found", 404);
        }
        return c.json(orders, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrdersController = getOrdersController;
// get order by id
const getOrderByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const order = await (0, orders_services_1.getOrderByIdService)(id);
        if (order == null) {
            return c.text("Order not found", 404);
        }
        return c.json(order, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderByIdController = getOrderByIdController;
// create order
const createOrderController = async (c) => {
    try {
        const order = await c.req.json();
        // Convert date strings to Date objects
        if (order.estimated_delivery_time) {
            order.estimated_delivery_time = new Date(order.estimated_delivery_time);
        }
        if (order.actual_delivery_time) {
            order.actual_delivery_time = new Date(order.actual_delivery_time);
        }
        const newOrder = await (0, orders_services_1.createOrderService)(order);
        if (!newOrder)
            return c.text("Order not created", 400);
        return c.json({ message: newOrder }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrderController = createOrderController;
//  update order
const updateOrderController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const order = await c.req.json();
        // Convert date strings to Date objects
        if (order.estimated_delivery_time) {
            order.estimated_delivery_time = new Date(order.estimated_delivery_time);
        }
        if (order.actual_delivery_time) {
            order.actual_delivery_time = new Date(order.actual_delivery_time);
        }
        const updatedOrder = await (0, orders_services_1.getOrderByIdService)(id);
        if (!updatedOrder)
            return c.text("Order not found", 404);
        // get data to update
        const res = await (0, orders_services_1.updateOrderService)(id, order);
        if (!res)
            return c.text("Order not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrderController = updateOrderController;
// delete order
const deleteOrderController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const order = await (0, orders_services_1.getOrderByIdService)(id);
        if (!order)
            return c.text("Order not found", 404);
        const res = await (0, orders_services_1.deleteOrderService)(id);
        if (!res)
            return c.text("Order not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrderController = deleteOrderController;
