import { useEffect, useRef, useState } from 'react';
import todoService from '../services/todoServices.js';
import { useTodoStore } from '../store/todoStore.js';

export default function TodoCard({ todo }) {
  const [isCompleteState, SetIsCompleteState] = useState(todo.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const taskInputRef = useRef(null);
  const updateTodoInStore = useTodoStore((state) => state.updateTodo);
  const [isUpdating, setIsUpadating] = useState(false);

  const isCompleteToggleHandler = async (e) => {
    // first change state in the frontend and later send the api response.
    // and then you can update state later according to api response.
    SetIsCompleteState(e.target.checked);
    try {
      const response = await todoService.toggleTodo(todo._id);
      // now update the state what server sends as response.
      SetIsCompleteState(response.data.isCompleted);
      // also update the todo in the store.
      toggleTodo(todo._id);
    } catch (error) {
      console.error('Something went wrong to toggle Todo:- ', error);
      console.dir(error);
    }
  };

  const saveBtnHandler = async () => {
    try {
      setIsUpadating(true);
      const response = await todoService.updateTodo(todo._id, {
        task,
      });
      const updatedTodo = response.data.todo;
      //update the todo in the todostore
      console.log('updatedTodo:- ', updatedTodo);
      updateTodoInStore(todo._id, updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('something went wrong while updating the todo:- ', error);
    } finally {
      setIsUpadating(false);
    }
  };
  useEffect(() => {
    if (isEditing && taskInputRef.current) {
      taskInputRef.current.focus();
      taskInputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="flex px-5 py-3 w-88 justify-between">
      <div className="flex gap-4">
        <input
          type="checkbox"
          name="isComplete"
          onChange={isCompleteToggleHandler}
          checked={isCompleteState}
        />

        {!isEditing ? (
          <p
            className="text-wrap w-xs max-w-90"
            style={{
              textDecoration: isCompleteState ? 'line-through' : 'none',
              display: isEditing ? 'none' : 'block',
            }}
          >
            {task}
          </p>
        ) : (
          <textarea
            className="field-sizing-content w-xs min-w-2xs max-w-90 resize-none overflow-hidden"
            type="text"
            value={task}
            ref={taskInputRef}
            onChange={(e) => setTask(e.target.value)}
          />
        )}
      </div>
      <div className="flex gap-2 ">
        {!isEditing ? (
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            ✍️
          </button>
        ) : isUpdating ? (
          <div class="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-orange-400"></div>
        ) : (
          <button onClick={saveBtnHandler} className="cursor-pointer save-btn">
            💾
          </button>
        )}

        <button>🗑️</button>
      </div>
    </div>
  );
}
