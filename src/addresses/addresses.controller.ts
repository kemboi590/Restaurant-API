
import { Context } from "hono";
import { getAddressesService, getAddressByIdService, createAddressService, updateAddressService, deleteAddressService } from "./addresses.service";

// get all addresses
export const getAddressesController = async (c: Context) => {
    try {
        const addresses = await getAddressesService();
        if (addresses == null || addresses.length == 0) {
            return c.text("No addresses found", 404);
        }
        return c.json(addresses, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get address by id
export const getAddressByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const address = await getAddressByIdService(id);
        if (address == null) {
            return c.text("Address not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create address
export const createAddressController = async (c: Context) => {
    try {
        const address = await c.req.json();
        const newAddress = await createAddressService(address);

        if (!newAddress) return c.text("Address not created", 400);
        return c.json({ message: newAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update address
export const updateAddressController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const address = await c.req.json();

        // search for user by id
        const updatedAddress = await getAddressByIdService(id);
        if (!updatedAddress === undefined) return c.text("Address not found", 404);

        // get data to update
        const res = await updateAddressService(id, address);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete address

export const deleteAddressController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for address by id
        const address = await getAddressByIdService(id);
        if (!address) return c.text("Address not found", 404);

        // delete address
        const res = await deleteAddressService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};