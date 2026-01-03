import { auth, toNodeHandler } from '@repo/auth'
import { trpcExpress } from '@repo/trpc-server'
import express from 'express'
import cors from 'cors'

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}

const app = express()

app.use(cors(corsOptions))

app.all('/api/auth/*any', toNodeHandler(auth))

app.use(express.json())

app.use('/trpc', trpcExpress)

app.get('/', (req, res) => {
  res.send('Hello world')
  console.log('Hi from root.')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
