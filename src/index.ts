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
import { restaurantRouter } from './restaurant/restaurant.router'
import { userRouter } from './users/users.router'
import { categoriesRouter } from './categories/categories.router'
import { menuRouter } from './menu/menu.router'
import { restaurantOwnerRouter } from './restaurantOwner/restaurantOwner.router'
import { driversRouter } from './drivers/drivers.router'
import { ordersRouter } from './orders/orders.router'
import { orderMenuItemsRouter } from './orderMenuItems/orderMenuItems.router'
import { statusCatalogRouter } from './statusCatalog/statusCatalog.router'
import { orderStatusRouter } from './orderStatus/orderStatus.router'
import { commentsRouter } from './comments/comments.router'
import { authRouter } from './auth/auth.router'
import { readFile } from 'fs'

const app = new Hono()

// custom factory method
const customTimeException = () =>
  new HTTPException(408, {
    message: "Request timeout after waiting for more than 10 seconds",
  })

// inbuilt middlewares
app.use(logger())
app.use(csrf())
app.use(trimTrailingSlash())
app.use("time", timeout(10000, customTimeException))


// state route
app.route('/', stateRouter)
// cities route
app.route('/', cityRouter)
// addresses route
app.route('/', addressesRouter)
// restaurant route
app.route('/', restaurantRouter)
// users route
app.route('/', userRouter)
// categories route
app.route('/', categoriesRouter)
// menu route
app.route('/', menuRouter)
// restaurant owner route
app.route('/', restaurantOwnerRouter)
// drivers route
app.route('/', driversRouter)
// orders route
app.route('/', ordersRouter)
// order menu items route
app.route('/', orderMenuItemsRouter)
// status catalog route
app.route('/', statusCatalogRouter)
// order status route
app.route('/', orderStatusRouter)
// comments route
app.route('/', commentsRouter)
// auth route
app.route('/auth', authRouter) // /api/v1/auth/register

app.get('time', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return c.text("Request completed")
})


// default test route
import { readFileSync } from 'fs';

app.get('/', async (c) => {
  try {
    let html = readFileSync('./index.html', 'utf-8');
    return c.html(html);

  } catch (error: any) {
    return c.json({ error: error.message, status: 500 });

  }
})

serve({
  fetch: app.fetch,
  port: 8000
})

console.log(`Server is running on port 8000📢 !`)
