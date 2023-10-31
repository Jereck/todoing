import TodoList from "./_components/todo-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container flex flex-col items-center justify-center px-4 py-10">
        <TodoList />
      </div>
    </main>
  );
}
