import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(
      z.object({
        session_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.note.findMany({
          where: {
            session_id: input.session_id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      } catch (error) {
        console.log("error", error);
        throw new Error("Error getting notes");
      }
    }),

  create: privateProcedure
    .input(
      z.object({
        session_id: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.note.create({
          data: {
            content: input.content,
            session_id: input.session_id,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error creating note");
      }
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.note.update({
          where: {
            id: input.id,
          },
          data: {
            content: input.content,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error updating note");
      }
    }),
});
