"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityController = exports.updateCityController = exports.createCityController = exports.getCityByIdController = exports.getCitiesController = void 0;
const cities_service_1 = require("./cities.service");
// get all cities
const getCitiesController = async (c) => {
    try {
        const cities = await (0, cities_service_1.getCitiesService)();
        if (cities == null || cities.length == 0) {
            return c.text("No cities found", 404);
        }
        return c.json(cities, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCitiesController = getCitiesController;
// get city by id
const getCityByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const city = await (0, cities_service_1.getCityByIdService)(id);
        if (city == null) {
            return c.text("City not found", 404);
        }
        return c.json(city, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCityByIdController = getCityByIdController;
// create city
const createCityController = async (c) => {
    try {
        const city = await c.req.json();
        const newCity = await (0, cities_service_1.createCityService)(city);
        if (!newCity)
            return c.text("City not created", 400);
        return c.json({ message: newCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCityController = createCityController;
//  update city
const updateCityController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const city = await c.req.json();
        const updatedCity = await (0, cities_service_1.getCityByIdService)(id);
        if (!updatedCity)
            return c.text("City not found", 404);
        // get data to update
        const res = await (0, cities_service_1.updateCityService)(id, city);
        if (!res)
            return c.text("City not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCityController = updateCityController;
// delete city
const deleteCityController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for city by id
        const city = await (0, cities_service_1.getCityByIdService)(id);
        if (!city)
            return c.text("City not found", 404);
        // delete city
        const res = await (0, cities_service_1.deleteCityService)(id);
        if (!res)
            return c.text("City not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCityController = deleteCityController;
