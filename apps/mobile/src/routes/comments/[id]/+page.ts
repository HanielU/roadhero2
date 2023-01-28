import { trpc } from "$lib/trpc";
// import { onMount } from "svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  // console.log(params);
  const reportId = params.id;
  // fetch stuff here
  const comments = await trpc.comments.get.query(reportId);
  console.log("Original List", comments);

  return {
    comments: comments,
  };
};
