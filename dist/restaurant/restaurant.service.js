"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantService = exports.updateRestaurantService = exports.createRestaurantService = exports.getRestaurantByIdService = exports.getRestaurantsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET ALL RESTAURANTS
const getRestaurantsService = async () => {
    const restaurants = await db_1.db.query.restaurantTable.findMany();
    return restaurants;
};
exports.getRestaurantsService = getRestaurantsService;
// GET RESTAURANT BY ID
const getRestaurantByIdService = async (id) => {
    const restaurant = await db_1.db.query.restaurantTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurantTable.id, id)
    });
    return restaurant;
};
exports.getRestaurantByIdService = getRestaurantByIdService;
// CREATE RESTAURANT
const createRestaurantService = async (restaurant) => {
    await db_1.db.insert(schema_1.restaurantTable).values(restaurant);
    return "restaurant created successfully";
};
exports.createRestaurantService = createRestaurantService;
//  UPDATE RESTAURANT
const updateRestaurantService = async (id, restaurant) => {
    await db_1.db.update(schema_1.restaurantTable).set(restaurant).where((0, drizzle_orm_1.eq)(schema_1.restaurantTable.id, id));
    return "restaurant updated successfully";
};
exports.updateRestaurantService = updateRestaurantService;
// DELETE RESTAURANT
const deleteRestaurantService = async (id) => {
    await db_1.db.delete(schema_1.restaurantTable).where((0, drizzle_orm_1.eq)(schema_1.restaurantTable.id, id));
    return "restaurant deleted successfully";
};
exports.deleteRestaurantService = deleteRestaurantService;
