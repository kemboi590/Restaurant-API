"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.restaurantRouter = new hono_1.Hono();
// get all restaurants
exports.restaurantRouter
    .get("restaurants", restaurant_controller_1.getRestaurantsController)
    .post("restaurants", (0, zod_validator_1.zValidator)('json', validators_1.restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurant_controller_1.createRestaurantController);
// get restaurant by id
exports.restaurantRouter
    .get("restaurants/:id", restaurant_controller_1.getRestaurantByIdController)
    .put("restaurants/:id", (0, zod_validator_1.zValidator)('json', validators_1.restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurant_controller_1.updateRestaurantController)
    .delete("restaurants/:id", restaurant_controller_1.deleteRestaurantController);
