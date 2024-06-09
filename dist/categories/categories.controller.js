"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.createCategoryController = exports.getCategoryByIdController = exports.getCategoriesController = void 0;
const categories_service_1 = require("./categories.service");
// get all categories
const getCategoriesController = async (c) => {
    try {
        const categories = await (0, categories_service_1.getCategoriesService)();
        if (categories == null || categories.length == 0) {
            return c.text("No categories found", 404);
        }
        return c.json(categories, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCategoriesController = getCategoriesController;
// get category by id
const getCategoryByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const category = await (0, categories_service_1.getCategoryByIdService)(id);
        if (category == null) {
            return c.text("Category not found", 404);
        }
        return c.json(category, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCategoryByIdController = getCategoryByIdController;
// create category
const createCategoryController = async (c) => {
    try {
        const category = await c.req.json();
        const newCategory = await (0, categories_service_1.createCategoryService)(category);
        if (!newCategory)
            return c.text("Category not created", 400);
        return c.json({ message: newCategory }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCategoryController = createCategoryController;
//  update category
const updateCategoryController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const category = await c.req.json();
        const updatedCategory = await (0, categories_service_1.getCategoryByIdService)(id);
        if (!updatedCategory)
            return c.text("Category not found", 404);
        // get data to update
        const res = await (0, categories_service_1.updateCategoryService)(id, category);
        if (!res)
            return c.text("Category not updated", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCategoryController = updateCategoryController;
// delete category
const deleteCategoryController = async (c) => {
    // get id from url
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // check if category exists
        const category = await (0, categories_service_1.getCategoryByIdService)(id);
        if (!category)
            return c.text("Category not found", 404);
        // delete category
        const res = await (0, categories_service_1.deleteCategoryService)(id);
        if (!res)
            return c.text("Category not deleted", 400);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCategoryController = deleteCategoryController;
