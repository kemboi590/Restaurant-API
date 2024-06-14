import { Context } from "hono";
import { getRestaurantOwnersService, getRestaurantOwnerByIdService, createRestaurantOwnerService, updateRestaurantOwnerService, 
    deleteRestaurantOwnerService, getRestaurantOwnerWithRestaurantsService } from "./restaurantOwner.service";

// get all restaurantOwners
export const getRestaurantOwnersController = async (c: Context) => {
    try {
        const restaurantOwners = await getRestaurantOwnersService();
        if (restaurantOwners == null || restaurantOwners.length == 0) {
            return c.text("No restaurantOwners found", 404);
        }
        return c.json(restaurantOwners, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


// get restaurantOwner by id
export const getRestaurantOwnerByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if (restaurantOwner == null) {
            return c.text("RestaurantOwner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create restaurantOwner
export const createRestaurantOwnerController = async (c: Context) => {
    try {
        const restaurantOwner = await c.req.json();
        const newRestaurantOwner = await createRestaurantOwnerService(restaurantOwner);

        if (!newRestaurantOwner) return c.text("RestaurantOwner not created", 400);
        return c.json({ message: newRestaurantOwner }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update restaurantOwner
export const updateRestaurantOwnerController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const restaurantOwner = await c.req.json();

        const updatedRestaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!updatedRestaurantOwner) return c.text("RestaurantOwner not found", 404);

        // get data to update
        const res = await updateRestaurantOwnerService(id, restaurantOwner);
        if (!res) return c.text("RestaurantOwner not updated", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete restaurantOwner
export const deleteRestaurantOwnerController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!restaurantOwner) return c.text("RestaurantOwner not found", 404);

        const res = await deleteRestaurantOwnerService(id);
        if (!res) return c.text("RestaurantOwner not deleted", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// restaurantOwner with restaurants
export const getRestaurantOwnerWithRestaurantsController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurantOwner = await getRestaurantOwnerWithRestaurantsService(id);
        if (restaurantOwner == null) {
            return c.text("RestaurantOwner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};