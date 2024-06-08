import { Context } from "hono";
import { getOrdersService, getOrderByIdService, createOrderService, updateOrderService, deleteOrderService } from "./orders.services";

// get all orders
export const getOrdersController = async (c: Context) => {
    try {
        const orders = await getOrdersService();
        if (orders == null || orders.length == 0) {
            return c.text("No orders found", 404);
        }
        return c.json(orders, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order by id
export const getOrderByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const order = await getOrderByIdService(id);
        if (order == null) {
            return c.text("Order not found", 404);
        }
        return c.json(order, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create order
export const createOrderController = async (c: Context) => {

    try {
        const order = await c.req.json();
        // Convert date strings to Date objects
        if (order.estimated_delivery_time) {
            order.estimated_delivery_time = new Date(order.estimated_delivery_time);
        }
        if (order.actual_delivery_time) {
            order.actual_delivery_time = new Date(order.actual_delivery_time);
        }
        const newOrder = await createOrderService(order);

        if (!newOrder) return c.text("Order not created", 400);
        return c.json({ message: newOrder }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update order
export const updateOrderController = async (c: Context) => {

    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const order = await c.req.json();
        // Convert date strings to Date objects
        if (order.estimated_delivery_time) {
            order.estimated_delivery_time = new Date(order.estimated_delivery_time);
        }
        if (order.actual_delivery_time) {
            order.actual_delivery_time = new Date(order.actual_delivery_time);
        }

        const updatedOrder = await getOrderByIdService(id);
        if (!updatedOrder) return c.text("Order not found", 404);

        // get data to update
        const res = await updateOrderService(id, order);
        if (!res) return c.text("Order not updated", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete order
export const deleteOrderController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        const order = await getOrderByIdService(id);
        if (!order) return c.text("Order not found", 404);

        const res = await deleteOrderService(id);
        if (!res) return c.text("Order not deleted", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};