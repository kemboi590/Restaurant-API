import { Hono } from 'hono'
import { getRestaurantsController, getRestaurantByIdController, createRestaurantController,
     updateRestaurantController, deleteRestaurantController, getRestaurantWithOrdersController } from './restaurant.controller'
import { zValidator } from '@hono/zod-validator';
import { restaurantSchema } from '../validators';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const restaurantRouter = new Hono()

// get all restaurants
restaurantRouter
    .get("restaurants", bothRoleAuth, getRestaurantsController)
    .post("restaurants", zValidator('json', restaurantSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, createRestaurantController)


// get restaurant by id
restaurantRouter
    .get("restaurants/:id", bothRoleAuth, getRestaurantByIdController)
    .put("restaurants/:id", zValidator('json', restaurantSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, updateRestaurantController)
    .delete("restaurants/:id", adminRoleAuth, deleteRestaurantController)

// get restaurant with orders
restaurantRouter
    .get("restaurants/:id/orders",adminRoleAuth, getRestaurantWithOrdersController)