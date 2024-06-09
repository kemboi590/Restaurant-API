"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverService = exports.updateDriverService = exports.createDriverService = exports.getDriverByIdService = exports.getDriversService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL DRIVERS
const getDriversService = async () => {
    const drivers = await db_1.default.query.driverTable.findMany();
    return drivers;
};
exports.getDriversService = getDriversService;
// GET DRIVER BY ID
const getDriverByIdService = async (id) => {
    const driver = await db_1.default.query.driverTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.driverTable.id, id)
    });
    return driver;
};
exports.getDriverByIdService = getDriverByIdService;
// CREATE DRIVER
const createDriverService = async (driver) => {
    await db_1.default.insert(schema_1.driverTable).values(driver);
    return "driver created successfully";
};
exports.createDriverService = createDriverService;
//  UPDATE DRIVER
const updateDriverService = async (id, driver) => {
    await db_1.default.update(schema_1.driverTable).set(driver).where((0, drizzle_orm_1.eq)(schema_1.driverTable.id, id));
    return "driver updated successfully";
};
exports.updateDriverService = updateDriverService;
// DELETE DRIVER
const deleteDriverService = async (id) => {
    await db_1.default.delete(schema_1.driverTable).where((0, drizzle_orm_1.eq)(schema_1.driverTable.id, id));
    return "driver deleted successfully";
};
exports.deleteDriverService = deleteDriverService;