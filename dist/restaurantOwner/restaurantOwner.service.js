"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerService = exports.updateRestaurantOwnerService = exports.createRestaurantOwnerService = exports.getRestaurantOwnerByIdService = exports.getRestaurantOwnersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET ALL RESTAURANTOWNERS
const getRestaurantOwnersService = async () => {
    const restaurantOwners = await db_1.db.query.restaurantOwnerTable.findMany();
    return restaurantOwners;
};
exports.getRestaurantOwnersService = getRestaurantOwnersService;
// GET RESTAURANTOWNER BY ID
const getRestaurantOwnerByIdService = async (id) => {
    const restaurantOwner = await db_1.db.query.restaurantOwnerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.restaurantOwnerTable.id, id)
    });
    return restaurantOwner;
};
exports.getRestaurantOwnerByIdService = getRestaurantOwnerByIdService;
// CREATE RESTAURANTOWNER
const createRestaurantOwnerService = async (restaurantOwner) => {
    await db_1.db.insert(schema_1.restaurantOwnerTable).values(restaurantOwner);
    return "restaurantOwner created successfully";
};
exports.createRestaurantOwnerService = createRestaurantOwnerService;
//  UPDATE RESTAURANTOWNER
const updateRestaurantOwnerService = async (id, restaurantOwner) => {
    await db_1.db.update(schema_1.restaurantOwnerTable).set(restaurantOwner).where((0, drizzle_orm_1.eq)(schema_1.restaurantOwnerTable.id, id));
    return "restaurantOwner updated successfully";
};
exports.updateRestaurantOwnerService = updateRestaurantOwnerService;
// DELETE RESTAURANTOWNER
const deleteRestaurantOwnerService = async (id) => {
    await db_1.db.delete(schema_1.restaurantOwnerTable).where((0, drizzle_orm_1.eq)(schema_1.restaurantOwnerTable.id, id));
    return "restaurantOwner deleted successfully";
};
exports.deleteRestaurantOwnerService = deleteRestaurantOwnerService;
