import express, { Application } from 'express'
import cors from 'cors'
const app:Application = express()

app.use(cors())

//perser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app