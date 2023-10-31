"use client";

import React, { useState } from 'react'
import { type Todo } from '~/server/db/schema';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Trash } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  setDoneMutate: (params: { todoId: number; done: boolean }) => void;
  deleteMutate: (params: { todoId: number }) => void;
}

export function TodoItem({ todo, setDoneMutate, deleteMutate }: TodoItemProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleSetDone = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setDoneMutate({
        todoId: todo.id,
        done: !todo.done
      })
    }, 300)
  }

  const handleDelete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      deleteMutate({ todoId: todo.id })
    }, 300)
  }

  return (
    <Card 
      key={todo.id}
      className={`my-2 hover:scale-105 ${isFadingOut ? 'fade-out' : '' }`}
    >
      <CardBody className="flex flex-row justify-between items-center p-3">
        <div className="flex gap-2">
          <span 
            className={`${todo.done === true ? "text-green-500 strike" : ""} cursor-pointer`}
            onClick={handleSetDone}>
            { todo.todo }
          </span>
        </div>

        <div>
          <Button
            isIconOnly
            variant="light"
            className="text-red-500"
            onClick={handleDelete}
          >
            <Trash />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default TodoItem
