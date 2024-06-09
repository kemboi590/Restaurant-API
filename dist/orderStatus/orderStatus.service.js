"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusService = exports.updateOrderStatusService = exports.createOrderStatusService = exports.getOrderStatusByIdService = exports.getOrderStatusService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL ORDERSTATUS
const getOrderStatusService = async () => {
    const orderStatus = await db_1.default.query.orderStatusTable.findMany();
    return orderStatus;
};
exports.getOrderStatusService = getOrderStatusService;
// GET ORDERSTATUS BY ID
const getOrderStatusByIdService = async (id) => {
    const orderStatus = await db_1.default.query.orderStatusTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orderStatusTable.id, id)
    });
    return orderStatus;
};
exports.getOrderStatusByIdService = getOrderStatusByIdService;
// CREATE ORDERSTATUS   
const createOrderStatusService = async (orderStatus) => {
    await db_1.default.insert(schema_1.orderStatusTable).values(orderStatus);
    return "orderStatus created successfully";
};
exports.createOrderStatusService = createOrderStatusService;
//  UPDATE ORDERSTATUS
const updateOrderStatusService = async (id, orderStatus) => {
    await db_1.default.update(schema_1.orderStatusTable).set(orderStatus).where((0, drizzle_orm_1.eq)(schema_1.orderStatusTable.id, id));
    return "orderStatus updated successfully";
};
exports.updateOrderStatusService = updateOrderStatusService;
// DELETE ORDERSTATUS
const deleteOrderStatusService = async (id) => {
    await db_1.default.delete(schema_1.orderStatusTable).where((0, drizzle_orm_1.eq)(schema_1.orderStatusTable.id, id));
    return "orderStatus deleted successfully";
};
exports.deleteOrderStatusService = deleteOrderStatusService;
