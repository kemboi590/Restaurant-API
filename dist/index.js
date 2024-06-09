"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const timeout_1 = require("hono/timeout");
const http_exception_1 = require("hono/http-exception");
// all routers
const states_router_1 = require("./states/states.router");
const cities_router_1 = require("./cities/cities.router");
const addressesrouter_1 = require("./addresses/addressesrouter");
const restaurant_router_1 = require("./restaurant/restaurant.router");
const users_router_1 = require("./users/users.router");
const categories_router_1 = require("./categories/categories.router");
const menu_router_1 = require("./menu/menu.router");
const restaurantOwner_router_1 = require("./restaurantOwner/restaurantOwner.router");
const drivers_router_1 = require("./drivers/drivers.router");
const orders_router_1 = require("./orders/orders.router");
const orderMenuItems_router_1 = require("./orderMenuItems/orderMenuItems.router");
const statusCatalog_router_1 = require("./statusCatalog/statusCatalog.router");
const orderStatus_router_1 = require("./orderStatus/orderStatus.router");
const comments_router_1 = require("./comments/comments.router");
const app = new hono_1.Hono().basePath('/api/v1');
// custom factory method
const customTimeException = () => new http_exception_1.HTTPException(408, {
    message: "Request timeout after waiting for more than 10 seconds",
});
// inbuilt middlewares
app.use((0, logger_1.logger)());
app.use((0, csrf_1.csrf)());
app.use((0, trailing_slash_1.trimTrailingSlash)());
app.use("time", (0, timeout_1.timeout)(10000, customTimeException));
// default test route
app.get('/', (c) => {
    return c.text('The server is running📢!');
});
// state route
app.route('/', states_router_1.stateRouter);
// cities route
app.route('/', cities_router_1.cityRouter);
// addresses route
app.route('/', addressesrouter_1.addressesRouter);
// restaurant route
app.route('/', restaurant_router_1.restaurantRouter);
// users route
app.route('/', users_router_1.userRouter);
// categories route
app.route('/', categories_router_1.categoriesRouter);
// menu route
app.route('/', menu_router_1.menuRouter);
// restaurant owner route
app.route('/', restaurantOwner_router_1.restaurantOwnerRouter);
// drivers route
app.route('/', drivers_router_1.driversRouter);
// orders route
app.route('/', orders_router_1.ordersRouter);
// order menu items route
app.route('/', orderMenuItems_router_1.orderMenuItemsRouter);
// status catalog route
app.route('/', statusCatalog_router_1.statusCatalogRouter);
// order status route
app.route('/', orderStatus_router_1.orderStatusRouter);
// comments route
app.route('/', comments_router_1.commentsRouter);
app.get('time', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return c.text("Request completed");
});
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
console.log(`Server is running on port ${process.env.PORT}`);
