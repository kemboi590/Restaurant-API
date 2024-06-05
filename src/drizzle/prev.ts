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

// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle(sql);

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
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    street_address_1: "5678 Elm St",
    street_address_2: "Apt 2",
    city_id: 2,
    zip_code: "54321",
    delivery_instructions: "Leave at the back door",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    street_address_1: "9101 Oak St",
    street_address_2: "Apt 3",
    city_id: 3,
    zip_code: "67890",
    delivery_instructions: "Ring the bell",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    street_address_1: "1121 Pine St",
    street_address_2: "Apt 4",
    city_id: 4,
    zip_code: "09876",
    delivery_instructions: "Call upon arrival",
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
  },
  { name: "KFC", street_address: "5678 Elm St", zip_code: "54321", city_id: 2 },
  {
    name: "Dominos",
    street_address: "9101 Oak St",
    zip_code: "67890",
    city_id: 3,
  },
  {
    name: "Pizza Inn",
    street_address: "1121 Pine St",
    zip_code: "09876",
    city_id: 4,
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
  },
  {
    name: "Tifany Nyawira",
    contact_phone: "0712345678",
    phone_verified: true,
    email: "Nyawira@gmail.com",
    email_verified: true,
    confirmation_code: "1234",
    password: "password2",
  },
  {
    name: "Ben Kimani",
    contact_phone: "0712345678",
    phone_verified: true,
    email: "kimani@gmail.com",
    email_verified: true,
    confirmation_code: "1234",
    password: "password3",
  },
  {
    name: "Sarah Wanjiru",
    contact_phone: "0712345678",
    phone_verified: true,
    email: "wanjiru@gmail.com",
    email_verified: true,
    confirmation_code: "1234",
    password: "password4",
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
    price: 1000.0,
    discount: 100.0,
    final_price: 900.0,
    comment: "Good service",
  },
  {
    restaurant_id: 2,
    estimated_delivery_time: new Date(),
    actual_delivery_time: new Date(),
    delivery_address: "5678 Elm St",
    user_id: 2,
    driver_id: 2,
    price: 2000.0,
    discount: 200.0,
    final_price: 1800.0,
    comment: "Good service",
  },
  {
    restaurant_id: 3,
    estimated_delivery_time: new Date(),
    actual_delivery_time: new Date(),
    delivery_address: "9101 Oak St",
    user_id: 3,
    driver_id: 3,
    price: 3000.0,
    discount: 300.0,
    final_price: 2700.0,
    comment: "Good service",
  },
  {
    restaurant_id: 4,
    estimated_delivery_time: new Date(),
    actual_delivery_time: new Date(),
    delivery_address: "1121 Pine St",
    user_id: 4,
    driver_id: 4,
    price: 4000.0,
    discount: 400.0,
    final_price: 3600.0,
    comment: "Good service",
  },
];

const drivers = [
  {
    car_make: "Toyota",
    car_model: "Corolla",
    car_year: "2010",
    user_id: 1,
    online: true,
    delivering: true,
  },
  {
    car_make: "Toyota",
    car_model: "Corolla",
    car_year: "2023",
    user_id: 2,
    online: true,
    delivering: true,
  },
  {
    car_make: "Toyota",
    car_model: "Corolla",
    car_year: "2014",
    user_id: 3,
    online: true,
    delivering: true,
  },
  {
    car_make: "Toyota",
    car_model: "Corolla",
    car_year: "2020",
    user_id: 4,
    online: true,
    delivering: true,
  },
];

const orderMenuItems = [
  {
    order_id: 1,
    menu_item_id: 1,
    quantity: 1,
    item_price: 100.0,
    price: 100.0,
    comment: "Good",
  },
  {
    order_id: 2,
    menu_item_id: 2,
    quantity: 2,
    item_price: 200.0,
    price: 400.0,
    comment: "Good",
  },
  {
    order_id: 3,
    menu_item_id: 3,
    quantity: 3,
    item_price: 300.0,
    price: 900.0,
    comment: "Good",
  },
  {
    order_id: 4,
    menu_item_id: 4,
    quantity: 4,
    item_price: 400.0,
    price: 1600.0,
    comment: "Good",
  },
];

const statusCatalog = [
  { name: "Pending", description: "Order is pending" },
  { name: "Accepted", description: "Order is accepted" },
  { name: "Delivering", description: "Order is being delivered" },
  { name: "Delivered", description: "Order is delivered" },
];

const orderStatus = [
  { order_id: 1, status_catalog_id: 1 },
  { order_id: 2, status_catalog_id: 2 },
  { order_id: 3, status_catalog_id: 3 },
  { order_id: 4, status_catalog_id: 4 },
];

const comments = [
  {
    order_id: 1,
    user_id: 1,
    comment_text: "Good",
    is_complaint: false,
    is_praise: true,
  },
  {
    order_id: 2,
    user_id: 2,
    comment_text: "Good",
    is_complaint: false,
    is_praise: true,
  },
  {
    order_id: 3,
    user_id: 3,
    comment_text: "Good",
    is_complaint: false,
    is_praise: true,
  },
  {
    order_id: 4,
    user_id: 4,
    comment_text: "Good",
    is_complaint: false,
    is_praise: true,
  },
];

const insertStates = async () => {
  await db.insert(stateTable).values(states);
};

const insertCities = async () => {
  await db.insert(cityTable).values(cities);
};

// const insertAddresses = async () => {
//   await db.insert(addressTable).values(addresses);
// };

const insertRestaurants = async () => {
  await db.insert(restaurantTable).values(restaurants);
};

// const insertMenuItems = async () => {
//   const menuItemsWithPriceAsString = menuItems.map((item) => ({
//     ...item,
//     price: item.price.toString(),
//   }));
//   await db.insert(menuItemTable).values(menuItemsWithPriceAsString);
// };

const insertUsers = async () => {
  await db.insert(usersTable).values(users);
};

const insertOrders = async () => {
  const ordersWithPriceAsString = orders.map((order) => ({
    ...order,
    price: order.price.toString(),
    final_price: order.final_price.toString(),
    discount: order.discount.toString(), // Convert discount to string
  }));
  await db.insert(ordersTable).values(ordersWithPriceAsString);
};

const insertDrivers = async () => {
  await db.insert(driverTable).values(drivers);
};

const insertOrderMenuItems = async () => {
  const orderMenuItemsWithPriceAsString = orderMenuItems.map((item) => ({
    ...item,
    price: item.price.toString(),
    item_price: item.item_price.toString(), // Convert item_price to string
  }));
  await db.insert(orderMenuItemTable).values(orderMenuItemsWithPriceAsString);
};

const insertStatusCatalog = async () => {
  await db.insert(statusCatalogTable).values(statusCatalog);
};

const insertOrderStatus = async () => {
  await db.insert(orderStatusTable).values(orderStatus);
};

const insertComments = async () => {
  await db.insert(commentsTable).values(comments);
};

const seedDatabase = async () => {
  const insertCategories = async () => {
    await db.insert(categoryTable).values(categories);
  };

  await insertStates();
  await insertCities();
  // await insertAddresses();
  await insertRestaurants();
  await insertCategories();
  // await insertMenuItems();
  await insertUsers();
  await insertRestaurants();
  await insertOrders();
  await insertDrivers();
  await insertOrderMenuItems();
  await insertStatusCatalog();
  await insertOrderStatus();
  await insertComments();
};

async function main() {
  try {
    await seedDatabase();
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main();
