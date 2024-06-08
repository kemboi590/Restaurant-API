import { Hono } from 'hono'
import { getRestaurantOwnersController, getRestaurantOwnerByIdController, createRestaurantOwnerController, updateRestaurantOwnerController, deleteRestaurantOwnerController } from './restaurantOwner.controller';
import { zValidator } from '@hono/zod-validator';
import { restaurantOwnerSchema } from "../validators";

export const restaurantOwnerRouter = new Hono()

// get all restaurantOwners
restaurantOwnerRouter
    .get("restaurantOwners", getRestaurantOwnersController)
    .post("restaurantOwners", zValidator('json', restaurantOwnerSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createRestaurantOwnerController)

// get restaurantOwner by id
restaurantOwnerRouter
    .get("restaurantOwners/:id", getRestaurantOwnerByIdController)
    .put("restaurantOwners/:id", zValidator('json', restaurantOwnerSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateRestaurantOwnerController)
    .delete("restaurantOwners/:id", deleteRestaurantOwnerController)