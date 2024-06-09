"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogService = exports.updateStatusCatalogService = exports.createStatusCatalogService = exports.getStatusCatalogByIdService = exports.getStatusCatalogService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET ALL STATUS CATALOG
const getStatusCatalogService = async () => {
    const statusCatalog = await db_1.db.query.statusCatalogTable.findMany();
    return statusCatalog;
};
exports.getStatusCatalogService = getStatusCatalogService;
// GET STATUS CATALOG BY ID
const getStatusCatalogByIdService = async (id) => {
    const statusCatalog = await db_1.db.query.statusCatalogTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.statusCatalogTable.id, id)
    });
    return statusCatalog;
};
exports.getStatusCatalogByIdService = getStatusCatalogByIdService;
// CREATE STATUS CATALOG
const createStatusCatalogService = async (statusCatalog) => {
    await db_1.db.insert(schema_1.statusCatalogTable).values(statusCatalog);
    return "statusCatalog created successfully";
};
exports.createStatusCatalogService = createStatusCatalogService;
//  UPDATE STATUS CATALOG
const updateStatusCatalogService = async (id, statusCatalog) => {
    await db_1.db.update(schema_1.statusCatalogTable).set(statusCatalog).where((0, drizzle_orm_1.eq)(schema_1.statusCatalogTable.id, id));
    return "statusCatalog updated successfully";
};
exports.updateStatusCatalogService = updateStatusCatalogService;
// DELETE STATUS CATALOG
const deleteStatusCatalogService = async (id) => {
    await db_1.db.delete(schema_1.statusCatalogTable).where((0, drizzle_orm_1.eq)(schema_1.statusCatalogTable.id, id));
    return "statusCatalog deleted successfully";
};
exports.deleteStatusCatalogService = deleteStatusCatalogService;
