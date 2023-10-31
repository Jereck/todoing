"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react'
import { type Todo } from '~/server/db/schema';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Trash } from 'lucide-react';

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
    <Card 
      key={todo.id}
      className="my-2"
    >
      <CardBody className="flex flex-row justify-between items-center p-3">
        <div className="flex gap-2">
          <span 
            className={`${todo.done === true ? "text-green-500 strike" : ""} cursor-pointer`}
            onClick={() =>              
              setDoneMutate({
              todoId: todo.id,
              done: todo.done ? false : true
            })}
          >
            { todo.todo }
          </span>
        </div>

        <div>
          <Button
            isIconOnly
            variant="light"
            className="text-red-500"
            onClick={() => {
              mutate({ todoId: todo.id })
            }}
          >
            <Trash />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default TodoItem
