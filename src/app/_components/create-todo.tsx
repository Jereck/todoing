"use client";

import { useRouter } from "next/navigation";
import { type SyntheticEvent, useState } from "react";

import { api } from "~/trpc/react";

export function CreateTodo() {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");

  const createTodo = api.todos.createTodo.useMutation({
    onSuccess: () => {
      router.refresh();
      setTodo("");
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (todo.trim() === "") {
      setError("Todo cannot be blank");
    } else {
      setError("");
      createTodo.mutate({ todo });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Todo"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value)
          setError("");
        }}
        className="w-full border border-black px-4 py-2 text-black rounded"
      />
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        className="rounded bg-green-400 py-2 font-semibold transition hover:bg-green-700 text-white"
        disabled={createTodo.isLoading}
      >
        {createTodo.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
