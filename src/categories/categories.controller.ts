import { Context } from "hono";
import { getCategoriesService, getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService } from "./categories.service";

// get all categories
export const getCategoriesController = async (c: Context) => {
    try {
        const categories = await getCategoriesService();
        if (categories == null || categories.length == 0) {
            return c.text("No categories found", 404);
        }
        return c.json(categories, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


// get category by id
export const getCategoryByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const category = await getCategoryByIdService(id);
        if (category == null) {
            return c.text("Category not found", 404);
        }
        return c.json(category, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create category
export const createCategoryController = async (c: Context) => {
    try {
        const category = await c.req.json();
        const newCategory = await createCategoryService(category);

        if (!newCategory) return c.text("Category not created", 400);
        return c.json({ message: newCategory }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};


//  update category
export const updateCategoryController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const category = await c.req.json();


        const updatedCategory = await getCategoryByIdService(id);
        if (!updatedCategory) return c.text("Category not found", 404);

        // get data to update
        const res = await updateCategoryService(id, category);
        if (!res) return c.text("Category not updated", 400);
        return c.json({ message: res }, 200);

    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete category
export const deleteCategoryController = async (c: Context) => {
    // get id from url
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // check if category exists
        const category = await getCategoryByIdService(id);
        if (!category) return c.text("Category not found", 404);
        // delete category
        const res = await deleteCategoryService(id);
        if (!res) return c.text("Category not deleted", 400);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};