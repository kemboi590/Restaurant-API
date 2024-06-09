"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOwnerRouter = void 0;
const hono_1 = require("hono");
const restaurantOwner_controller_1 = require("./restaurantOwner.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.restaurantOwnerRouter = new hono_1.Hono();
// get all restaurantOwners
exports.restaurantOwnerRouter
    .get("restaurantOwners", restaurantOwner_controller_1.getRestaurantOwnersController)
    .post("restaurantOwners", (0, zod_validator_1.zValidator)('json', validators_1.restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurantOwner_controller_1.createRestaurantOwnerController);
// get restaurantOwner by id
exports.restaurantOwnerRouter
    .get("restaurantOwners/:id", restaurantOwner_controller_1.getRestaurantOwnerByIdController)
    .put("restaurantOwners/:id", (0, zod_validator_1.zValidator)('json', validators_1.restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurantOwner_controller_1.updateRestaurantOwnerController)
    .delete("restaurantOwners/:id", restaurantOwner_controller_1.deleteRestaurantOwnerController);
