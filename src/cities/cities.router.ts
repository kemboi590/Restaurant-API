import { Hono } from 'hono'
import { getCitiesController, getCityByIdController, createCityController, updateCityController, deleteCityController } from './cities.controller'
import { zValidator } from '@hono/zod-validator';
import { citySchema } from '../validators';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';

export const cityRouter = new Hono()

// get all cities
cityRouter
    .get("cities", bothRoleAuth,getCitiesController)
    .post("cities", zValidator('json', citySchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, createCityController)

// get city by id
cityRouter
    .get("cities/:id", bothRoleAuth, getCityByIdController)
    .put("cities/:id", zValidator('json', citySchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),adminRoleAuth, updateCityController)
    .delete("cities/:id",adminRoleAuth,  deleteCityController)



