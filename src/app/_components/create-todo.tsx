"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateTodo() {
  const router = useRouter();
  const [todo, setTodo] = useState("");

  const createTodo = api.todos.createTodo.useMutation({
    onSuccess: () => {
      router.refresh();
      setTodo("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo.mutate({ todo });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full border border-black px-4 py-2 text-black rounded"
      />
      <button
        type="submit"
        className="rounded bg-green-400 px-10 py-3 font-semibold transition hover:bg-green-700 text-white"
        disabled={createTodo.isLoading}
      >
        {createTodo.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
