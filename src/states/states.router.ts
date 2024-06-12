import { Hono } from 'hono'
import { getStatesController, getStateByIdController, createStateController, updateStateController,
     deleteStateController, getStateWithCitiesController } from './states.controller';
import { zValidator } from '@hono/zod-validator';
import { stateSchema } from '../validators';
import { adminRoleAuth, userRoleAuth, bothRoleAuth } from './../middleware/baerAuth';



export const stateRouter = new Hono()

// get all states
stateRouter
    .get("/states",bothRoleAuth, getStatesController)
    .post("states", zValidator('json', stateSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }),adminRoleAuth, createStateController)

// get state by id
stateRouter
    .get("states/:id",bothRoleAuth, getStateByIdController)
    .put("states/:id", zValidator('json', stateSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateStateController)
    .delete("states/:id",adminRoleAuth, deleteStateController)

// get state with cities
stateRouter
    .get("states/:id/cities",bothRoleAuth, getStateWithCitiesController)
    

