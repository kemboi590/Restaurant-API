import { Hono } from 'hono'
import { getStatesController, getStateByIdController, createStateController, updateStateController, deleteStateController } from './states.controller';
export const stateRouter = new Hono()

// get all states
stateRouter
    .get("states", getStatesController)
    .post("states", createStateController)

// get state by id
stateRouter
    .get("states/:id", getStateByIdController)
    .put("states/:id", updateStateController)
    .delete("states/:id", deleteStateController)

