import comments from "./routes/comments";
import reports from "./routes/reports";
import user from "./routes/user";
import { router } from "./trpc";

export const appRouter = router({
  user,
  reports,
  comments,
});

export type AppRouter = typeof appRouter;
