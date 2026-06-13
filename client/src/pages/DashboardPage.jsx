import { useEffect, useState } from 'react';
import TodoCard from '../components/TodoCard.jsx';
import todoServices from '../services/todoServices.js';
import { useTodoStore } from '../store/todoStore.js';
import TodoAddDialog from '../components/TodoAddDialog.jsx';

export default function DashboardPage() {
  const setTodos = useTodoStore((state) => state.setTodos);
  const todos = useTodoStore((state) => state.todos);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTodosFromApi() {
      setIsLoading(true);
      const todosResponse = await todoServices.getUserTodos();
      // console.log('todos:- ', todosResponse.data);
      setTodos(todosResponse.data.todos);
      setIsLoading(false);
    }
    fetchTodosFromApi();
  }, []);

  return isLoading ? (
    <div>
      <p> Loading....</p>
    </div>
  ) : (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl mt-9">Todos</h1>
        <div className="flex flex-col items-center justify-center gap-2">
          {!!todos.length &&
            todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
        </div>
      </div>
      <TodoAddDialog
        showDialog={showAddDialog}
        setShowDialog={setShowAddDialog}
      />
      <button
        className="fixed bottom-20 right-24 cursor-pointer text-6xl  rounded-full w-5 h-5"
        onClick={() => setShowAddDialog(true)}
      >
        +
      </button>
    </div>
  );
}
