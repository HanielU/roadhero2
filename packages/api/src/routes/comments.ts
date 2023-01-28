import { protectedProcedure, publicProcedure, router } from "../trpc";
import { array, number, object, string } from "zod";

export default router({
  get: publicProcedure.input(string()).query(async ({ ctx, input }) => {
    const reportId = input;
    return await ctx.pb.collection("comments").getFullList(undefined, {
      filter: `report = "${reportId}"`,
      expand: "user",
    });
  }),

  getOne: publicProcedure
    .input(object({ id: string(), expand: string() }))
    .query(async ({ ctx, input }) => {
      const { id, expand } = input;
      // const user = await ctx.pb.collection("users").getOne(id);

      // console.log("User", user);

      return await ctx.pb.collection("comments").getOne(id, {
        expand: expand,
      });
    }),

  add: publicProcedure
    .input(
      object({
        report: string(),
        user: string(),
        content: string(),
        upvotes: object({}),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { report, user, content, upvotes } = input;
      return await ctx.pb.collection("comments").create({
        report,
        user,
        content,
        upvotes,
      });
    }),
});
