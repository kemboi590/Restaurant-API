import { Hono } from 'hono'
import { categoriesSchema } from "../validators";
import { getCategoriesController, getCategoryByIdController,createCategoryController,updateCategoryController,deleteCategoryController   } from './categories.controller';
import { zValidator } from '@hono/zod-validator';

export const categoriesRouter = new Hono()

// get all categories
categoriesRouter
    .get("categories", getCategoriesController)
    .post("categories", zValidator('json', categoriesSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createCategoryController)
    

// get category by id
categoriesRouter
    .get("categories/:id", getCategoryByIdController)
    .put("categories/:id", zValidator('json', categoriesSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateCategoryController)
    .delete("categories/:id", deleteCategoryController)