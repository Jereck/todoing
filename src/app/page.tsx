import { api } from "~/trpc/server";
import { CreateTodo } from "./_components/create-todo";
import TodoItem from "./_components/todo-item";
import moment from 'moment'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container flex flex-col items-center justify-center px-4 py-10">
        <TodoList />
      </div>
    </main>
  );
}

async function TodoList() {
  const allTodos = await api.todos.getAllTodos.query();

  const inCompleteTodos = allTodos.filter(todo => !todo.done)

  return (
    <div className="w-full max-w-lg">
      <div className="mb-4">
        <h1 className="text-2xl">{ moment(Date.now()).format('dddd, MMM Do')}</h1>
        <p className="text-blue-500">{ inCompleteTodos.length } active tasks</p>
      </div>
      <CreateTodo />
      { allTodos.length > 0 ? (
        allTodos.map((todo) => (
          <div key={todo.id}>
            <TodoItem todo={todo} />
          </div>
        ))
      ) : (
        <div>
          <p>No Todos</p>
        </div>
      )}
    </div>
  )
}
