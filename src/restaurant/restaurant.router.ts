import { Hono } from 'hono'
import { getRestaurantsController, getRestaurantByIdController, createRestaurantController, updateRestaurantController, deleteRestaurantController } from './restaurant.controller'
import { zValidator } from '@hono/zod-validator';
import { restaurantSchema } from '../validators';


export const restaurantRouter = new Hono()

// get all restaurants
restaurantRouter
    .get("restaurants", getRestaurantsController)
    .post("restaurants", zValidator('json', restaurantSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createRestaurantController)


// get restaurant by id
restaurantRouter
    .get("restaurants/:id", getRestaurantByIdController)
    .put("restaurants/:id", zValidator('json', restaurantSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateRestaurantController)
    .delete("restaurants/:id", deleteRestaurantController)