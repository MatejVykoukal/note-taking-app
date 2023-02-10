import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  createNote: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        note: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const note = await ctx.prisma.note.create({
        data: {
          title: input.title,
          note: input.note,
          userId: ctx.session.user.id,
        },
      });

      return note;
    }),

  getNotes: protectedProcedure.query(
    async ({ ctx }) => {
      const notes = await ctx.prisma.note.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
      return notes;
    }
  ),
  deleteNote: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const note = await ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });

      return note;
    }),
});
