"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogController = exports.updateStatusCatalogController = exports.createStatusCatalogController = exports.getStatusCatalogByIdController = exports.getStatusCatalogController = void 0;
const statusCatalog_service_1 = require("./statusCatalog.service");
// get all status catalog
const getStatusCatalogController = async (c) => {
    try {
        const statusCatalog = await (0, statusCatalog_service_1.getStatusCatalogService)();
        if (statusCatalog == null || statusCatalog.length == 0) {
            return c.text("No status catalog found", 404);
        }
        return c.json(statusCatalog, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStatusCatalogController = getStatusCatalogController;
// get status catalog by id
const getStatusCatalogByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const statusCatalog = await (0, statusCatalog_service_1.getStatusCatalogByIdService)(id);
        if (statusCatalog == null) {
            return c.text("Status catalog not found", 404);
        }
        return c.json(statusCatalog, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStatusCatalogByIdController = getStatusCatalogByIdController;
// create status catalog    
const createStatusCatalogController = async (c) => {
    try {
        const statusCatalog = await c.req.json();
        const newStatusCatalog = await (0, statusCatalog_service_1.createStatusCatalogService)(statusCatalog);
        if (!newStatusCatalog)
            return c.text("Status catalog not created", 400);
        return c.json({ message: newStatusCatalog }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createStatusCatalogController = createStatusCatalogController;
// update status catalog
const updateStatusCatalogController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const statusCatalog = await c.req.json();
        const updatedStatusCatalog = await (0, statusCatalog_service_1.getStatusCatalogByIdService)(id);
        if (!updatedStatusCatalog)
            return c.text("Status catalog not found", 404);
        // get data to update
        const res = await (0, statusCatalog_service_1.updateStatusCatalogService)(id, statusCatalog);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateStatusCatalogController = updateStatusCatalogController;
// delete status catalog
const deleteStatusCatalogController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const statusCatalog = await (0, statusCatalog_service_1.getStatusCatalogByIdService)(id);
        if (!statusCatalog)
            return c.text("Status catalog not found", 404);
        const res = await (0, statusCatalog_service_1.deleteStatusCatalogService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteStatusCatalogController = deleteStatusCatalogController;
