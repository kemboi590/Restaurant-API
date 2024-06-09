"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = exports.updateAddressController = exports.createAddressController = exports.getAddressByIdController = exports.getAddressesController = void 0;
const addresses_service_1 = require("./addresses.service");
// get all addresses
const getAddressesController = async (c) => {
    try {
        const addresses = await (0, addresses_service_1.getAddressesService)();
        if (addresses == null || addresses.length == 0) {
            return c.text("No addresses found", 404);
        }
        return c.json(addresses, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAddressesController = getAddressesController;
// get address by id
const getAddressByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await (0, addresses_service_1.getAddressByIdService)(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getAddressByIdController = getAddressByIdController;
// create address
const createAddressController = async (c) => {
    try {
        const address = await c.req.json();
        const newAddress = await (0, addresses_service_1.createAddressService)(address);
        if (!newAddress)
            return c.text("Address not created", 400);
        return c.json({ message: newAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createAddressController = createAddressController;
//  update address
const updateAddressController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const address = await c.req.json();
        // search for user by id
        const updatedAddress = await (0, addresses_service_1.getAddressByIdService)(id);
        if (!updatedAddress === undefined)
            return c.text("Address not found", 404);
        // get data to update
        const res = await (0, addresses_service_1.updateAddressService)(id, address);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateAddressController = updateAddressController;
// delete address
const deleteAddressController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await (0, addresses_service_1.getAddressByIdService)(id);
        if (!address)
            return c.text("Address not found", 404);
        // delete address
        const res = await (0, addresses_service_1.deleteAddressService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteAddressController = deleteAddressController;
