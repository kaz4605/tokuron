import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator' 
import { z ,createRoute, OpenAPIHono} from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'


const app = new OpenAPIHono()

app.doc('/doc', {
 info: {
  title:'Tokuron API',
  version: 'v1'
},
openapi:'3.1.0',
})

app.get('/ui',
swaggerUI({
url:'/doc',
})
)

app.notFound((c) => c.text('Custom 404 Message',404))

app.get('/github-models',async(c) => {
  const apiUrl = 'https://models.github.ai/inference/chat/completions'
  const headers = {
    'Authorization': `Bearer ${c.env.GITHUB_TOKEN}`,
    'Content-Type':'application/json'
  }
  const body = JSON.stringify({
    messages:[{role: 'user',content: '生成AIを用いたコーディング手法とは？'}],
    model:'openai/gpt-4.1'
  })
  const response = await fetch(apiUrl, { method: 'POST',headers,body })
    const data = await response.json()
    return c.text(data.choices[0].message.content) 
})


export default app
