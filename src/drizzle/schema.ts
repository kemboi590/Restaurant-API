import { integer, pgTable, serial, varchar, text, timestamp, boolean, decimal, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"; // Import the sql template tag used to write raw SQL queries
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
  state_id: integer("state_id")
    .notNull()
    .references(() => stateTable.id, { onDelete: "cascade" }),
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
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
});

// Role Enum
export const roleEnum = pgEnum("role", ["admin", "user", "both"]);

// AuthOnUsersTable
export const AuthOnUsersTable = pgTable("auth_on_users", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
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
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  city_id: integer("city_id")
    .notNull()
    .references(() => cityTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
});

// 5. restaurant
export const restaurantTable = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  zip_code: varchar("zip_code", { length: 255 }).notNull(),
  city_id: integer("city_id")
    .notNull()
    .references(() => cityTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
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
  restaurant_id: integer("restaurant_id")
    .notNull()
    .references(() => restaurantTable.id, { onDelete: "cascade" }),
  category_id: integer("category_id")
    .notNull()
    .references(() => categoryTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: integer("price").notNull(),
  active: boolean("active").notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
});

// 8. restaurant Owner
export const restaurantOwnerTable = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id")
    .notNull()
    .references(() => restaurantTable.id, { onDelete: "cascade" }),
  owner_id: integer("owner_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

// 9. Driver
export const driverTable = pgTable("driver", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make", { length: 255 }).notNull(),
  car_model: varchar("car_model", { length: 255 }).notNull(),
  car_year: varchar("car_year", { length: 255 }).notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  online: boolean("online").notNull(),
  delivering: boolean("delivering").notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
});

//10.  orders
export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id")
    .notNull()
    .references(() => restaurantTable.id, { onDelete: "cascade" }),
  estimated_delivery_time: timestamp("estimated_delivery_time").notNull(),
  actual_delivery_time: timestamp("actual_delivery_time"),
  delivery_address: varchar("delivery_address", { length: 255 }).notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  driver_id: integer("driver_id").references(() => driverTable.id, {
    onDelete: "cascade",
  }),
  price: decimal("price").notNull(),
  discount: decimal("discount"),
  final_price: decimal("final_price").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
});

// 11. Order Menu Item
export const orderMenuItemTable = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  menu_item_id: integer("menu_item_id")
    .notNull()
    .references(() => menuItemTable.id, { onDelete: "cascade" }),
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
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  status_catalog_id: integer("status_catalog_id")
    .notNull()
    .references(() => statusCatalogTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

// 14. Comments
export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  comment_text: text("comment_text").notNull(),
  is_complaint: boolean("is_complaint").notNull(),
  is_praise: boolean("is_praise").notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`NOW()`)
    .notNull(),
});


//===================================================================================================//

/*
                                            RELATIONSHIPS
*/
//===================================================================================================//

// 5. Restaurant and Menu Item relationship
export const menuItemRelations = relations(menuItemTable, ({ one }) => ({  //denotes the relationship between restaurant and menu item
  restaurant: one(restaurantTable, {    // one menu item belongs to one restaurant
    fields: [menuItemTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  category: one(categoryTable, {    // one menu item belongs to one category
    fields: [menuItemTable.category_id],
    references: [categoryTable.id],
  }),
}));

export const restaurantMenuItemsRelations = relations(
  restaurantTable,
  ({ many }) => ({    //denotes the relationship between restaurant and menu item
    menuItems: many(menuItemTable), // one restaurant can have many menu items
  })
);

// 6. Menu Item and Category relationship
export const categoryMenuItemsRelations = relations(
  categoryTable,
  ({ many }) => ({    //denotes the relationship between category and menu item
    menuItems: many(menuItemTable), // one category can have many menu items
  })
);

// 4. Address and User relationship
export const userAddressRelations = relations(usersTable, ({ many }) => ({  //denotes the relationship between user and address
  addresses: many(addressTable), // one user can have many addresses
}));

// 1. State and City relationship
export const stateRelations = relations(stateTable, ({ many }) => ({  //denotes the relationship between state and city
  cities: many(cityTable), // one state can have many cities
}));

export const cityRelations = relations(cityTable, ({ one }) => ({  // denotes the relationship between city and state
  state: one(stateTable, {    // one city belongs to one state
    fields: [cityTable.state_id],
    references: [stateTable.id],
  }),
}));

// 2. City and Address relationship
export const addressRelations = relations(addressTable, ({ one }) => ({  //denotes the relationship between city and address
  city: one(cityTable, {    // one address belongs to one city
    fields: [addressTable.city_id],
    references: [cityTable.id],
  }),
  user: one(usersTable, {    // one address belongs to one user
    fields: [addressTable.user_id],
    references: [usersTable.id],
  }),
}));

export const cityAddressRelations = relations(cityTable, ({ many }) => ({  //denotes the relationship between city and address
  addresses: many(addressTable),

}));

// 3. City and Restaurant relationship
export const cityRestaurantRelations = relations(cityTable, ({ many }) => ({  //denotes the relationship between city and restaurant
  restaurants: many(restaurantTable), // one city can have many restaurants
}));

export const restaurantRelations = relations(restaurantTable, ({ one }) => ({  //denotes the relationship between restaurant and city
  city: one(cityTable, {    // one restaurant belongs to one city
    fields: [restaurantTable.city_id],
    references: [cityTable.id],
  }),
}));

// 7. Restaurant and Owner relationship
export const restaurantOwnerRelations = relations(
  restaurantOwnerTable,
  ({ one }) => ({    //denotes the relationship between restaurant and owner
    restaurant: one(restaurantTable, {      // one owner belongs to one restaurant
      fields: [restaurantOwnerTable.restaurant_id],
      references: [restaurantTable.id],
    }),
    owner: one(usersTable, {      // one owner belongs to one user
      fields: [restaurantOwnerTable.owner_id],
      references: [usersTable.id],
    }),
  })
);


// 8. Order and User relationship
export const userOrderRelations = relations(usersTable, ({ many }) => ({  //denotes the relationship between user and order
  orders: many(ordersTable), // one user can have many orders
}));

export const orderUserRelations = relations(ordersTable, ({ one }) => ({  //denotes the relationship between order and user
  user: one(usersTable, {    // one order belongs to one user
    fields: [ordersTable.user_id],
    references: [usersTable.id],
  }),
}));

// 9. Order and Restaurant relationship
export const orderRestaurantRelations = relations(ordersTable, ({ one }) => ({  //denotes the relationship between order and restaurant
  restaurant: one(restaurantTable, {    // one order belongs to one restaurant
    fields: [ordersTable.restaurant_id],
    references: [restaurantTable.id],
  }),
}));

export const restaurantOrderRelations = relations(
  restaurantTable,
  ({ many }) => ({    // denotes the relationship between restaurant and order
    orders: many(ordersTable), // one restaurant can have many orders
  })
);

// 10. Order and Driver relationship
export const driverOrderRelations = relations(driverTable, ({ many }) => ({  //denotes the relationship between driver and order
  orders: many(ordersTable), // one driver can have many orders
}));

export const orderDriverRelations = relations(ordersTable, ({ one }) => ({  //denotes the relationship between order and driver
  driver: one(driverTable, {    // one order belongs to one driver
    fields: [ordersTable.driver_id],
    references: [driverTable.id],
  }),
}));

// 11. Order and Menu Item relationship
export const orderMenuItemRelations = relations(
  orderMenuItemTable,
  ({ one }) => ({    //denotes the relationship between order and menu item
    order: one(ordersTable, {      // one order belongs to one menu item
      fields: [orderMenuItemTable.order_id],
      references: [ordersTable.id],
    }),
    menuItem: one(menuItemTable, {      // one order belongs to one menu item
      fields: [orderMenuItemTable.menu_item_id],
      references: [menuItemTable.id],
    }),
  })
);

// 12. Order and Status relationship
export const orderStatusRelations = relations(orderStatusTable, ({ one }) => ({  //denotes the relationship between order and status
  order: one(ordersTable, {    // one status belongs to one order
    fields: [orderStatusTable.order_id],
    references: [ordersTable.id],
  }),
  statusCatalog: one(statusCatalogTable, {    // one status belongs to one status catalog
    fields: [orderStatusTable.status_catalog_id],
    references: [statusCatalogTable.id],
  }),
}));


// 13. Status and Catalog relationship
export const statusCatalogRelations = relations(
  statusCatalogTable,
  ({ many }) => ({    //denotes the relationship between status and catalog
    statuses: many(orderStatusTable), // one status can have many orders
  })
);


// 14. Order and Comments relationship
export const orderCommentRelations = relations(commentsTable, ({ one }) => ({  //denotes the relationship between order and comments
  order: one(ordersTable, {    // one comment belongs to one order
    fields: [commentsTable.order_id],
    references: [ordersTable.id],
  }),
  user: one(usersTable, {    // one comment belongs to one user
    fields: [commentsTable.user_id],
    references: [usersTable.id],
  }),
}));

export const orderCommentsRelations = relations(ordersTable, ({ many }) => ({  //denotes the relationship between order and comments
  comments: many(commentsTable), // one order can have many comments
}));

// 15. User and Comments relationship
export const userCommentRelations = relations(usersTable, ({ many }) => ({  //denotes the relationship between user and comments
  comments: many(commentsTable), // one user can have many comments
}));

// =================================================================================================//



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
