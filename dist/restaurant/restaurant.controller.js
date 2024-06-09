"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantController = exports.updateRestaurantController = exports.createRestaurantController = exports.getRestaurantByIdController = exports.getRestaurantsController = void 0;
const restaurant_service_1 = require("./restaurant.service");
// get all restaurants
const getRestaurantsController = async (c) => {
    try {
        const restaurants = await (0, restaurant_service_1.getRestaurantsService)();
        if (restaurants == null || restaurants.length == 0) {
            return c.text("No restaurants found", 404);
        }
        return c.json(restaurants, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantsController = getRestaurantsController;
// get restaurant by id
const getRestaurantByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurant = await (0, restaurant_service_1.getRestaurantByIdService)(id);
        if (restaurant == null) {
            return c.text("Restaurant not found", 404);
        }
        return c.json(restaurant, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantByIdController = getRestaurantByIdController;
// create restaurant
const createRestaurantController = async (c) => {
    try {
        const restaurant = await c.req.json();
        const newRestaurant = await (0, restaurant_service_1.createRestaurantService)(restaurant);
        if (!newRestaurant)
            return c.text("Restaurant not created", 400);
        return c.json({ message: newRestaurant }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createRestaurantController = createRestaurantController;
//  update restaurant
const updateRestaurantController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const restaurant = await c.req.json();
        const updatedRestaurant = await (0, restaurant_service_1.getRestaurantByIdService)(id);
        if (!updatedRestaurant)
            return c.text("Restaurant not found", 404);
        // get data to update
        const res = await (0, restaurant_service_1.updateRestaurantService)(id, restaurant);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateRestaurantController = updateRestaurantController;
// delete restaurant
const deleteRestaurantController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        const restaurant = await (0, restaurant_service_1.getRestaurantByIdService)(id);
        if (!restaurant)
            return c.text("Restaurant not found", 404);
        // delete restaurant
        const res = await (0, restaurant_service_1.deleteRestaurantService)(id);
        if (!res)
            return c.text("Restaurant not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteRestaurantController = deleteRestaurantController;
