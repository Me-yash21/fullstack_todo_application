import Todo from './todo.model.js'
import ApiError from '../../common/utils/api-error.js'
import mongoose from 'mongoose'

const createTodo = async ({ userId, task, tags = [] }) => {
  const todo = await Todo.create({
    createdBy: userId,
    task,
    tags
  })

  if (!todo)
    throw ApiError.serverError("Internal server Error while creating Todo.")

  return { todo }
}

const toggleIsCompleted = async (userId, todoId) => {
  const todo = await Todo.findById(todoId)

  if (!todo)
    throw ApiError.notFound("Todo not found")

  const userObjectId = new mongoose.Types.ObjectId(userId)

  if (!userObjectId.equals(todo.createdBy))
    throw ApiError.unauthorised("you are not Authorised to update task")

  todo.isCompleted = !todo.isCompleted;
  await todo.save();
}

const getUserTodos = async (userId) => {
  const todos = await Todo.find({ createdBy: userId }).lean();

  return { todos }
}

const updateTodo = async (userId, todoId, { task, tags }) => {
  const todo = await Todo.findById(todoId)

  if (!todo)
    throw ApiError.notFound("Todo not found")

  const userObjectId = new mongoose.Types.ObjectId(userId)

  if (!userObjectId.equals(todo.createdBy))
    throw ApiError.unauthorised("you are not Authorised to Update task")

  // if there is task or task is not undefined
  // then update the task in todo
  if (task) {
    todo.task = task
  }

  // and If tags is not undefined then update the tags.
  if (tags) {
    todo.tags = [... new Set(tags)]
  }

  const updatedTodo = await todo.save();
  const todoResponse = updatedTodo.toObject();

  return { todo: todoResponse }
}

const deleteTodo = async (userId, todoId) => {
  const todo = await Todo.findOneAndDelete({ _id: todoId, createdBy: userId })

  if (!todo)
    throw ApiError.notFound("Todo not found.")

  return { todo }
}

export {
  createTodo,
  toggleIsCompleted,
  getUserTodos,
  updateTodo,
  deleteTodo
}