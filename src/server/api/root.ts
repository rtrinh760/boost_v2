import { notesRouter } from "./routers/notes";
import { sessionsRouter } from "./routers/sessions";
import { tabsRouter } from "./routers/tabs";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tabs: tabsRouter,
  sessions: sessionsRouter,
  notes: notesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
