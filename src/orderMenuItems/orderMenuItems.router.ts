import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { orderItemsSchema } from "../validators";
import { getOrderMenuItemsController, getOrderMenuItemByIdController, createOrderMenuItemController, updateOrderMenuItemController, deleteOrderMenuItemController } from './orderMenuItems.controller';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const orderMenuItemsRouter = new Hono()

// get all order menu items
orderMenuItemsRouter
    .get("orderMenuItems",adminRoleAuth, getOrderMenuItemsController)
    .post("orderMenuItems", zValidator('json', orderItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, createOrderMenuItemController)

// get order menu item by id
orderMenuItemsRouter
    .get("orderMenuItems/:id",bothRoleAuth, getOrderMenuItemByIdController)
    .put("orderMenuItems/:id", zValidator('json', orderItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, updateOrderMenuItemController)
    .delete("orderMenuItems/:id",adminRoleAuth, deleteOrderMenuItemController)