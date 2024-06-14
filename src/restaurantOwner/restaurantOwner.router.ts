import { Hono } from 'hono'
import { getRestaurantOwnersController, getRestaurantOwnerByIdController, createRestaurantOwnerController, 
    updateRestaurantOwnerController, deleteRestaurantOwnerController, getRestaurantOwnerWithRestaurantsController } from './restaurantOwner.controller';
import { zValidator } from '@hono/zod-validator';
import { restaurantOwnerSchema } from "../validators";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const restaurantOwnerRouter = new Hono()

// get all restaurantOwners
restaurantOwnerRouter
    .get("restaurantOwners", adminRoleAuth, getRestaurantOwnersController)
    .post("restaurantOwners", zValidator('json', restaurantOwnerSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, createRestaurantOwnerController)

// get restaurantOwner by id
restaurantOwnerRouter
    .get("restaurantOwners/:id", bothRoleAuth, getRestaurantOwnerByIdController)
    .put("restaurantOwners/:id", zValidator('json', restaurantOwnerSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, updateRestaurantOwnerController)
    .delete("restaurantOwners/:id", adminRoleAuth, deleteRestaurantOwnerController)


// get restaurantOwner with restaurants
restaurantOwnerRouter
    .get("restaurantOwners/:id/restaurants", bothRoleAuth, getRestaurantOwnerWithRestaurantsController)
