import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api', (c) => {
  const query = c.req.query('name');
  return c.json({message: `Hello ${query}!`})
})

export default app
