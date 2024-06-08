import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getStatusCatalogController, getStatusCatalogByIdController, createStatusCatalogController, updateStatusCatalogController, deleteStatusCatalogController } from './statusCatalog.controller';
import { statusCatalogSchema } from "../validators";

export const statusCatalogRouter = new Hono()

// get all status catalog
statusCatalogRouter
    .get("statusCatalog", getStatusCatalogController)
    .post("statusCatalog", zValidator('json', statusCatalogSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createStatusCatalogController)

// get status catalog by id
statusCatalogRouter
    .get("statusCatalog/:id", getStatusCatalogByIdController)
    .put("statusCatalog/:id", zValidator('json', statusCatalogSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateStatusCatalogController)
    .delete("statusCatalog/:id", deleteStatusCatalogController)