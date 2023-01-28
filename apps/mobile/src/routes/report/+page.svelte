<script lang="ts">
  import { iconType, modalState } from "$lib/stores";
  import { currentUser } from "$lib/stores";
  import { trpc } from "$lib/trpc";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { setContext } from "svelte";
  import ReportMap from "./ReportMap.svelte";
  import ImageInput from "./ImageInput.svelte";
  import { goto } from "$app/navigation";
  import { pb } from "$lib/stores/pocketbase";

  const cities = [
    { id: 1, name: "Wuse 2" },
    { id: 2, name: "Apo" },
    { id: 3, name: "Gwarimpa" },
    { id: 3, name: "Maitama" },
  ];
  let data = {
    description: "",
  };
  let loading = false;
  const reportLocation = writable<[number, number]>();
  setContext("report-location", reportLocation);

  let media: File;
  const formData = new FormData();

  const submitReport = async () => {
    loading = true;
    formData.append("media", media);

    const report = await trpc.reports.add.mutate({
      ...data,
      coords: {
        value: $reportLocation,
      },

      user: {
        email: $currentUser?.email!,
        password: $currentUser?.password!,
        id: $currentUser?.model.id!,
      },
    });

    await pb.collection("users").authWithPassword($currentUser?.email!, $currentUser?.password!);
    await pb.collection("reports").update(report.id, formData);

    // const res = await fetch(`http://localhost:5000/updateReport?id=${report.id}`, {
    //   method: "POST",
    //   body: formData,
    // });

    loading = false;

    $modalState = {
      title: "Report Submitted",
      msg: "Your report has been submitted successfully",
      icon: iconType.success,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            goto("/");
            $modalState.title = "";
          },
        },
      ],
    };
  };
</script>

<!-- a reporting page with support for video and description -->

<div id="body" />
<divi class="right-0 top-0 z-9 sticky p-6 flex space-x-2 items-center bg-primary-blue text-white">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <button on:click={() => window.history.back()}>
    <div class="i-material-symbols-arrow-back-ios-new-rounded text-xl" /></button
  >
  <div class="text-[1.25rem] ">Make a Report</div>
</divi>

<div class="p-6">
  <div class="">Report location</div>
  <div class="h-250px rounded-lg overflow-hidden">
    <ReportMap />
  </div>

  <div class="py-3">
    <div class="mb-2">Upload a photo or video of the issue</div>

    <ImageInput bind:image={media} />
  </div>

  <div class="py-3">
    <div class="mb-2">Report a problem</div>
    <textarea
      class="bg-transparent outline-none border border-gray w-full p-3 h-150px rounded-lg"
      placeholder="Describe the issue extensively"
      bind:value={data.description}
    />
  </div>

  <button
    on:click={submitReport}
    class="w-full bg-secondaryGreen text-white flex justify-center items-center p-3 rounded-lg"
  >
    {loading ? "Loading..." : "Submit"}
  </button>
</div>
