import { protectedProcedure, publicProcedure, router } from "../trpc";
import { array, number, object, string } from "zod";

export default router({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.pb.collection("reports").getList(1, 10, {});
  }),

  getOne: publicProcedure.input(object({ id: string() })).query(async ({ ctx, input }) => {
    // console.log("expam", input.expand);

    return await ctx.pb.collection("reports").getOne(input.id, { expand: "user, comments" });
  }),

  getWithComment: publicProcedure.query(async ({ ctx }) => {
    return await ctx.pb.collection("reports").getFullList(100, { expand: "user, comments" });
  }),

  // remember to space out the route names
  add: publicProcedure
    .input(
      object({
        description: string(),
        coords: object({
          value: array(number()),
        }),
        user: object({
          email: string().email(),
          password: string(),
          id: string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // return await ctx.pb.collection("reports").addOrSomething(input);
      const { coords, user, ...rep } = input;

      await ctx.pb.collection("users").authWithPassword(user.email, user.password);
      console.log(ctx.pb.authStore.isValid);

      const loc = await ctx.pb.collection("locations").create({ coords, reporter: input.user.id });
      return await ctx.pb
        .collection("reports")
        .create({ ...rep, location: loc.id, user: input.user.id });
    }),

  locations: publicProcedure.query(async ({ ctx }) => {
    return await ctx.pb.collection("locations").getList(1, 10, {
      filter: 'created >= "2022-01-01 00:00:00"',
    });
  }),
});
