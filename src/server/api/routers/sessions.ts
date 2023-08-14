import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const sessionsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.userId;

    try {
      return await ctx.prisma.session.findMany({
        where: {
          user_id: currentUserId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      console.log("error", error);
      throw new Error("Error getting sessions");
    }
  }),

  create: privateProcedure
    .input(
      z.object({
        session_name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.userId;

      if (!(input.session_name.length > 0)) {
        throw new Error("Session name is required");
      }

      try {
        await ctx.prisma.session.create({
          data: {
            user_id: currentUserId,
            session_name: input.session_name,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error creating session");
      }
    }),

  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.session.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error deleting session");
      }
    }),
});
