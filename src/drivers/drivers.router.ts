import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import {
    getDriversController, getDriverByIdController, createDriverController,
    updateDriverController, deleteDriverController, getDriverWithOrdersController
} from './drivers.controller';
import { driverSchema } from "../validators";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const driversRouter = new Hono()

// get all drivers
driversRouter
    .get("drivers", adminRoleAuth, getDriversController)
    .post("drivers", zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, createDriverController)

// get driver by id

driversRouter
    .get("drivers/:id", getDriverByIdController)
    .put("drivers/:id", zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), bothRoleAuth, updateDriverController)
    .delete("drivers/:id", adminRoleAuth, deleteDriverController)

// get driver with orders
driversRouter
    .get("drivers/:id/orders", bothRoleAuth, getDriverWithOrdersController)