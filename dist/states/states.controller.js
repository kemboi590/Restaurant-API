"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateController = exports.updateStateController = exports.createStateController = exports.getStateByIdController = exports.getStatesController = void 0;
const states_service_1 = require("./states.service");
const getStatesController = async (c) => {
    try {
        const states = await (0, states_service_1.getStatesService)();
        if (states == null || states.length == 0) {
            return c.text("No states found", 404);
        }
        return c.json(states, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStatesController = getStatesController;
// get state by id
const getStateByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const state = await (0, states_service_1.getStateByIdService)(id);
        if (state == null) {
            return c.text("State not found", 404);
        }
        return c.json(state, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStateByIdController = getStateByIdController;
// create state
const createStateController = async (c) => {
    try {
        const state = await c.req.json();
        const newState = await (0, states_service_1.createStateService)(state);
        if (!newState)
            return c.text("State not created", 400);
        return c.json({ message: newState }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createStateController = createStateController;
//  update state
const updateStateController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const state = await c.req.json();
        // search for user by id
        const updatedState = await (0, states_service_1.getStateByIdService)(id);
        if (!updatedState)
            return c.text("State not found", 404);
        // get data to update
        const res = await (0, states_service_1.updateStateService)(id, state);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateStateController = updateStateController;
// delete state
const deleteStateController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for state by id
        const state = await (0, states_service_1.getStateByIdService)(id);
        if (!state)
            return c.text("State not found", 404);
        // delete state
        const res = await (0, states_service_1.deleteStateService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteStateController = deleteStateController;
