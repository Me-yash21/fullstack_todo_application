import api from './api.js'

const todoService = {
  async createTodo(task,tags=[]){
    const response = await api.post('/todo/create',{task,tags})
    return response.data;
  },

  async toggleTodo(todoId){
    const response = await api.patch(`/toggle-complete/${todoId}`)
    return response.data;
  },

  async updateTodo(todoId,updatedTodo){
    const requestBody = {
      ...(updatedTodo.task && {task: updatedTodo.task}),
      ...(updatedTodo.tags && {tags: updatedTodo.tags})
    }
    const response = await api.put(`/todo/${todoId}`,requestBody);
    return response.data;
  },

  async deleteTodo(todoId){
    const response = await api.delete(`/todo/${todoId}`);
    return response.data;
  },

  async getUserTodos(){
    const response = await api.get('/user-todos');
    return response.data;
  }
}

export default todoService