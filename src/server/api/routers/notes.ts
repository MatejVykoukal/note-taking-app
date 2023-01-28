import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  getNotes: publicProcedure.query(async ({ ctx }) => {
    const comps = await ctx.prisma.note.findMany()
    return comps
  }),
});