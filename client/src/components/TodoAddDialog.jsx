import { useState } from 'react';
import todoService from '../services/todoServices.js';
import { useTodoStore } from '../store/todoStore.js';
export default function TodoAddDialog({ showDialog, setShowDialog }) {
  const initialTodoState = {
    task: '',
    tags: '', // tags must be separeted by ',' or "<space> "
  };

  const [todo, setTodo] = useState(initialTodoState);
  const [isLoading, setIsLoading] = useState(false);

  const addTodoInStore = useTodoStore((state) => state.addTodo);
  function handleChange(e) {
    const { name, value } = e.target;
    setTodo((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function onCancelDialogHandler() {
    setShowDialog(false);
  }

  async function createTodoApi(todo) {
    const response = await todoService.createTodo(todo.task, todo.tags);
    return response.data.todo;
  }

  async function onSaveHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    const tags = todo.tags
      .replace(/\s+/g, ';')
      .replaceAll(',', ';')
      .replace(/;+/g, ';')
      .split(';')
      .filter((tag) => tag.trim() !== '');
    const formatedTodo = {
      task: todo.task,
      tags,
    };
    try {
      const newTodo = await createTodoApi(formatedTodo);
      addTodoInStore(newTodo);
      setShowDialog(false);
      setTodo(initialTodoState);
    } catch (error) {
      console.log('something went wrong while adding the task ');
      console.dir(error);
    } finally {
      setIsLoading(false);
    }
  }
  if (!showDialog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-white border border-gray-600 p-6 shadow-xl rounded-lg pointer-events-auto ">
        <form className="space-y-5" onSubmit={onSaveHandler}>
          {/* task input field */}
          <div className="flex flex-col w-xs">
            <label
              htmlFor="task"
              className="text-sm font-medium text-[#6a6a6a] mb-2"
            >
              Task
            </label>
            <input
              id="task"
              type="text"
              name="task"
              value={todo.task}
              onChange={handleChange}
              placeholder="Complete React Labs..."
              className={`w-full px-3 py-4 text-base bg-white border-2 rounded-lg transition-all focus:outline-none`}
            />
            <input />
          </div>

          {/* tags input field */}
          <div className="flex flex-col">
            <label
              htmlFor="tags"
              className="text-sm font-medium text-[#6a6a6a] mb-2"
            >
              Tags
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={todo.tags}
              onChange={handleChange}
              placeholder="react, learning"
              className={`w-full px-3 py-4 text-base bg-white border-2 rounded-lg transition-all focus:outline-none`}
            />
            <input />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 h-8 bg-[#36677c] hover:bg-[#4e8197] disabled:bg-[#a1bcc8] text-white font-medium text-base rounded-lg transition-colors"
            >
              {isLoading ? 'Adding...' : 'Add'}
            </button>

            <button
              onClick={onCancelDialogHandler}
              disabled={isLoading}
              className="w-1/2 h-8 bg-[#ff385c] hover:bg-[#e00b41] disabled:bg-[#ffd1da] text-white font-medium text-base rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
