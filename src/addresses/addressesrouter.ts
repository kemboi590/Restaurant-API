import { Hono } from 'hono'
import { getAddressesController, getAddressByIdController, createAddressController, updateAddressController, deleteAddressController } from "./addresses.controller";
import { addressSchema } from '../validators';
import { zValidator } from '@hono/zod-validator';

export const addressesRouter = new Hono()

// get all addresses
addressesRouter
    .get("addresses", getAddressesController)
    .post("addresses", zValidator('json', addressSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createAddressController)

// get address by id
addressesRouter
    .get("addresses/:id", getAddressByIdController)
    .put("addresses/:id", zValidator('json', addressSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateAddressController)
    .delete("addresses/:id", deleteAddressController)