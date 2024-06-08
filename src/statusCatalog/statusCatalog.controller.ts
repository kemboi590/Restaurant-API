import { Context } from "hono";
import { getStatusCatalogService, getStatusCatalogByIdService, createStatusCatalogService, updateStatusCatalogService, deleteStatusCatalogService } from "./statusCatalog.service";

// get all status catalog
export const getStatusCatalogController = async (c: Context) => {
    try {
        const statusCatalog = await getStatusCatalogService();
        if (statusCatalog == null || statusCatalog.length == 0) {
            return c.text("No status catalog found", 404);
        }
        return c.json(statusCatalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// get status catalog by id
export const getStatusCatalogByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const statusCatalog = await getStatusCatalogByIdService(id);
        if (statusCatalog == null) {
            return c.text("Status catalog not found", 404);
        }
        return c.json(statusCatalog, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// create status catalog    
export const createStatusCatalogController = async (c: Context) => {
    try {
        const statusCatalog = await c.req.json();
        const newStatusCatalog = await createStatusCatalogService(statusCatalog);

        if (!newStatusCatalog) return c.text("Status catalog not created", 400);
        return c.json({ message: newStatusCatalog }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// update status catalog
export const updateStatusCatalogController = async (c: Context) => {
    try {

        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const statusCatalog = await c.req.json();

        const updatedStatusCatalog = await getStatusCatalogByIdService(id);
        if (!updatedStatusCatalog) return c.text("Status catalog not found", 404);

        // get data to update
        const res = await updateStatusCatalogService(id, statusCatalog);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete status catalog
export const deleteStatusCatalogController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);

        const statusCatalog = await getStatusCatalogByIdService(id);
        if (!statusCatalog) return c.text("Status catalog not found", 404);

        const res = await deleteStatusCatalogService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};