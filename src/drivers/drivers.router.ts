import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getDriversController, getDriverByIdController, createDriverController, updateDriverController, deleteDriverController } from './drivers.controller';
import { driverSchema } from "../validators";

export const driversRouter = new Hono()

// get all drivers
driversRouter
    .get("drivers", getDriversController)
    .post("drivers", zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createDriverController)

// get driver by id

driversRouter
    .get("drivers/:id", getDriverByIdController)
    .put("drivers/:id", zValidator('json', driverSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateDriverController)
    .delete("drivers/:id", deleteDriverController)