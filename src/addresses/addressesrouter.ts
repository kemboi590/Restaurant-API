import { Hono } from 'hono'
import { getAddressesController, getAddressByIdController, createAddressController, updateAddressController, deleteAddressController } from "./addresses.controller";
import { addressSchema } from '../validators';
import { zValidator } from '@hono/zod-validator';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const addressesRouter = new Hono()

// get all addresses
addressesRouter
    .get("addresses", bothRoleAuth, getAddressesController)
    .post("addresses", zValidator('json', addressSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, createAddressController)

// get address by id
addressesRouter
    .get("addresses/:id", bothRoleAuth, getAddressByIdController)
    .put("addresses/:id", zValidator('json', addressSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, updateAddressController)
    .delete("addresses/:id", bothRoleAuth, deleteAddressController)