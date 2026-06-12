import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTodoStore = create()(
  persist(set => ({
    todos: [],
    setTodos: (todos) => set([...todos]),
    addTodo: (todo) => set((state) => [...state, todo]),
    removeTodo: (todoId) => set((state) => {
      const newState = state.filter((todo) => todo.id !== todoId);
      return newState
    }),
    clearTodos: () => set([])
  })
  )
)

