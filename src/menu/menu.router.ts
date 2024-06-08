import { Hono } from 'hono'
import { getMenuItemsController, getMenuItemByIdController, createMenuItemController, updateMenuItemController, deleteMenuItemController } from './menu.controller';
import { zValidator } from '@hono/zod-validator';
import { menuItemsSchema } from "../validators";

export const menuRouter = new Hono()

// get all menu items
menuRouter
    .get("menu", getMenuItemsController)
    .post("menu", zValidator('json', menuItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createMenuItemController)

// get menu item by id
menuRouter
    .get("menu/:id", getMenuItemByIdController)
    .put("menu/:id", zValidator('json', menuItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateMenuItemController)
    .delete("menu/:id", deleteMenuItemController)