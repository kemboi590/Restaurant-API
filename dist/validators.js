"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = exports.commentsSchema = exports.orderStatusSchema = exports.statusCatalogSchema = exports.orderItemsSchema = exports.orderSchema = exports.driverSchema = exports.restaurantOwnerSchema = exports.menuItemsSchema = exports.categoriesSchema = exports.userSchema = exports.restaurantSchema = exports.addressSchema = exports.citySchema = exports.stateSchema = void 0;
const zod_1 = require("zod");
exports.stateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    code: zod_1.z.string(),
});
exports.citySchema = zod_1.z.object({
    name: zod_1.z.string(),
    state_id: zod_1.z.number(),
});
exports.addressSchema = zod_1.z.object({
    street_address_1: zod_1.z.string(),
    street_address_2: zod_1.z.string(),
    city_id: zod_1.z.number(),
    zip_code: zod_1.z.string(),
    delivery_instructions: zod_1.z.string(),
    user_id: zod_1.z.number(),
});
exports.restaurantSchema = zod_1.z.object({
    name: zod_1.z.string(),
    street_address: zod_1.z.string(),
    zip_code: zod_1.z.string(),
    city_id: zod_1.z.number()
});
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    phone_verified: zod_1.z.boolean(),
    email: zod_1.z.string(),
    email_verified: zod_1.z.boolean(),
    confirmation_code: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.categoriesSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.menuItemsSchema = zod_1.z.object({
    name: zod_1.z.string(),
    restaurant_id: zod_1.z.number(),
    category_id: zod_1.z.number(),
    description: zod_1.z.string(),
    ingredients: zod_1.z.string(),
    price: zod_1.z.number(),
    active: zod_1.z.boolean()
});
exports.restaurantOwnerSchema = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    owner_id: zod_1.z.number()
});
exports.driverSchema = zod_1.z.object({
    car_make: zod_1.z.string(),
    car_model: zod_1.z.string(),
    car_year: zod_1.z.string(),
    user_id: zod_1.z.number(),
    online: zod_1.z.boolean(),
    delivering: zod_1.z.boolean()
});
exports.orderSchema = zod_1.z.object({
    restaurant_id: zod_1.z.number(),
    estimated_delivery_time: zod_1.z.string(),
    actual_delivery_time: zod_1.z.string(),
    delivery_address: zod_1.z.string(),
    user_id: zod_1.z.number(),
    driver_id: zod_1.z.number(),
    price: zod_1.z.string(),
    discount: zod_1.z.string(),
    final_price: zod_1.z.string(),
    comment: zod_1.z.string()
});
exports.orderItemsSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    menu_item_id: zod_1.z.number(),
    quantity: zod_1.z.number(),
    item_price: zod_1.z.string(),
    price: zod_1.z.string(),
    comment: zod_1.z.string()
});
exports.statusCatalogSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string()
});
exports.orderStatusSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    status_catalog_id: zod_1.z.number()
});
exports.commentsSchema = zod_1.z.object({
    order_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    comment_text: zod_1.z.string(),
    is_complaint: zod_1.z.boolean(),
    is_praise: zod_1.z.boolean()
});
exports.registerUserSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional()
});
exports.loginUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
