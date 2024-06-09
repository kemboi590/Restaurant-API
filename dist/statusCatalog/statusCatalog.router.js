"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCatalogRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const statusCatalog_controller_1 = require("./statusCatalog.controller");
const validators_1 = require("../validators");
exports.statusCatalogRouter = new hono_1.Hono();
// get all status catalog
exports.statusCatalogRouter
    .get("statusCatalog", statusCatalog_controller_1.getStatusCatalogController)
    .post("statusCatalog", (0, zod_validator_1.zValidator)('json', validators_1.statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), statusCatalog_controller_1.createStatusCatalogController);
// get status catalog by id
exports.statusCatalogRouter
    .get("statusCatalog/:id", statusCatalog_controller_1.getStatusCatalogByIdController)
    .put("statusCatalog/:id", (0, zod_validator_1.zValidator)('json', validators_1.statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), statusCatalog_controller_1.updateStatusCatalogController)
    .delete("statusCatalog/:id", statusCatalog_controller_1.deleteStatusCatalogController);
