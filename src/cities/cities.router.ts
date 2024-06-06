import { Hono } from 'hono'
import { getCitiesController, getCityByIdController, createCityController, updateCityController, deleteCityController } from './cities.controller'

export const cityRouter = new Hono()

// get all cities
cityRouter
    .get("cities", getCitiesController)
    .post("cities", createCityController)

// get city by id
cityRouter
    .get("cities/:id", getCityByIdController)
    .put("cities/:id", updateCityController)
    .delete("cities/:id", deleteCityController)



