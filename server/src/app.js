import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './common/middleware/error-handler.middleware.js'
import authRouter from './module/auth/auth.routes.js'
import todoRouter from './module/todo/todo.routes.js'

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "*",
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todo', todoRouter);

app.use(errorHandler)

export default app