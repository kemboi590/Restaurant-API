"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressService = exports.updateAddressService = exports.createAddressService = exports.getAddressByIdService = exports.getAddressesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL ADDRESSES
const getAddressesService = async () => {
    const addresses = await db_1.default.query.addressTable.findMany();
    return addresses;
};
exports.getAddressesService = getAddressesService;
// GET ADDRESS BY ID
const getAddressByIdService = async (id) => {
    const address = await db_1.default.query.addressTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.addressTable.id, id)
    });
    return address;
};
exports.getAddressByIdService = getAddressByIdService;
// CREATE ADDRESS
const createAddressService = async (address) => {
    await db_1.default.insert(schema_1.addressTable).values(address);
    return "address created successfully";
};
exports.createAddressService = createAddressService;
//  UPDATE ADDRESS
const updateAddressService = async (id, address) => {
    await db_1.default.update(schema_1.addressTable).set(address).where((0, drizzle_orm_1.eq)(schema_1.addressTable.id, id));
    return "address updated successfully";
};
exports.updateAddressService = updateAddressService;
// DELETE ADDRESS
const deleteAddressService = async (id) => {
    await db_1.default.delete(schema_1.addressTable).where((0, drizzle_orm_1.eq)(schema_1.addressTable.id, id));
    return "address deleted successfully";
};
exports.deleteAddressService = deleteAddressService;
