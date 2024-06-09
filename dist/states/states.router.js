"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRouter = void 0;
const hono_1 = require("hono");
const states_controller_1 = require("./states.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.stateRouter = new hono_1.Hono();
// get all states
exports.stateRouter
    .get("/states", states_controller_1.getStatesController)
    .post("states", (0, zod_validator_1.zValidator)('json', validators_1.stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), states_controller_1.createStateController);
// get state by id
exports.stateRouter
    .get("states/:id", states_controller_1.getStateByIdController)
    .put("states/:id", (0, zod_validator_1.zValidator)('json', validators_1.stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), states_controller_1.updateStateController)
    .delete("states/:id", states_controller_1.deleteStateController);
