import { router } from "../trpc";
import { todoRouter } from "./todo";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const appRouter = router({
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
