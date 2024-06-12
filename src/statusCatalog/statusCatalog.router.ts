import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { getStatusCatalogController, getStatusCatalogByIdController, createStatusCatalogController, updateStatusCatalogController, deleteStatusCatalogController } from './statusCatalog.controller';
import { statusCatalogSchema } from "../validators";
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const statusCatalogRouter = new Hono()

// get all status catalog
statusCatalogRouter
    .get("statusCatalog",adminRoleAuth, getStatusCatalogController)
    .post("statusCatalog", zValidator('json', statusCatalogSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),bothRoleAuth, createStatusCatalogController)

// get status catalog by id
statusCatalogRouter
    .get("statusCatalog/:id",bothRoleAuth, getStatusCatalogByIdController)
    .put("statusCatalog/:id", zValidator('json', statusCatalogSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateStatusCatalogController)
    .delete("statusCatalog/:id",adminRoleAuth, deleteStatusCatalogController)