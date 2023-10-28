import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { todos } from "~/server/db/schema";

export const todosRouter = createTRPCRouter({
  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.todos.findMany({
      limit: 100,
      orderBy: [desc(todos.createdAt)]
    })
  }),

  createTodo: publicProcedure.input(z.object({ todo: z.string() })).mutation(async ({ ctx, input}) => {
    const newTodo = await ctx.db.insert(todos).values({
      todo: input.todo
    })

    return newTodo
  }),

  deleteTodo: publicProcedure.input(z.object({ todoId: z.number() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(todos)
      .where(eq(todos.id, input.todoId))
  }),

  setDone: publicProcedure.input(z.object({ todoId: z.number(), done: z.boolean() })).mutation( async ({ ctx, input }) => {
    return await ctx.db.update(todos).set({ done: input.done })
      .where(eq(todos.id, input.todoId))
  })
})