import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { zValidator } from '@hono/zod-validator' 
import { z ,createRoute, OpenAPIHono} from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api', (c) => {
  const query = c.req.query('name');
  return c.json({message: `Hello ${query}!`})
})

app.post('/api',
  zValidator('form', z.object({body: z.string()})),
  (c) => {
    const validated = c.req.valid('form')
    return c.text('POST /api')
  }
)
app.notFound((c) => c.text('Custom 404 Message',404))

export default app
