"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const hono_1 = require("hono");
const addresses_controller_1 = require("./addresses.controller");
const validators_1 = require("../validators");
const zod_validator_1 = require("@hono/zod-validator");
exports.addressesRouter = new hono_1.Hono();
// get all addresses
exports.addressesRouter
    .get("addresses", addresses_controller_1.getAddressesController)
    .post("addresses", (0, zod_validator_1.zValidator)('json', validators_1.addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addresses_controller_1.createAddressController);
// get address by id
exports.addressesRouter
    .get("addresses/:id", addresses_controller_1.getAddressByIdController)
    .put("addresses/:id", (0, zod_validator_1.zValidator)('json', validators_1.addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), addresses_controller_1.updateAddressController)
    .delete("addresses/:id", addresses_controller_1.deleteAddressController);
