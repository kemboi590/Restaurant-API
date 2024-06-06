import { Hono } from 'hono'
import { getAddressesController, getAddressByIdController, createAddressController, updateAddressController, deleteAddressController } from "./addresses.controller";

export const addressesRouter = new Hono()

// get all addresses
addressesRouter
    .get("addresses", getAddressesController)
    .post("addresses", createAddressController)

// get address by id
addressesRouter
    .get("addresses/:id", getAddressByIdController)
    .put("addresses/:id", updateAddressController)
    .delete("addresses/:id", deleteAddressController)