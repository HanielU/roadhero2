<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentUser } from "$lib/stores";

  $: if ($currentUser !== null) goto("/");
</script>

<slot />
