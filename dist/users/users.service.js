"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByIdService = exports.getUsersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET ALL USERS
const getUsersService = async () => {
    const users = await db_1.db.query.usersTable.findMany();
    return users;
};
exports.getUsersService = getUsersService;
// GET USER BY ID
const getUserByIdService = async (id) => {
    const user = await db_1.db.query.usersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.usersTable.id, id)
    });
    return user;
};
exports.getUserByIdService = getUserByIdService;
// CREATE USER
const createUserService = async (user) => {
    await db_1.db.insert(schema_1.usersTable).values(user);
    return "user created successfully";
};
exports.createUserService = createUserService;
//  UPDATE USER
const updateUserService = async (id, user) => {
    await db_1.db.update(schema_1.usersTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
    return "user updated successfully";
};
exports.updateUserService = updateUserService;
// DELETE USER
const deleteUserService = async (id) => {
    await db_1.db.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id));
    return "user deleted successfully";
};
exports.deleteUserService = deleteUserService;
