import { Hono } from 'hono'
import { getCitiesController, getCityByIdController, createCityController, updateCityController, deleteCityController } from './cities.controller'
import { zValidator } from '@hono/zod-validator';
import { citySchema } from '../validators';
export const cityRouter = new Hono()

// get all cities
cityRouter
    .get("cities", getCitiesController)
    .post("cities", zValidator('json', citySchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createCityController)

// get city by id
cityRouter
    .get("cities/:id", getCityByIdController)
    .put("cities/:id", zValidator('json', citySchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateCityController)
    .delete("cities/:id", deleteCityController)



