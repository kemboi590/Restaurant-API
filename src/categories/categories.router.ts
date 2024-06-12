import { Hono } from 'hono'
import { categoriesSchema } from "../validators";
import { getCategoriesController, getCategoryByIdController,createCategoryController,updateCategoryController,deleteCategoryController   } from './categories.controller';
import { zValidator } from '@hono/zod-validator';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';


export const categoriesRouter = new Hono()

// get all categories
categoriesRouter
    .get("categories", bothRoleAuth, getCategoriesController)
    .post("categories", zValidator('json', categoriesSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), adminRoleAuth, createCategoryController)
    

// get category by id
categoriesRouter
    .get("categories/:id",bothRoleAuth, getCategoryByIdController)
    .put("categories/:id", zValidator('json', categoriesSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),adminRoleAuth,  updateCategoryController)
    .delete("categories/:id", adminRoleAuth, deleteCategoryController)