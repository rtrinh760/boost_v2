import { z } from "zod";
import getMetaData from "metadata-scraper";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const tabsRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(
      z.object({
        session_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.tab.findMany({
          where: {
            session_id: input.session_id,
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
        session_id: z.string(),
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.url.startsWith("http")) {
        input.url = "https://" + input.url;
      }

      try {
        const { title: urlTitle } = await getMetaData(input.url);

        if (!urlTitle) {
          throw new Error("Error getting metadata");
        }

        await ctx.prisma.tab.create({
          data: {
            url: input.url,
            session_id: input.session_id,
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
