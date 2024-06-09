"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerController = exports.updateRestaurantOwnerController = exports.createRestaurantOwnerController = exports.getRestaurantOwnerByIdController = exports.getRestaurantOwnersController = void 0;
const restaurantOwner_service_1 = require("./restaurantOwner.service");
// get all restaurantOwners
const getRestaurantOwnersController = async (c) => {
    try {
        const restaurantOwners = await (0, restaurantOwner_service_1.getRestaurantOwnersService)();
        if (restaurantOwners == null || restaurantOwners.length == 0) {
            return c.text("No restaurantOwners found", 404);
        }
        return c.json(restaurantOwners, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantOwnersController = getRestaurantOwnersController;
// get restaurantOwner by id
const getRestaurantOwnerByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurantOwner = await (0, restaurantOwner_service_1.getRestaurantOwnerByIdService)(id);
        if (restaurantOwner == null) {
            return c.text("RestaurantOwner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantOwnerByIdController = getRestaurantOwnerByIdController;
// create restaurantOwner
const createRestaurantOwnerController = async (c) => {
    try {
        const restaurantOwner = await c.req.json();
        const newRestaurantOwner = await (0, restaurantOwner_service_1.createRestaurantOwnerService)(restaurantOwner);
        if (!newRestaurantOwner)
            return c.text("RestaurantOwner not created", 400);
        return c.json({ message: newRestaurantOwner }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createRestaurantOwnerController = createRestaurantOwnerController;
//  update restaurantOwner
const updateRestaurantOwnerController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const restaurantOwner = await c.req.json();
        const updatedRestaurantOwner = await (0, restaurantOwner_service_1.getRestaurantOwnerByIdService)(id);
        if (!updatedRestaurantOwner)
            return c.text("RestaurantOwner not found", 404);
        // get data to update
        const res = await (0, restaurantOwner_service_1.updateRestaurantOwnerService)(id, restaurantOwner);
        if (!res)
            return c.text("RestaurantOwner not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateRestaurantOwnerController = updateRestaurantOwnerController;
// delete restaurantOwner
const deleteRestaurantOwnerController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const restaurantOwner = await (0, restaurantOwner_service_1.getRestaurantOwnerByIdService)(id);
        if (!restaurantOwner)
            return c.text("RestaurantOwner not found", 404);
        const res = await (0, restaurantOwner_service_1.deleteRestaurantOwnerService)(id);
        if (!res)
            return c.text("RestaurantOwner not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteRestaurantOwnerController = deleteRestaurantOwnerController;
