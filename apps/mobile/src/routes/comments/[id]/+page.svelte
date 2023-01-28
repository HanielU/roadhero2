<script lang="ts">
  import { pb } from "@packages/api/src/context";
  import { onMount } from "svelte";
  import Comment from "../../components/Comment.svelte";
  import welcome from "$lib/assets/img/welcome-3.png";

  import type { PageData } from "./$types";

  let comments: any[] = [];

  export let data: PageData;

  comments = data.comments;
</script>

<div
  class="p-6 sticky right-0 top-0 z-1 mb-6 flex space-x-5 items-center bg-primaryBlue text-white"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={() => {
      window.history.back();
    }}
  >
    <div class="i-material-symbols-arrow-back-ios-new-rounded text-xl " />
  </div>
  <div class="text-[1.25rem]">Comments</div>
</div>

{#if comments.length === 0}
  <div class="flex flex-col justify-center items-center h-150">
    <img src={welcome} alt="" />
    <p class="text-2xl text-primaryBlue">No comment on this report yet</p>
  </div>
{:else}
  {#each comments as comment (comment.id)}
    <!-- comment -->
    <Comment commentId={comment.id} />
  {/each}
{/if}
