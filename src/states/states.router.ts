import { Hono } from 'hono'
import { getStatesController, getStateByIdController, createStateController, updateStateController, deleteStateController } from './states.controller';
import { zValidator } from '@hono/zod-validator';
import { stateSchema } from '../validators';

export const stateRouter = new Hono()

// get all states
stateRouter
    .get("/states", getStatesController)
    .post("states", zValidator('json', stateSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createStateController)

// get state by id
stateRouter
    .get("states/:id", getStateByIdController)
    .put("states/:id", updateStateController)
    .delete("states/:id", deleteStateController)

