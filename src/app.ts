import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import { UserRouter } from './app/modules/user/user.router'
import { UserService } from './app/modules/user/user.service'

const app: Application = express()
//cors
app.use(cors())
//morgan
app.use(morgan('dev'))

//perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//test
app.use('/api/v1/user', UserRouter)

app.get('/', async (req: Request, res: Response) => {
  await UserService.createUser({
    id: '999',
    password: '4567',
    role: 'admin',
  })
  res.send('Hello World! its working')
})

export default app
