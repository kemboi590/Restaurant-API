"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverController = exports.updateDriverController = exports.createDriverController = exports.getDriverByIdController = exports.getDriversController = void 0;
const drivers_service_1 = require("./drivers.service");
// get all drivers
const getDriversController = async (c) => {
    try {
        const drivers = await (0, drivers_service_1.getDriversService)();
        if (drivers == null || drivers.length == 0) {
            return c.text("No drivers found", 404);
        }
        return c.json(drivers, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getDriversController = getDriversController;
// get driver by id
const getDriverByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const driver = await (0, drivers_service_1.getDriverByIdService)(id);
        if (driver == null) {
            return c.text("Driver not found", 404);
        }
        return c.json(driver, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getDriverByIdController = getDriverByIdController;
// create driver
const createDriverController = async (c) => {
    try {
        const driver = await c.req.json();
        const newDriver = await (0, drivers_service_1.createDriverService)(driver);
        if (!newDriver)
            return c.text("Driver not created", 400);
        return c.json({ message: newDriver }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createDriverController = createDriverController;
//  update driver
const updateDriverController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const driver = await c.req.json();
        const updatedDriver = await (0, drivers_service_1.getDriverByIdService)(id);
        if (!updatedDriver)
            return c.text("Driver not found", 404);
        // get data to update
        const res = await (0, drivers_service_1.updateDriverService)(id, driver);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateDriverController = updateDriverController;
// delete driver
const deleteDriverController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const driver = await (0, drivers_service_1.getDriverByIdService)(id);
        if (!driver)
            return c.text("Driver not found", 404);
        const res = await (0, drivers_service_1.deleteDriverService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteDriverController = deleteDriverController;
