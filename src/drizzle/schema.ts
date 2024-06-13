import { integer, pgTable, serial, varchar, text, timestamp, boolean, decimal, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

// 1. State
export const stateTable = pgTable("state", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 255 }).notNull(),
});

// 2. City
export const cityTable = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  state_id: integer("state_id").notNull().references(() => stateTable.id, { onDelete: "cascade" }),
});

// 3. users
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 255 }).notNull(),
  phone_verified: boolean("phone_verified").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  email_verified: boolean("email_verified").notNull(),
  confirmation_code: varchar("confirmation_code", { length: 255 }),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
  updated_at: timestamp("updated_at").default(sql`NOW()`).notNull(),
});

// Role Enum
export const roleEnum = pgEnum("role", ["admin", "user", "both"]);

// AuthOnUsersTable
export const AuthOnUsersTable = pgTable("auth_on_users", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").default("user")
});

// User and Auth relationship
export const AuthOnUsersTableRelations = relations(AuthOnUsersTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [AuthOnUsersTable.user_id],
    references: [usersTable.id],
  }),
}));


// 4. Address
export const addressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 255 }).notNull(),
  street_address_2: varchar("street_address_2", { length: 255 }),
  zip_code: varchar("zip_code", { length: 255 }).notNull(),
  delivery_instructions: text("delivery_instructions"),
  user_id: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  city_id: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
  updated_at: timestamp("updated_at").default(sql`NOW()`).notNull(),
});

// 5. restaurant
export const restaurantTable = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  zip_code: varchar("zip_code", { length: 255 }).notNull(),
  city_id: integer("city_id").notNull().references(() => cityTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
  updated_at: timestamp("updated_at").default(sql`NOW()`).notNull(),
});

// 6. Category
export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

//7.  menu_item
export const menuItemTable = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
  category_id: integer("category_id").notNull().references(() => categoryTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: integer("price").notNull(),
  active: boolean("active").notNull(),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
  updated_at: timestamp("updated_at").default(sql`NOW()`).notNull(),
});

// 8. restaurant Owner
export const restaurantOwnerTable = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
  owner_id: integer("owner_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
});

// 9. Driver
export const driverTable = pgTable("driver", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make", { length: 255 }).notNull(),
  car_model: varchar("car_model", { length: 255 }).notNull(),
  car_year: varchar("car_year", { length: 255 }).notNull(),
  user_id: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  online: boolean("online").notNull(),
  delivering: boolean("delivering").notNull(),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
  updated_at: timestamp("updated_at").default(sql`NOW()`).notNull(),
});

//10.  orders
export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").notNull().references(() => restaurantTable.id, { onDelete: "cascade" }),
  estimated_delivery_time: timestamp("estimated_delivery_time").notNull(),
  actual_delivery_time: timestamp("actual_delivery_time"),
  delivery_address_id: integer("delivery_address_id").notNull().references(() => addressTable.id, { onDelete: "cascade" }),
  user_id: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  driver_id: integer("driver_id").references(() => driverTable.id, { onDelete: "cascade", }),
  price: decimal("price").notNull(),
  discount: decimal("discount"),
  final_price: decimal("final_price").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
  updated_at: timestamp("updated_at").default(sql`NOW()`).notNull(),
});

// 11. Order Menu Item
export const orderMenuItemTable = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  menu_item_id: integer("menu_item_id").notNull().references(() => menuItemTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  item_price: decimal("item_price").notNull(),
  price: decimal("price").notNull(),
  comment: text("comment"),
});

// 12. Status Catalog
export const statusCatalogTable = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
});


// 13. Order Status
export const orderStatusTable = pgTable("order_status", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  status_catalog_id: integer("status_catalog_id").notNull().references(() => statusCatalogTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
});

// 14. Comments
export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").notNull().references(() => ordersTable.id, { onDelete: "cascade" }),
  user_id: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  comment_text: text("comment_text").notNull(),
  is_complaint: boolean("is_complaint").notNull(),
  is_praise: boolean("is_praise").notNull(),
  created_at: timestamp("created_at").default(sql`NOW()`).notNull(),
  updated_at: timestamp("updated_at").default(sql`NOW()`).notNull(),
});


//===========================================// new relationships //===========================================//

// orderRelationships
export const orderRelationships = relations(ordersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [ordersTable.user_id],
    references: [usersTable.id],
  }),
  driver: one(driverTable, {
    fields: [ordersTable.driver_id],
    references: [driverTable.id],
  }),
  restaurant: one(restaurantTable, {
    fields: [ordersTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  delivery_address: one(addressTable, {
    fields: [ordersTable.delivery_address_id],
    references: [addressTable.id],
  }),
  order_status: many(orderStatusTable),
  order_menu_items: many(orderMenuItemTable),
  menuItem: many(menuItemTable),
})
);

// restorant relationships
export const restaurantRelationships = relations(restaurantTable, ({ one, many }) => ({
  city: one(cityTable, {
    fields: [restaurantTable.city_id],
    references: [cityTable.id],
  }),
  orders: many(ordersTable),
  menuItem: many(menuItemTable),
  restaurantOnwer: many(restaurantOwnerTable),

}));

// users relationship
export const usersRelationships = relations(usersTable, ({ many }) => ({
  address: many(addressTable),
  orders: many(ordersTable),
  comments: many(commentsTable),
  auth: many(AuthOnUsersTable),
}));

// driver relationships
export const driverRelationships = relations(driverTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [driverTable.user_id],
    references: [usersTable.id],
  }),
  orders: many(ordersTable),
}));

// menuItem relationships
export const menuItemRelationships = relations(menuItemTable, ({ one, many }) => ({
  restaurant: one(restaurantTable, {
    fields: [menuItemTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  category: one(categoryTable, {
    fields: [menuItemTable.category_id],
    references: [categoryTable.id],
  }),
  order_menu_items: many(orderMenuItemTable),
}));

// category relationships
export const categoryRelationships = relations(categoryTable, ({ many }) => ({
  menuItem: many(menuItemTable),
}));

// orderMenuItem relationships
export const orderMenuItemRelationships = relations(orderMenuItemTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderMenuItemTable.order_id],
    references: [ordersTable.id],
  }),
  menuItem: one(menuItemTable, {
    fields: [orderMenuItemTable.menu_item_id],
    references: [menuItemTable.id],
  }),
}));

// order status relationships
export const orderStatusRelationships = relations(orderStatusTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderStatusTable.order_id],
    references: [ordersTable.id],
  }),
  statusCatalog: one(statusCatalogTable, {
    fields: [orderStatusTable.status_catalog_id],
    references: [statusCatalogTable.id],
  }),
}));

// status catalog relationships
export const statusCatalogRelationships = relations(statusCatalogTable, ({ many }) => ({
  orderStatus: many(orderStatusTable),
}));

// comments relationships
export const commentsRelationships = relations(commentsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [commentsTable.order_id],
    references: [ordersTable.id],
  }),
  user: one(usersTable, {
    fields: [commentsTable.user_id],
    references: [usersTable.id],
  }),
}));

// state relationships
export const stateRelationships = relations(stateTable, ({ many }) => ({
  city: many(cityTable),
}));

// city relationships
export const cityRelationships = relations(cityTable, ({ one, many }) => ({
  state: one(stateTable, {
    fields: [cityTable.state_id],
    references: [stateTable.id],
  }),
  address: many(addressTable),
  restaurant: many(restaurantTable),
}));

// address relationships
export const addressRelationships = relations(addressTable, ({ one, many }) => ({
  city: one(cityTable, {
    fields: [addressTable.city_id],
    references: [cityTable.id],
  }),
  user: one(usersTable, {
    fields: [addressTable.user_id],
    references: [usersTable.id],
  }),
  orders: many(ordersTable),
}));

// restaurant owner relationships
export const restaurantOwnerRelationships = relations(restaurantOwnerTable, ({ one }) => ({
  restaurant: one(restaurantTable, {
    fields: [restaurantOwnerTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  owner: one(usersTable, {
    fields: [restaurantOwnerTable.owner_id],
    references: [usersTable.id],
  }),
}));


// State table
export type TIState = typeof stateTable.$inferInsert;
export type TSState = typeof stateTable.$inferSelect;

// City table
export type TICity = typeof cityTable.$inferInsert;
export type TSCity = typeof cityTable.$inferSelect;

// Address table
export type TIAddress = typeof addressTable.$inferInsert;
export type TSAddress = typeof addressTable.$inferSelect;

// Restaurant table
export type TIRestaurant = typeof restaurantTable.$inferInsert;
export type TSRestaurant = typeof restaurantTable.$inferSelect;

// MenuItem table
export type TIMenuItem = typeof menuItemTable.$inferInsert;
export type TSMenuItem = typeof menuItemTable.$inferSelect;

// Category table
export type TICategory = typeof categoryTable.$inferInsert;
export type TSCategory = typeof categoryTable.$inferSelect;

// Users table
export type TIUsers = typeof usersTable.$inferInsert;
export type TSUsers = typeof usersTable.$inferSelect;

// AuthOnUsersTable
export type TIAuthOnUsers = typeof AuthOnUsersTable.$inferInsert;
export type TSAuthOnUsers = typeof AuthOnUsersTable.$inferSelect;

// RestaurantOwner table
export type TIRestaurantOwner = typeof restaurantOwnerTable.$inferInsert;
export type TSRestaurantOwner = typeof restaurantOwnerTable.$inferSelect;

// Orders table
export type TIOrders = typeof ordersTable.$inferInsert;
export type TSOrders = typeof ordersTable.$inferSelect;

// Driver table
export type TIDriver = typeof driverTable.$inferInsert;
export type TSDriver = typeof driverTable.$inferSelect;

// OrderMenuItem table
export type TIOrderMenuItem = typeof orderMenuItemTable.$inferInsert;
export type TSOrderMenuItem = typeof orderMenuItemTable.$inferSelect;

// OrderStatus table
export type TIOrderStatus = typeof orderStatusTable.$inferInsert;
export type TSOrderStatus = typeof orderStatusTable.$inferSelect;

// StatusCatalog table
export type TIStatusCatalog = typeof statusCatalogTable.$inferInsert;
export type TSStatusCatalog = typeof statusCatalogTable.$inferSelect;

// Comments table
export type TIComments = typeof commentsTable.$inferInsert;
export type TSComments = typeof commentsTable.$inferSelect;
