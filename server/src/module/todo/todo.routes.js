import { CreateTodoDto, UpdateTodoDto } from './dto/index.js'
import { validate } from '../../common/middleware/validate.middleware.js'
import { authenticate } from '../auth/auth.middleware.js'
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getUserTodos,
  toggleIsCompleted
} from './todo.controller.js'
import { Router } from 'express'

const router = Router();

router.get(
  '/user-todos',
  authenticate,
  getUserTodos
)

router.post(
  '/create',
  authenticate,
  validate(CreateTodoDto),
  createTodo
)

router.patch(
  '/toggle-complete/:id',
  authenticate,
  toggleIsCompleted
)

router.route('/:id')
  .put(
    authenticate,
    validate(UpdateTodoDto),
    updateTodo
  )
  .delete(
    authenticate,
    deleteTodo
  )

export default router