"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderService = exports.updateOrderService = exports.createOrderService = exports.getOrderByIdService = exports.getOrdersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL ORDERS
const getOrdersService = async () => {
    const orders = await db_1.default.query.ordersTable.findMany();
    return orders;
};
exports.getOrdersService = getOrdersService;
// GET ORDER BY ID
const getOrderByIdService = async (id) => {
    const order = await db_1.default.query.ordersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.ordersTable.id, id)
    });
    return order;
};
exports.getOrderByIdService = getOrderByIdService;
// CREATE ORDER
const createOrderService = async (order) => {
    await db_1.default.insert(schema_1.ordersTable).values(order);
    return "order created successfully";
};
exports.createOrderService = createOrderService;
//  UPDATE ORDER
const updateOrderService = async (id, order) => {
    await db_1.default.update(schema_1.ordersTable).set(order).where((0, drizzle_orm_1.eq)(schema_1.ordersTable.id, id));
    return "order updated successfully";
};
exports.updateOrderService = updateOrderService;
// DELETE ORDER
const deleteOrderService = async (id) => {
    await db_1.default.delete(schema_1.ordersTable).where((0, drizzle_orm_1.eq)(schema_1.ordersTable.id, id));
    return "order deleted successfully";
};
exports.deleteOrderService = deleteOrderService;
