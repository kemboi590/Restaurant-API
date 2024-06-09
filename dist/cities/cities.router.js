"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRouter = void 0;
const hono_1 = require("hono");
const cities_controller_1 = require("./cities.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.cityRouter = new hono_1.Hono();
// get all cities
exports.cityRouter
    .get("cities", cities_controller_1.getCitiesController)
    .post("cities", (0, zod_validator_1.zValidator)('json', validators_1.citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), cities_controller_1.createCityController);
// get city by id
exports.cityRouter
    .get("cities/:id", cities_controller_1.getCityByIdController)
    .put("cities/:id", (0, zod_validator_1.zValidator)('json', validators_1.citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), cities_controller_1.updateCityController)
    .delete("cities/:id", cities_controller_1.deleteCityController);
