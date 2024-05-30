import express from 'express'
import routes from './routes/index'

const app = express()
app.use(express.json())
app.use(routes)

import dotenv from "dotenv"
dotenv.config()

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


