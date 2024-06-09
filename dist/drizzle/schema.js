"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCommentRelations = exports.orderCommentsRelations = exports.orderCommentRelations = exports.statusCatalogRelations = exports.orderStatusRelations = exports.orderMenuItemRelations = exports.orderDriverRelations = exports.driverOrderRelations = exports.restaurantOrderRelations = exports.orderRestaurantRelations = exports.orderUserRelations = exports.userOrderRelations = exports.restaurantOwnerRelations = exports.restaurantRelations = exports.cityRestaurantRelations = exports.cityAddressRelations = exports.addressRelations = exports.cityRelations = exports.stateRelations = exports.userAddressRelations = exports.categoryMenuItemsRelations = exports.restaurantMenuItemsRelations = exports.menuItemRelations = exports.commentsTable = exports.orderStatusTable = exports.statusCatalogTable = exports.orderMenuItemTable = exports.ordersTable = exports.driverTable = exports.restaurantOwnerTable = exports.menuItemTable = exports.categoryTable = exports.restaurantTable = exports.addressTable = exports.usersTable = exports.cityTable = exports.stateTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm"); // Import the sql template tag used to write raw SQL queries
const drizzle_orm_2 = require("drizzle-orm");
// 1. State
exports.stateTable = (0, pg_core_1.pgTable)("state", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    code: (0, pg_core_1.varchar)("code", { length: 255 }).notNull(),
});
// 2. City
exports.cityTable = (0, pg_core_1.pgTable)("city", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    state_id: (0, pg_core_1.integer)("state_id")
        .notNull()
        .references(() => exports.stateTable.id, { onDelete: "cascade" }),
});
// 3. users
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 255 }).notNull(),
    phone_verified: (0, pg_core_1.boolean)("phone_verified").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    email_verified: (0, pg_core_1.boolean)("email_verified").notNull(),
    confirmation_code: (0, pg_core_1.varchar)("confirmation_code", { length: 255 }),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
// 4. Address
exports.addressTable = (0, pg_core_1.pgTable)("address", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    street_address_1: (0, pg_core_1.varchar)("street_address_1", { length: 255 }).notNull(),
    street_address_2: (0, pg_core_1.varchar)("street_address_2", { length: 255 }),
    zip_code: (0, pg_core_1.varchar)("zip_code", { length: 255 }).notNull(),
    delivery_instructions: (0, pg_core_1.text)("delivery_instructions"),
    user_id: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    city_id: (0, pg_core_1.integer)("city_id")
        .notNull()
        .references(() => exports.cityTable.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
// 5. restaurant
exports.restaurantTable = (0, pg_core_1.pgTable)("restaurant", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    street_address: (0, pg_core_1.varchar)("street_address", { length: 255 }).notNull(),
    zip_code: (0, pg_core_1.varchar)("zip_code", { length: 255 }).notNull(),
    city_id: (0, pg_core_1.integer)("city_id")
        .notNull()
        .references(() => exports.cityTable.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
// 6. Category
exports.categoryTable = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
});
//7.  menu_item
exports.menuItemTable = (0, pg_core_1.pgTable)("menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id")
        .notNull()
        .references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    category_id: (0, pg_core_1.integer)("category_id")
        .notNull()
        .references(() => exports.categoryTable.id, { onDelete: "cascade" }),
    description: (0, pg_core_1.text)("description").notNull(),
    ingredients: (0, pg_core_1.text)("ingredients").notNull(),
    price: (0, pg_core_1.integer)("price").notNull(),
    active: (0, pg_core_1.boolean)("active").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
// 8. restaurant Owner
exports.restaurantOwnerTable = (0, pg_core_1.pgTable)("restaurant_owner", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id")
        .notNull()
        .references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    owner_id: (0, pg_core_1.integer)("owner_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
});
// 9. Driver
exports.driverTable = (0, pg_core_1.pgTable)("driver", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    car_make: (0, pg_core_1.varchar)("car_make", { length: 255 }).notNull(),
    car_model: (0, pg_core_1.varchar)("car_model", { length: 255 }).notNull(),
    car_year: (0, pg_core_1.varchar)("car_year", { length: 255 }).notNull(),
    user_id: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    online: (0, pg_core_1.boolean)("online").notNull(),
    delivering: (0, pg_core_1.boolean)("delivering").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
//10.  orders
exports.ordersTable = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id")
        .notNull()
        .references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    estimated_delivery_time: (0, pg_core_1.timestamp)("estimated_delivery_time").notNull(),
    actual_delivery_time: (0, pg_core_1.timestamp)("actual_delivery_time"),
    delivery_address: (0, pg_core_1.varchar)("delivery_address", { length: 255 }).notNull(),
    user_id: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    driver_id: (0, pg_core_1.integer)("driver_id").references(() => exports.driverTable.id, {
        onDelete: "cascade",
    }),
    price: (0, pg_core_1.decimal)("price").notNull(),
    discount: (0, pg_core_1.decimal)("discount"),
    final_price: (0, pg_core_1.decimal)("final_price").notNull(),
    comment: (0, pg_core_1.text)("comment"),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
// 11. Order Menu Item
exports.orderMenuItemTable = (0, pg_core_1.pgTable)("order_menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => exports.ordersTable.id, { onDelete: "cascade" }),
    menu_item_id: (0, pg_core_1.integer)("menu_item_id")
        .notNull()
        .references(() => exports.menuItemTable.id, { onDelete: "cascade" }),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    item_price: (0, pg_core_1.decimal)("item_price").notNull(),
    price: (0, pg_core_1.decimal)("price").notNull(),
    comment: (0, pg_core_1.text)("comment"),
});
// 12. Status Catalog
exports.statusCatalogTable = (0, pg_core_1.pgTable)("status_catalog", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
});
// 13. Order Status
exports.orderStatusTable = (0, pg_core_1.pgTable)("order_status", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => exports.ordersTable.id, { onDelete: "cascade" }),
    status_catalog_id: (0, pg_core_1.integer)("status_catalog_id")
        .notNull()
        .references(() => exports.statusCatalogTable.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
// 14. Comments
exports.commentsTable = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => exports.ordersTable.id, { onDelete: "cascade" }),
    user_id: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    comment_text: (0, pg_core_1.text)("comment_text").notNull(),
    is_complaint: (0, pg_core_1.boolean)("is_complaint").notNull(),
    is_praise: (0, pg_core_1.boolean)("is_praise").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
    updated_at: (0, pg_core_1.timestamp)("updated_at")
        .default((0, drizzle_orm_1.sql) `NOW()`)
        .notNull(),
});
//===================================================================================================//
/*
                                            RELATIONSHIPS
*/
//===================================================================================================//
// 5. Restaurant and Menu Item relationship
exports.menuItemRelations = (0, drizzle_orm_2.relations)(exports.menuItemTable, ({ one }) => ({
    restaurant: one(exports.restaurantTable, {
        fields: [exports.menuItemTable.restaurant_id],
        references: [exports.restaurantTable.id],
    }),
    category: one(exports.categoryTable, {
        fields: [exports.menuItemTable.category_id],
        references: [exports.categoryTable.id],
    }),
}));
exports.restaurantMenuItemsRelations = (0, drizzle_orm_2.relations)(exports.restaurantTable, ({ many }) => ({
    menuItems: many(exports.menuItemTable), // one restaurant can have many menu items
}));
// 6. Menu Item and Category relationship
exports.categoryMenuItemsRelations = (0, drizzle_orm_2.relations)(exports.categoryTable, ({ many }) => ({
    menuItems: many(exports.menuItemTable), // one category can have many menu items
}));
// 4. Address and User relationship
exports.userAddressRelations = (0, drizzle_orm_2.relations)(exports.usersTable, ({ many }) => ({
    addresses: many(exports.addressTable), // one user can have many addresses
}));
// 1. State and City relationship
exports.stateRelations = (0, drizzle_orm_2.relations)(exports.stateTable, ({ many }) => ({
    cities: many(exports.cityTable), // one state can have many cities
}));
exports.cityRelations = (0, drizzle_orm_2.relations)(exports.cityTable, ({ one }) => ({
    state: one(exports.stateTable, {
        fields: [exports.cityTable.state_id],
        references: [exports.stateTable.id],
    }),
}));
// 2. City and Address relationship
exports.addressRelations = (0, drizzle_orm_2.relations)(exports.addressTable, ({ one }) => ({
    city: one(exports.cityTable, {
        fields: [exports.addressTable.city_id],
        references: [exports.cityTable.id],
    }),
    user: one(exports.usersTable, {
        fields: [exports.addressTable.user_id],
        references: [exports.usersTable.id],
    }),
}));
exports.cityAddressRelations = (0, drizzle_orm_2.relations)(exports.cityTable, ({ many }) => ({
    addresses: many(exports.addressTable),
}));
// 3. City and Restaurant relationship
exports.cityRestaurantRelations = (0, drizzle_orm_2.relations)(exports.cityTable, ({ many }) => ({
    restaurants: many(exports.restaurantTable), // one city can have many restaurants
}));
exports.restaurantRelations = (0, drizzle_orm_2.relations)(exports.restaurantTable, ({ one }) => ({
    city: one(exports.cityTable, {
        fields: [exports.restaurantTable.city_id],
        references: [exports.cityTable.id],
    }),
}));
// 7. Restaurant and Owner relationship
exports.restaurantOwnerRelations = (0, drizzle_orm_2.relations)(exports.restaurantOwnerTable, ({ one }) => ({
    restaurant: one(exports.restaurantTable, {
        fields: [exports.restaurantOwnerTable.restaurant_id],
        references: [exports.restaurantTable.id],
    }),
    owner: one(exports.usersTable, {
        fields: [exports.restaurantOwnerTable.owner_id],
        references: [exports.usersTable.id],
    }),
}));
// 8. Order and User relationship
exports.userOrderRelations = (0, drizzle_orm_2.relations)(exports.usersTable, ({ many }) => ({
    orders: many(exports.ordersTable), // one user can have many orders
}));
exports.orderUserRelations = (0, drizzle_orm_2.relations)(exports.ordersTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.ordersTable.user_id],
        references: [exports.usersTable.id],
    }),
}));
// 9. Order and Restaurant relationship
exports.orderRestaurantRelations = (0, drizzle_orm_2.relations)(exports.ordersTable, ({ one }) => ({
    restaurant: one(exports.restaurantTable, {
        fields: [exports.ordersTable.restaurant_id],
        references: [exports.restaurantTable.id],
    }),
}));
exports.restaurantOrderRelations = (0, drizzle_orm_2.relations)(exports.restaurantTable, ({ many }) => ({
    orders: many(exports.ordersTable), // one restaurant can have many orders
}));
// 10. Order and Driver relationship
exports.driverOrderRelations = (0, drizzle_orm_2.relations)(exports.driverTable, ({ many }) => ({
    orders: many(exports.ordersTable), // one driver can have many orders
}));
exports.orderDriverRelations = (0, drizzle_orm_2.relations)(exports.ordersTable, ({ one }) => ({
    driver: one(exports.driverTable, {
        fields: [exports.ordersTable.driver_id],
        references: [exports.driverTable.id],
    }),
}));
// 11. Order and Menu Item relationship
exports.orderMenuItemRelations = (0, drizzle_orm_2.relations)(exports.orderMenuItemTable, ({ one }) => ({
    order: one(exports.ordersTable, {
        fields: [exports.orderMenuItemTable.order_id],
        references: [exports.ordersTable.id],
    }),
    menuItem: one(exports.menuItemTable, {
        fields: [exports.orderMenuItemTable.menu_item_id],
        references: [exports.menuItemTable.id],
    }),
}));
// 12. Order and Status relationship
exports.orderStatusRelations = (0, drizzle_orm_2.relations)(exports.orderStatusTable, ({ one }) => ({
    order: one(exports.ordersTable, {
        fields: [exports.orderStatusTable.order_id],
        references: [exports.ordersTable.id],
    }),
    statusCatalog: one(exports.statusCatalogTable, {
        fields: [exports.orderStatusTable.status_catalog_id],
        references: [exports.statusCatalogTable.id],
    }),
}));
// 13. Status and Catalog relationship
exports.statusCatalogRelations = (0, drizzle_orm_2.relations)(exports.statusCatalogTable, ({ many }) => ({
    statuses: many(exports.orderStatusTable), // one status can have many orders
}));
// 14. Order and Comments relationship
exports.orderCommentRelations = (0, drizzle_orm_2.relations)(exports.commentsTable, ({ one }) => ({
    order: one(exports.ordersTable, {
        fields: [exports.commentsTable.order_id],
        references: [exports.ordersTable.id],
    }),
    user: one(exports.usersTable, {
        fields: [exports.commentsTable.user_id],
        references: [exports.usersTable.id],
    }),
}));
exports.orderCommentsRelations = (0, drizzle_orm_2.relations)(exports.ordersTable, ({ many }) => ({
    comments: many(exports.commentsTable), // one order can have many comments
}));
// 15. User and Comments relationship
exports.userCommentRelations = (0, drizzle_orm_2.relations)(exports.usersTable, ({ many }) => ({
    comments: many(exports.commentsTable), // one user can have many comments
}));
