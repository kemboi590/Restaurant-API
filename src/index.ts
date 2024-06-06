import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'


// all routers
import { stateRouter } from './states/states.router'
import { cityRouter } from './cities/cities.router'
import { addressesRouter } from './addresses/addressesrouter'


const app = new Hono()

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })

// inbuilt middlewares
app.use(logger())  //logs request and response to the console
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException))


// default route
app.get('/', (c) => {
  return c.text('The server is running📢!')
})

// state route
app.route('/', stateRouter)
// cities route
app.route('/', cityRouter)
// addresses route
app.route('/', addressesRouter)



app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})


console.log(`Server is running on port ${process.env.PORT}`)
