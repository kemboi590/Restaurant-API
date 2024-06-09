import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TICategory, TSCategory, categoryTable } from "../drizzle/schema";

// GET ALL CATEGORIES
export const getCategoriesService = async (): Promise<TSCategory[] | null> => {
    const categories = await db.query.categoryTable.findMany();
    return categories;
};

// GET CATEGORY BY ID
export const getCategoryByIdService = async (id: number): Promise<TSCategory | undefined> => {
    const category = await db.query.categoryTable.findFirst({
        where: eq(categoryTable.id, id)
    });
    return category;
}

// CREATE CATEGORY
export const createCategoryService = async (category: TICategory) => {
    await db.insert(categoryTable).values(category)
    return "category created successfully";
}

//  UPDATE CATEGORY
export const updateCategoryService = async (id: number, category: TICategory) => {
    await db.update(categoryTable).set(category).where(eq(categoryTable.id, id));
    return "category updated successfully";
}

// DELETE CATEGORY
export const deleteCategoryService = async (id: number) => {
    await db.delete(categoryTable).where(eq(categoryTable.id, id));
    return "category deleted successfully";
}