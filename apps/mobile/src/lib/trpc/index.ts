import { base_url } from "$lib/utils";
import type { AppRouter } from "@packages/api";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: base_url + "/trpc",
    }),
  ],
});
