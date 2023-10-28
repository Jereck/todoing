import { api } from "~/trpc/server";
import { CreateTodo } from "./_components/create-todo";
import TodoItem from "./_components/todo-item";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <TodoList />
      </div>
    </main>
  );
}

async function TodoList() {
  const allTodos = await api.todos.getAllTodos.query();

  return (
    <div className="w-full max-w-xs">
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
      <CreateTodo />
    </div>
  )
}
