import { Hono } from 'hono'
import { getMenuItemsController, getMenuItemByIdController, createMenuItemController, updateMenuItemController, deleteMenuItemController } from './menu.controller';
import { zValidator } from '@hono/zod-validator';
import { menuItemsSchema } from "../validators";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const menuRouter = new Hono()

// get all menu items
menuRouter
    .get("menu", bothRoleAuth, getMenuItemsController)
    .post("menu", zValidator('json', menuItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, createMenuItemController)

// get menu item by id
menuRouter
    .get("menu/:id", bothRoleAuth, getMenuItemByIdController)
    .put("menu/:id", zValidator('json', menuItemsSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, updateMenuItemController)
    .delete("menu/:id", adminRoleAuth, deleteMenuItemController)