import { z } from "zod";
import getMetaData from "metadata-scraper";

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

      if(!input.url.startsWith("http")) {
        input.url = "https://" + input.url;
      }

      try {
        let { title: urlTitle } = await getMetaData(input.url);

        if (!urlTitle) {
          urlTitle = input.url;
        }

        await ctx.prisma.tab.create({
          data: {
            user_id: currentUserId,
            url: input.url,
            session_id: "",
            title: urlTitle,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error creating tab");
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
        await ctx.prisma.tab.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Error deleting tab");
      }
    }),
});
