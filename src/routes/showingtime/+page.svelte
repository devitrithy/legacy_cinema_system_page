<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";
  import type { Snapshot, SubmitFunction } from "@sveltejs/kit";
  import axios from "axios";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Helper,
    Input,
    Label,
    Modal,
    Pagination,
    Select,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    PlusOutline,
    TrashBinOutline,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  export let data;
  export let form;
  let endpoint = "https://cinemaapi.serveo.net/";
  let popupModal = false;
  let ids: any;
  let edit = false;
  let loading = false;
  let select;
  let locationItems = [];
  let l;
  onMount(async () => {
    l = await axios.get(endpoint + "location");
    l.data.locations.forEach((lo) => {
      locationItems.push({
        value: lo.location_id,
        name: lo.location_name,
      });
    });
  });

  let iHallName = 0;
  let iSelect = 0;

  const deleteModal = (id: any) => {
    popupModal = true;
    ids = id;
    console.log(ids);
  };
  let formInput = {
    hall_name: "",
    location: select,
  };
  let resetValue = () => {
    formInput = {
      hall_name: "",
      location: undefined,
    };

    iHallName = 0;
  };

  let formModal = false;
  export const snapshot: Snapshot = {
    capture: () => formInput,
    restore: (value) => (formInput = value),
  };

  if ($page.url.searchParams.get("add")) {
    formModal = true;
  }
  // Pagination
  $: activeUrl = $page.url.searchParams.get("page");
  let pages: any[] = [];
  let count = data.data.count / 5 + 1;
  if (data.data.count % 5 == 0) {
    count -= 1;
  }
  for (let i = 1; i <= count; i++) {
    pages.push({ name: i, href: `/hall?page=${i}` });
  }

  $: {
    pages.forEach((page) => {
      let splitUrl = page.href.split("?");
      let queryString = splitUrl.slice(1).join("?");
      const hrefParams = new URLSearchParams(queryString);
      let hrefValue = hrefParams.get("page");
      if (hrefValue === activeUrl) {
        page.active = true;
      } else if (activeUrl === null) {
        page.active = true;
        activeUrl = "1";
      } else {
        page.active = false;
      }
    });
    pages = pages;
  }

  let p = Number($page.url.searchParams.get("page"));
  let previous = () => {
    p -= 1;
    if (p >= 1) {
      goto(`/hall?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/hall?page=2`);
    }
    if (p <= pages.length) {
      goto(`/hall?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let editForm = async (id: string) => {
    iHallName = 0;
    ids = id;
    edit = true;
    formModal = true;
    const editData = await axios.get(endpoint + "hall/" + id);
    let d = editData.data.movie[0];
    console.log(d);
    formInput.hall_name = d.hall_name;
    select = d.location_id;
  };
  let addHall = async () => {
    if (edit) {
      resetValue();
    }

    edit = false;
    formModal = true;
  };
  let formSumbit: SubmitFunction = ({ form, data, action, cancel }) => {
    const { hall_name, id } = Object.fromEntries(data);
    loading = true;
    console.log(hall_name.length);
    if (hall_name.length < 1) {
      iHallName = 1;
      loading = false;
      cancel();
    } else {
      iHallName = 2;
    }
    if (!id) {
      iSelect = 1;
      loading = false;
      cancel();
    } else {
      iSelect = 2;
    }

    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          formModal = false;
          toast.success("Successfully added the hall.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          resetValue();
          break;
        case "error":
          toast.error("Error while added the hall.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed added the hall.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;

        default:
          break;
      }
    };
  };
  let deleteHall: SubmitFunction = ({ form, data, action, cancel }) => {
    loading = true;
    return async ({ result, update }) => {
      loading = false;
      switch (result.type) {
        case "success":
          await update();
          toast.success("Successfully remove the hall.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          popupModal = false;
          break;
        default:
          break;
      }
    };
  };
</script>

<main class=" z-10 mt-32 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">Hall</h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/hall">Hall</BreadcrumbItem>
    </Breadcrumb>

    <Button on:click={addHall} outline pill
      ><span class="mr-5">Add Hall</span><PlusOutline />
    </Button>
  </div>
  <Table divClass="z-10 m-5 overflow-x-auto " hoverable={true}>
    <TableHead>
      <TableHeadCell>Hall Name</TableHeadCell>
      <TableHeadCell>Location Name</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.data.halls as hall}
        <TableBodyRow>
          <TableBodyCell>{hall.hall_name}</TableBodyCell>
          <TableBodyCell>{hall.location.location_name}</TableBodyCell>
          <TableBodyCell tdClass="w-40">
            <div class="flex gap-5">
              <a href="/hall/{hall.movie_id}"><EyeOutline /></a>
              <button on:click={() => editForm(hall.hall_id)}
                ><EditOutline /></button
              >
              <button
                type="submit"
                on:click={() => {
                  deleteModal(hall.hall_id);
                }}><TrashBinOutline /></button
              >
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  {#if data.data.count > 5}
    <div class="flex justify-center items-center mt-5">
      <Pagination {pages} on:previous={previous} on:next={next} large />
    </div>
  {/if}
</main>
<Modal bind:open={formModal} autoclose={false} class="w-full">
  <form
    class="flex flex-col space-y-6"
    action="?/{edit ? 'edit' : 'create'}"
    method="POST"
    enctype="multipart/form-data"
    use:enhance={formSumbit}
  >
    {#if edit}
      <input type="hidden" name="h_id" value={ids} />
    {/if}

    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      {edit ? "Edit" : "Add"} Hall
    </h3>
    <Label class="space-y-2">
      <span>Hall Name</span>
      <Input
        color={iHallName == 0 ? "base" : iHallName == 1 ? "red" : "green"}
        type="text"
        name="hall_name"
        bind:value={formInput.hall_name}
        placeholder="Hall Name"
      />
      {#if iHallName == 1}
        <Helper class="mt-2" color="red"
          ><span class="font-medium">Invalid!</span> Hall Name is required!</Helper
        >
      {:else if iHallName === 2}
        <Helper class="mt-2" color="green"
          ><span class="font-medium">Well done!</span> Hall Name is valid.</Helper
        >
      {/if}
    </Label>
    <Label class="space-y-2">
      <!-- // -->
      Select An Option
      <Select class="mt-2" items={locationItems} bind:value={select} />
      {#if iSelect == 1}
        <Helper class="mt-2" color="red"
          ><span class="font-medium">Invalid!</span> Please select the location</Helper
        >
      {:else if iSelect === 2}
        <Helper class="mt-2" color="green"
          ><span class="font-medium">Well done!</span> Hall Name is valid.</Helper
        >
      {/if}
    </Label>
    <input type="hidden" name="id" bind:value={select} />
    <div class="flex gap-10">
      <Button type="button" color="red" on:click={resetValue} class="w-full"
        >Reset</Button
      >
      <Button type="submit" color="green" class="w-full" shadow>
        {#if loading}<Spinner class="mr-3" size="4" color="white" /> Submitting{:else}Submit{/if}
      </Button>
    </div>
  </form>
</Modal>
<Modal bind:open={popupModal} size="xs" autoclose={false}>
  <div class="text-center">
    {#if loading}
      <div class="my-5">
        <Spinner color="gray" size="8" />
      </div>
    {:else}
      <svg
        aria-hidden="true"
        class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
    {/if}
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to delete this hall?
    </h3>
    <form action="?/delete" method="post" use:enhance={deleteHall}>
      <Button type="submit" color="red" class="mr-2">Yes, I'm sure</Button>
      <Button
        type="button"
        on:click={() => {
          popupModal = false;
        }}
        color="alternative"
        class="mr-2">Cancel</Button
      >
      <input type="hidden" name="id" bind:value={ids} />
    </form>
  </div>
</Modal>
<Toaster />
