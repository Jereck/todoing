"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react'
import { type Todo } from '~/server/db/schema';

export function TodoItem({ todo }: { todo: Todo }) {
  const router = useRouter();
  const { mutate } = api.todos.deleteTodo.useMutation({
    onSuccess: () => {
      router.refresh()
    }
  })
  const { mutate: setDoneMutate } = api.todos.setDone.useMutation({
    onSuccess: () => {
      router.refresh()
    }
  })

  return (
    <div key={todo.id} className="flex flex-row w-full border justify-between p-2 my-2 rounded">
      <div className="flex flex-row space-x-2">
        <input 
          type="checkbox"
          checked={todo.done}
          onChange={() => {
            setDoneMutate({
              todoId: todo.id,
              done: todo.done ? false : true
            })
          }}
        />
        <div>
          { todo.todo }
        </div>
      </div>

      <div>
        <button
          className="text-red-500"
          onClick={() => {
            mutate({ todoId: todo.id })
          }}
        >Delete</button>
      </div>
    </div>
  )
}

export default TodoItem