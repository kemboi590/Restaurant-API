"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateService = exports.updateStateService = exports.createStateService = exports.getStateByIdService = exports.getStatesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// GET STATES
const getStatesService = async () => {
    const states = await db_1.db.query.stateTable.findMany();
    return states;
};
exports.getStatesService = getStatesService;
// GET STATE BY ID
const getStateByIdService = async (id) => {
    const state = await db_1.db.query.stateTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.stateTable.id, id)
    });
    return state;
};
exports.getStateByIdService = getStateByIdService;
// CREATE STATE
const createStateService = async (state) => {
    await db_1.db.insert(schema_1.stateTable).values(state);
    return "state created successfully";
};
exports.createStateService = createStateService;
//  UPDATE STATE
const updateStateService = async (id, state) => {
    await db_1.db.update(schema_1.stateTable).set(state).where((0, drizzle_orm_1.eq)(schema_1.stateTable.id, id));
    return "state updated successfully";
};
exports.updateStateService = updateStateService;
// DELETE STATE
const deleteStateService = async (id) => {
    await db_1.db.delete(schema_1.stateTable).where((0, drizzle_orm_1.eq)(schema_1.stateTable.id, id));
    return "state deleted successfully";
};
exports.deleteStateService = deleteStateService;
