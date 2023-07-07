import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const tabsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.userId;

    try {
      return await ctx.prisma.tab.findMany({
        where: {
          user_id: currentUserId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      console.log("error", error);
      throw new Error("Error getting tabs");
    }
  }),

  create: privateProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.userId;

      try {
        await ctx.prisma.tab.create({
          data: {
            user_id: currentUserId,
            url: input.url,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error creating tab");
      }
    }),
});
