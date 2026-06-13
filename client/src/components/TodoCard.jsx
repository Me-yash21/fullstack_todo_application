import { useEffect, useRef, useState } from 'react';
import todoService from '../services/todoServices.js';
import { useTodoStore } from '../store/todoStore.js';

export default function TodoCard({ todo }) {
  const [isCompleteState, SetIsCompleteState] = useState(todo.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const taskInputRef = useRef(null);

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
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="cursor-pointer"
          >
            💾
          </button>
        )}

        <button>🗑️</button>
      </div>
    </div>
  );
}
