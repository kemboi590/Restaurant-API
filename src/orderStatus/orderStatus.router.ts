import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getOrderStatusController, getOrderStatusByIdController, createOrderStatusController, updateOrderStatusController, deleteOrderStatusController } from './orderStatus.controller';
import { orderStatusSchema } from "../validators";

export const orderStatusRouter = new Hono()

// get all order status
orderStatusRouter
    .get("orderStatus", getOrderStatusController)
    .post("orderStatus", zValidator('json', orderStatusSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createOrderStatusController)

// get order status by id
orderStatusRouter
    .get("orderStatus/:id", getOrderStatusByIdController)
    .put("orderStatus/:id", zValidator('json', orderStatusSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateOrderStatusController)
    .delete("orderStatus/:id", deleteOrderStatusController)

