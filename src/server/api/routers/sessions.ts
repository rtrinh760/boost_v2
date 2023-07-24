import { toast } from "react-hot-toast";
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
      toast.error("Error getting sessions. Please reload.");
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

      try {
        await ctx.prisma.session.create({
          data: {
            user_id: currentUserId,
            session_name: input.session_name,
          },
        });
      } catch (error) {
        toast.error("Error creating session. Please try again.");
        console.log(error);
        throw new Error("Error creating session");
      }
    }),

  delete: privateProcedure
    .input(
      z.object({
        session_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.session.delete({
          where: {
            session_id: input.session_id,
          },
        });
      } catch (error) {
        toast.error("Error deleting session. Please try again.");
        console.log(error);
        throw new Error("Error deleting session");
      }
    }),
});
