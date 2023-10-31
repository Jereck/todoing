"use client";

import { api } from "~/trpc/react";
import { CreateTodo } from "./create-todo";
import TodoItem from "./todo-item";
import moment from "moment";
import { Button, Tab, Tabs } from "@nextui-org/react";

function TodoList() {
  const { data: allTodos, refetch } = api.todos.getAllTodos.useQuery()

  const { mutate: deleteMutate } = api.todos.deleteTodo.useMutation({
    onError: (error) => {
      console.log("Delete Error: ", error.message)
    },
    onSuccess: () => {
      void refetch()
    }
  })
  const { mutate: setDoneMutate } = api.todos.setDone.useMutation({
    onError: (error) => {
      console.log("SetDone Error: ", error.message)
    },
    onSuccess: () => {
      void refetch()
    }
  })

  const { mutate: clearCompleted } = api.todos.clearCompleted.useMutation({
    onSuccess: () => {
      void refetch()
    }
  })

  const incompleteTodos = allTodos?.filter(todo => !todo.done)
  const completeTodos = allTodos?.filter(todo => todo.done)

  return (
    <div className="w-full max-w-lg">
      <div className="mb-4">
        <h1 className="text-2xl">{ moment(Date.now()).format('dddd, MMM Do')}</h1>
        <p className="text-blue-500">{ incompleteTodos?.length } active tasks</p>
      </div>
      <CreateTodo refetch={refetch} />

      <Tabs className="w-full mt-4 justify-center">
        <Tab key="incomplete" title="Incomplete">
          { incompleteTodos?.map(( todo ) => (
            <TodoItem key={todo.id} todo={todo} setDoneMutate={setDoneMutate} deleteMutate={deleteMutate} />
          ))}
        </Tab>
        <Tab key="complete" title="Complete">
          { completeTodos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} setDoneMutate={setDoneMutate} deleteMutate={deleteMutate}  />
          ))}
          <Button onClick={() => clearCompleted()}>Clear Completed</Button>
        </Tab>
      </Tabs>

    </div>
  )
}

export default TodoList