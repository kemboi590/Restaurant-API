import { Context } from "hono";
import { getRestaurantsService, getRestaurantByIdService, createRestaurantService, updateRestaurantService, deleteRestaurantService } from "./restaurant.service";

// get all restaurants
export const getRestaurantsController = async (ctx: Context) => {
    const restaurants = await getRestaurantsService();
    ctx.json(restaurants);
}

// get restaurant by id
export const getRestaurantByIdController = async (ctx: Context) => {
    const id = parseInt(ctx.req.param("id"));
    const restaurant = await getRestaurantByIdService(id);
    ctx.json(restaurant);
}

// create restaurant
export const createRestaurantController = async (ctx: Context) => {
    const restaurant = await ctx.req.json();
    const newRestaurant = await createRestaurantService(restaurant);
    ctx.json(newRestaurant);
}

// update restaurant
export const updateRestaurantController = async (ctx: Context) => {
    const id = parseInt(ctx.req.param("id"));
    const restaurant = await ctx.req.json();
    const updatedRestaurant = await updateRestaurantService(id, restaurant);
    ctx.json(updatedRestaurant);
}

// delete restaurant

export const deleteRestaurantController = async (ctx: Context) => {
    const id = parseInt(ctx.req.param("id"));
    const deletedRestaurant = await deleteRestaurantService(id);
    ctx.json(deletedRestaurant);
}