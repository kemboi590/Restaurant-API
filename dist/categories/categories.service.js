"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getCategoryByIdService = exports.getCategoriesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET ALL CATEGORIES
const getCategoriesService = async () => {
    const categories = await db_1.db.query.categoryTable.findMany();
    return categories;
};
exports.getCategoriesService = getCategoriesService;
// GET CATEGORY BY ID
const getCategoryByIdService = async (id) => {
    const category = await db_1.db.query.categoryTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.categoryTable.id, id)
    });
    return category;
};
exports.getCategoryByIdService = getCategoryByIdService;
// CREATE CATEGORY
const createCategoryService = async (category) => {
    await db_1.db.insert(schema_1.categoryTable).values(category);
    return "category created successfully";
};
exports.createCategoryService = createCategoryService;
//  UPDATE CATEGORY
const updateCategoryService = async (id, category) => {
    await db_1.db.update(schema_1.categoryTable).set(category).where((0, drizzle_orm_1.eq)(schema_1.categoryTable.id, id));
    return "category updated successfully";
};
exports.updateCategoryService = updateCategoryService;
// DELETE CATEGORY
const deleteCategoryService = async (id) => {
    await db_1.db.delete(schema_1.categoryTable).where((0, drizzle_orm_1.eq)(schema_1.categoryTable.id, id));
    return "category deleted successfully";
};
exports.deleteCategoryService = deleteCategoryService;
