"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const users_service_1 = require("./users.service");
// get all users
const getUsersController = async (c) => {
    try {
        const users = await (0, users_service_1.getUsersService)();
        if (users == null || users.length == 0) {
            return c.text("No users found", 404);
        }
        return c.json(users, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getUsersController = getUsersController;
// get user by id
const getUserByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const user = await (0, users_service_1.getUserByIdService)(id);
        if (user == null) {
            return c.text("User not found", 404);
        }
        return c.json(user, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getUserByIdController = getUserByIdController;
// create user
const createUserController = async (c) => {
    try {
        const user = await c.req.json();
        const newUser = await (0, users_service_1.createUserService)(user);
        if (!newUser)
            return c.text("User not created", 400);
        return c.json({ message: newUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createUserController = createUserController;
//  update user
const updateUserController = async (c) => {
    try {
        // get id from url
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const user = await c.req.json();
        //    get user by id
        const updatedUser = await (0, users_service_1.getUserByIdService)(id);
        if (!updatedUser)
            return c.text("User not found", 404);
        // get data to update
        const res = await (0, users_service_1.updateUserService)(id, user);
        if (!res)
            return c.text("User not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateUserController = updateUserController;
// delete user
const deleteUserController = async (c) => {
    //  get id from url
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // get user by id
        const user = await (0, users_service_1.getUserByIdService)(id);
        if (!user)
            return c.text("User not found", 404);
        // delete user
        const res = await (0, users_service_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteUserController = deleteUserController;
