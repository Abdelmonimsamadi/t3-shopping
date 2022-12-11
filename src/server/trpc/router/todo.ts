import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const todoRouter = router({
  create: publicProcedure
    .input(
      z.object({
        task: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { task } = input;
      return ctx.prisma.todo.create({ data: { task } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.todo.delete({ where: { id } });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        todo: z.object({
          task: z.string().optional(),
          completed: z.boolean().optional(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, todo } = input;
      return ctx.prisma.todo.update({ where: { id }, data: todo });
    }),
});
