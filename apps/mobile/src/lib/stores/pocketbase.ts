import PocketBase from "pocketbase";
import { writable } from "svelte/store";
// import { currentUser } from ".";

export const pb = new PocketBase("http://127.0.0.1:8090");

pb.authStore.onChange(() => {
  // currentUser.set(pb.authStore.model);
});
