import ApiResponse from '../../common/utils/api-response.js'
import * as todoService from './todo.service.js'

const createTodo = async (req, res) => {
  let { task, tags } = req.body;
  // if tags is null or undefined than assign empty array to it.
  if (!tags) {
    tags = []
  }
  const { todo } = await todoService.createTodo({
    userId: req.user.id,
    task,
    tags
  })

  ApiResponse.created(res, "Task Todo created successfully.", { todo });
}

const updateTodo = async (req, res) => {
  const { todo } = await todoService.updateTodo(req.user.id, req.params.id, req.body);

  ApiResponse.ok(res, "Todo updated successfully.", { todo })
}

const toggleIsCompleted = async (req, res) => {
  await todoService.toggleIsCompleted(req.user.id, req.params.id)

  ApiResponse.noContent(res, "Todo toggled successfully.")
}

const getUserTodos = async (req, res) => {
  const { todos } = await todoService.getUserTodos(req.user.id);

  ApiResponse.ok(res, "User todos Fetched successfully", { todos })
}

const deleteTodo = async (req, res) => {
  await todoService.deleteTodo(req.user.id, req.params.id)

  ApiResponse.noContent(res, "Todo deleted successfully");
}

export {
  createTodo,
  updateTodo,
  toggleIsCompleted,
  getUserTodos,
  deleteTodo
}