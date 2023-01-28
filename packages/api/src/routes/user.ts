import { protectedProcedure, publicProcedure, router } from "../trpc";
import { object, string } from "zod";

export default router({
  get: publicProcedure.input(object({ id: string() })).query(async ({ ctx, input }) => {
    console.log("user", input.id);

    return await ctx.pb.collection("users").getOne(input.id);
  }),

  add: publicProcedure
    .input(
      object({
        name: string(),
        email: string().email(),
      })
    )
    .mutation(({ input, ctx }) => {
      ctx.user;
    }),
});
