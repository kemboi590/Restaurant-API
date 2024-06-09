"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driversRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const drivers_controller_1 = require("./drivers.controller");
const validators_1 = require("../validators");
exports.driversRouter = new hono_1.Hono();
// get all drivers
exports.driversRouter
    .get("drivers", drivers_controller_1.getDriversController)
    .post("drivers", (0, zod_validator_1.zValidator)('json', validators_1.driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), drivers_controller_1.createDriverController);
// get driver by id
exports.driversRouter
    .get("drivers/:id", drivers_controller_1.getDriverByIdController)
    .put("drivers/:id", (0, zod_validator_1.zValidator)('json', validators_1.driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), drivers_controller_1.updateDriverController)
    .delete("drivers/:id", drivers_controller_1.deleteDriverController);
