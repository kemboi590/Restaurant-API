import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getOrderStatusController, getOrderStatusByIdController, createOrderStatusController, updateOrderStatusController, deleteOrderStatusController } from './orderStatus.controller';
import { orderStatusSchema } from "../validators";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const orderStatusRouter = new Hono()

// get all order status
orderStatusRouter
    .get("orderStatus", adminRoleAuth, getOrderStatusController)
    .post("orderStatus", zValidator('json', orderStatusSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, createOrderStatusController)

// get order status by id
orderStatusRouter
    .get("orderStatus/:id", bothRoleAuth, getOrderStatusByIdController)
    .put("orderStatus/:id", zValidator('json', orderStatusSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, updateOrderStatusController)
    .delete("orderStatus/:id", bothRoleAuth, deleteOrderStatusController)

