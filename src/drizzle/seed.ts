import db from "./db.ts";
import {
  stateTable,
  cityTable,
  addressTable,
  restaurantTable,
  menuItemTable,
  categoryTable,
  usersTable,
  restaurantOwnerTable,
  ordersTable,
  driverTable,
  orderMenuItemTable,
  orderStatusTable,
  statusCatalogTable,
  commentsTable,
} from "./schema.ts";

const states = [{ name: "Kenya", code: "254" }];

const cities = [
  { name: "Nairobi", state_id: 1 },
  { name: "Mombasa", state_id: 1 },
  { name: "Kisumu", state_id: 1 },
  { name: "Eldoret", state_id: 1 },
];

const addresses = [
  {
    street_address_1: "1234 Main St",
    street_address_2: "Apt 1",
    city_id: 1,
    zip_code: "12345",
    delivery_instructions: "Leave at the front door",
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    street_address_1: "5678 Elm St",
    street_address_2: "Apt 2",
    city_id: 2,
    zip_code: "54321",
    delivery_instructions: "Leave at the back door",
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    street_address_1: "9101 Oak St",
    street_address_2: "Apt 3",
    city_id: 3,
    zip_code: "67890",
    delivery_instructions: "Ring the bell",
    user_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    street_address_1: "1121 Pine St",
    street_address_2: "Apt 4",
    city_id: 4,
    zip_code: "09876",
    delivery_instructions: "Call upon arrival",
    user_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const restaurants = [
  {
    name: "Java",
    street_address: "1234 Main St",
    zip_code: "12345",
    city_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "KFC",
    street_address: "5678 Elm St",
    zip_code: "54321",
    city_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Dominos",
    street_address: "9101 Oak St",
    zip_code: "67890",
    city_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Pizza Inn",
    street_address: "1121 Pine St",
    zip_code: "09876",
    city_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const categories = [
  { name: "Fast Food" },
  { name: "Pizza" },
  { name: "Chinese" },
  { name: "Indian" },
];

const menuItems = [
  {
    name: "Chips",
    restaurant_id: 1,
    category_id: 1,
    description: "Fried potatoes",
    ingredients: "Potatoes, salt, oil",
    price: 100.0,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Burger",
    restaurant_id: 1,
    category_id: 1,
    description: "Bun with meat",
    ingredients: "Bun, meat, lettuce, tomato, cheese",
    price: 200.0,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Pizza",
    restaurant_id: 2,
    category_id: 2,
    description: "Cheese and tomato",
    ingredients: "Dough, tomato sauce, cheese",
    price: 300.0,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Fried Rice",
    restaurant_id: 3,
    category_id: 3,
    description: "Rice with vegetables",
    ingredients: "Rice, vegetables, soy sauce",
    price: 400.0,
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const users = [
  {
    name: "Brian Kemboi",
    contact_phone: "0712345678",
    phone_verified: true,
    email: "kemboi@gmail.com",
    email_verified: true,
    confirmation_code: "1234",
    password: "password1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Tifany Nyawira",
    contact_phone: "0712345678",
    phone_verified: true,
    email: "Nyawira@gmail.com",
    email_verified: true,
    confirmation_code: "1234",
    password: "password2",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Ben Kimani",
    contact_phone: "0712345678",
    phone_verified: true,
    email: "kimani@gmail.com",
    email_verified: true,
    confirmation_code: "1234",
    password: "password3",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Sarah Wanjiru",
    contact_phone: "0712345678",
    phone_verified: true,
    email: "wanjiru@gmail.com",
    email_verified: true,
    confirmation_code: "1234",
    password: "password4",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const restaurantOwners = [
  { restaurant_id: 1, owner_id: 1 },
  { restaurant_id: 2, owner_id: 2 },
  { restaurant_id: 3, owner_id: 3 },
  { restaurant_id: 4, owner_id: 4 },
];

const orders = [
  {
    restaurant_id: 1,
    estimated_delivery_time: new Date(),
    actual_delivery_time: new Date(),
    delivery_address: "1234 Main St",
    user_id: 1,
    driver_id: 1,
    price: "100.00",
    discount: "100.0",
    final_price: "900.0",
    comment: "Good service",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    restaurant_id: 2,
    estimated_delivery_time: new Date(),
    actual_delivery_time: new Date(),
    delivery_address: "5678 Elm St",
    user_id: 2,
    driver_id: 2,
    price: "200.00",
    discount: "200.0",
    final_price: "800.0",
    comment: "Good service",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    restaurant_id: 3,
    estimated_delivery_time: new Date(),
    actual_delivery_time: new Date(),
    delivery_address: "9101 Oak St",
    user_id: 3,
    driver_id: 3,
    price: "300.00",
    discount: "300.0",
    final_price: "700.0",
    comment: "Good service",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    restaurant_id: 4,
    estimated_delivery_time: new Date(),
    actual_delivery_time: new Date(),
    delivery_address: "1121 Pine St",
    user_id: 4,
    driver_id: 4,
    price: "400.00",
    discount: "400.0",
    final_price: "600.0",
    comment: "Good service",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const drivers = [
  {
    car_make: "Toyota",
    car_model: "Corolla",
    car_year: "2015",
    user_id: 1,
    online: true,
    delivering: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    car_make: "Honda",
    car_model: "Civic",
    car_year: "2018",
    user_id: 2,
    online: true,
    delivering: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    car_make: "Nissan",
    car_model: "Altima",
    car_year: "2017",
    user_id: 3,
    online: true,
    delivering: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    car_make: "Ford",
    car_model: "Focus",
    car_year: "2019",
    user_id: 4,
    online: true,
    delivering: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
// To solve the problem, you need to ensure that the price property
// in the orderMenuItems array is of type string instead of number.
const orderMenuItems = [
  {
    order_id: 1,
    menu_item_id: 1,
    quantity: 1,
    item_price: "100.00",
    price: "120.0",
    comment: "Good food",
  },
  {
    order_id: 2,
    menu_item_id: 2,
    quantity: 1,
    item_price: "200.00",
    price: "220.0",
    comment: "Good food",
  },
  {
    order_id: 3,
    menu_item_id: 3,
    quantity: 1,
    item_price: "300.00",
    price: "320.0",
    comment: "Good food",
  },
  {
    order_id: 4,
    menu_item_id: 4,
    quantity: 1,
    item_price: "400.00",
    price: "420.0",
    comment: "Good food",
  },
];

const orderStatus = [
  { order_id: 1, status_catalog_id: 1, timestamp: new Date() },
  { order_id: 1, status_catalog_id: 2, timestamp: new Date() },
  { order_id: 2, status_catalog_id: 1, timestamp: new Date() },
  { order_id: 2, status_catalog_id: 2, timestamp: new Date() },
  { order_id: 3, status_catalog_id: 1, timestamp: new Date() },
  { order_id: 3, status_catalog_id: 2, timestamp: new Date() },
  { order_id: 4, status_catalog_id: 1, timestamp: new Date() },
  { order_id: 4, status_catalog_id: 2, timestamp: new Date() },
];

const statusCatalog = [
  { name: " Order Placed", description: "Order Placed" },
  { name: "Order Confirmed", description: "Order Confirmed" },
  { name: "Order Delivered", description: "Order Delivered" },
  { name: "Order Cancelled", description: "Order Cancelled" },
];

const comments = [
  {
    order_id: 1,
    user_id: 1,
    restaurant_id: 1,
    rating: 4,
    comment_text: "Good food",
    is_complaint: false,
    is_praise: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    order_id: 2,
    user_id: 2,
    restaurant_id: 2,
    rating: 3,
    comment_text: "Good food",
    is_complaint: false,
    is_praise: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    order_id: 3,
    user_id: 3,
    restaurant_id: 3,
    rating: 2,
    comment_text: "Good food",
    is_complaint: false,
    is_praise: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    order_id: 4,
    user_id: 4,
    restaurant_id: 4,
    rating: 1,
    comment_text: "Good food",
    is_complaint: false,
    is_praise: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function seed() {
  // await db.insert(stateTable).values(states);
  // await db.insert(cityTable).values(cities);
  // await db.insert(usersTable).values(users);  // Insert users before addresses
  // await db.insert(addressTable).values(addresses);  // Insert addresses after users
  // await db.insert(restaurantTable).values(restaurants);
  // await db.insert(categoryTable).values(categories);
  // await db.insert(menuItemTable).values(menuItems);
  // await db.insert(restaurantOwnerTable).values(restaurantOwners);
  // await db.insert(driverTable).values(drivers);  // Insert drivers before orders
  // await db.insert(ordersTable).values(orders);  // Insert orders before order_menu_item


  
  // await db.insert(orderMenuItemTable).values(orderMenuItems);  // Insert order_menu_item after orders
  // await db.insert(orderStatusTable).values(orderStatus);
  // await db.insert(statusCatalogTable).values(statusCatalog);
  // await db.insert(commentsTable).values(comments);
}

seed();



