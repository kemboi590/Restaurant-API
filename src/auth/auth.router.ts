import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { registerUserSchema, loginUserSchema } from '../validators'
import { registerUserController, loginUserController } from './auth.controller'

export const authRouter = new Hono()

authRouter.post('register', zValidator('json', registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerUserController)

authRouter.post('login', zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUserController)