import { router } from "../trpc";
import { authRouter } from "./auth";
import { peopleRouter } from "./people";

export const appRouter = router({
  people: peopleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
