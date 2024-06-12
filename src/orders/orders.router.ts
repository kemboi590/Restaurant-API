import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getOrdersController, getOrderByIdController, createOrderController, updateOrderController, deleteOrderController } from './orders.controllers';
import { orderSchema } from "../validators";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const ordersRouter = new Hono()

// get all orders
ordersRouter
    .get("orders", adminRoleAuth,getOrdersController)
    .post("orders", zValidator('json', orderSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),bothRoleAuth, createOrderController)

// get order by id
ordersRouter
    .get("orders/:id",bothRoleAuth, getOrderByIdController)
    .put("orders/:id", zValidator('json', orderSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),bothRoleAuth, updateOrderController)
    .delete("orders/:id", bothRoleAuth, deleteOrderController)