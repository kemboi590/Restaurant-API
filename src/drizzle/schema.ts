import { desc } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
// Restorant

//1.  state
export const stateTable = pgTable("state", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
});

// 2. city
export const cityTable = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  state_id: integer("state_id")
    .notNull()
    .references(() => stateTable.id, { onDelete: "cascade" }),
  address: varchar("address", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  restorant: varchar("restorant", { length: 255 }).notNull(),
});

// 3. address
export const addressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 255 }).notNull(),
  street_address_2: varchar("street_address_2", { length: 255 }),
  zip_code: varchar("zip_code", { length: 255 }).notNull(),
  delivery_instructions: text("delivery_instructions"),
  user_id: integer("user_id").notNull(),
  city_id: integer("city_id")
    .notNull()
    .references(() => cityTable.state_id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  users: varchar("users", { length: 255 }).notNull(),
  orders: varchar("orders", { length: 255 }).notNull(),
});

//4.  restorant
export const restorantTable = pgTable("restorant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  street_address: varchar("street_address", { length: 255 }).notNull(),
  zip_code: varchar("zip_code", { length: 255 }).notNull(),
  city_id: integer("city_id")
    .notNull()
    .references(() => cityTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  menu_item: varchar("menu_item", { length: 255 }).notNull(),
  orders: varchar("orders", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  restorant_owner: varchar("restorant_owner", { length: 255 }).notNull(),
});

//5.  menu_item
export const menuItemTable = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  restorant_id: integer("restorant_id")
    .notNull()
    .references(() => restorantTable.id, { onDelete: "cascade" }),
  category_id: integer("category_id")
    .notNull()
    .references(() => categoryTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: integer("price").notNull(),
  active: boolean("active").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  category: varchar("category", { length: 255 }).notNull(), //go back
  restorant: varchar("restorant", { length: 255 }).notNull(),
  order_menu_item: varchar("order_menu_item", { length: 255 }).notNull(),
});

// 6. category
export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  menu_item: varchar("menu_item", { length: 255 }).notNull(),
});

// 7. users
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contact_phone: varchar("contact_phone", { length: 255 }).notNull(),
  phone_verified: boolean("phone_verified").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  email_verified: boolean("email_verified").notNull(),
  confirmation_code: varchar("confirmation_code", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  comment: varchar("comment", { length: 255 }).notNull(),
  driver: varchar("driver", { length: 255 }).notNull(),
  orders: varchar("orders", { length: 255 }).notNull(),
  restorant_owner: varchar("restorant_owner", { length: 255 }).notNull(),
});

//8. restotant_owner
export const restorantOwnerTable = pgTable("restorant_owner", {
  id: serial("id").primaryKey(),
  restorant_id: integer("restorant_id")
    .notNull()
    .references(() => restorantTable.id, { onDelete: "cascade" }),
  owner_id: integer("owner_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  users: varchar("users", { length: 255 }).notNull(),
  restorant: varchar("restorant", { length: 255 }).notNull(),
});

//9.  orders
export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  restorant_id: integer("restorant_id")
    .notNull()
    .references(() => restorantTable.id, { onDelete: "cascade" }),
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
  discount: decimal("discount").notNull(),
  final_price: decimal("final_price").notNull(),
  comment: varchar("comment", { length: 255 }),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  comments: varchar("comments", { length: 255 }).notNull(),
  order_menu_item: varchar("order_menu_item", { length: 255 }).notNull(),
  order_status: varchar("order_status", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  driver: varchar("driver", { length: 255 }),
  restorant: varchar("restorant", { length: 255 }).notNull(),
  users: varchar("users", { length: 255 }).notNull(),
});

//10.  driver
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
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  users: varchar("users", { length: 255 }).notNull(),
  orders: varchar("orders", { length: 255 }).notNull(),
});

//11.  order_menu_item
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
  comment: varchar("comment", { length: 255 }),
  menu_item: varchar("menu_item", { length: 255 }).notNull(),
  orders: varchar("orders", { length: 255 }).notNull(),
});

// 12 order status
export const orderStatusTable = pgTable("order_status", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  status_catalog_id: integer("status_catalog_id")
    .notNull()
    .references(() => statusCatalogTable.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").notNull(),
  oders: varchar("oders", { length: 255 }).notNull(),
  status_catalog: varchar("status_catalog", { length: 255 }).notNull(),
});

// 13. status_catalog
export const statusCatalogTable = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  order_status: varchar("order_status", { length: 255 }).notNull(),
});

// 14. comments
export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id, { onDelete: "cascade" }),
  user_id: integer("user_id")
    .notNull()
    .references(() => addressTable.user_id, { onDelete: "cascade" }),
  comment_text: text("comment_text").notNull(),
  is_complaint: boolean("is_complaint").notNull(),
  is_praise: boolean("is_praise").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  orders: varchar("orders", { length: 255 }).notNull(),
  users: varchar("users", { length: 255 }).notNull(),
});

