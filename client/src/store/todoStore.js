import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const arr1 = [];
export const useTodoStore = create()(
  persist(set => ({
    todos: [],
    setTodos: (todos) => set({ todos: todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    removeTodo: (todoId) => set((state) => {
      const newTodos = state.todos.filter((todo) => todo._id !== todoId);
      return {
        todos: newTodos
      }
    }),
    clearTodos: () => set({ todos: [] }),
    toggleTodo: (todoId) => set((state) => {
      const index = state.todos.findIndex((todo) => todo._id === todoId)
      state.todos[index].isCompleted = !state.todos[index].isCompleted;
      return { todos: [...state.todos] }
    }),
    updateTodo: (todoId, updatedTodo) => set((state) => {
      const newTodos = state.todos.filter((todo) => todo._id !== todoId);
      newTodos.push(updatedTodo)
      return {
        todos: newTodos
      }
    })

  })
  )
)

