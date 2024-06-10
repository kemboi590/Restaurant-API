"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.createAuthUserService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = require("../drizzle/db");
const drizzle_orm_1 = require("drizzle-orm");
const createAuthUserService = async (user) => {
    await db_1.db.insert(schema_1.AuthOnUsersTable).values(user);
    return "User created successfully";
};
exports.createAuthUserService = createAuthUserService;
const userLoginService = async (user) => {
    const { username } = user;
    return await db_1.db.query.AuthOnUsersTable.findFirst({
        columns: {
            username: true,
            password: true,
            role: true,
        }, where: (0, drizzle_orm_1.sql) `${schema_1.AuthOnUsersTable.username} = ${username} `,
        with: {
            user: {
                columns: {
                    name: true,
                    email: true,
                    contact_phone: true,
                }
            }
        }
    });
};
exports.userLoginService = userLoginService;
