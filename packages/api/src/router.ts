import comments from "./routes/comments.js";
import reports from "./routes/reports.js";
import user from "./routes/user.js";
import { router } from "./trpc.js";

export const appRouter = router({
  user,
  reports,
  comments,
});

export type AppRouter = typeof appRouter;
