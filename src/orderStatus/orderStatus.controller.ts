import { Context } from "hono";
import { getOrderStatusService, getOrderStatusByIdService, createOrderStatusService, updateOrderStatusService, deleteOrderStatusService } from "./orderStatus.service";

// get all order status
export const getOrderStatusController = async (c: Context) => {
    try {
        const orderStatus = await getOrderStatusService();
        if (orderStatus == null || orderStatus.length == 0) {
            return c.text("No order status found", 404);
        }
        return c.json(orderStatus, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get order status by id
export const getOrderStatusByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderStatus = await getOrderStatusByIdService(id);
        if (orderStatus == null) {
            return c.text("Order status not found", 404);
        }
        return c.json(orderStatus, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create order status
export const createOrderStatusController = async (c: Context) => {
    try {
        const orderStatus = await c.req.json();
        const newOrderStatus = await createOrderStatusService(orderStatus);

        if (!newOrderStatus) return c.text("Order status not created", 400);
        return c.json({ message: newOrderStatus }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// update order status
export const updateOrderStatusController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const orderStatus = await c.req.json();

        const updatedOrderStatus = await getOrderStatusByIdService(id);
        if (!updatedOrderStatus) return c.text("Order status not found", 404);

        // get data to update
        const res = await updateOrderStatusService(id, orderStatus);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}

// delete order status
export const deleteOrderStatusController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const orderStatus = await getOrderStatusByIdService(id);
        if (!orderStatus) return c.text("Order status not found", 404);

        const res = await deleteOrderStatusService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
}