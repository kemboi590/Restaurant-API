"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const hono_1 = require("hono");
const validators_1 = require("../validators");
const categories_controller_1 = require("./categories.controller");
const zod_validator_1 = require("@hono/zod-validator");
exports.categoriesRouter = new hono_1.Hono();
// get all categories
exports.categoriesRouter
    .get("categories", categories_controller_1.getCategoriesController)
    .post("categories", (0, zod_validator_1.zValidator)('json', validators_1.categoriesSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), categories_controller_1.createCategoryController);
// get category by id
exports.categoriesRouter
    .get("categories/:id", categories_controller_1.getCategoryByIdController)
    .put("categories/:id", (0, zod_validator_1.zValidator)('json', validators_1.categoriesSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), categories_controller_1.updateCategoryController)
    .delete("categories/:id", categories_controller_1.deleteCategoryController);
