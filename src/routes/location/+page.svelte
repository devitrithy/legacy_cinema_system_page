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
    ButtonGroup,
    Fileupload,
    Helper,
    Input,
    InputAddon,
    Label,
    Modal,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Textarea,
    Toast,
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    PlusOutline,
    TrashBinOutline,
  } from "flowbite-svelte-icons";

  export let data;
  export let form;
  let endpoint = "http://localhost:3000/";
  let popupModal = false;
  let ids: any;
  let edit = false;
  let loading = false;

  let iLocationName = 0;
  let iAddress = 0;

  const deleteModal = (id: any) => {
    popupModal = true;
    ids = id;
    console.log(ids);
  };
  let files: any, fileInput: Fileupload;
  let formInput = {
    location_name: "",
    address: "",
  };
  let resetValue = () => {
    formInput = {
      address: "",
      location_name: "",
    };
    iLocationName = 0;
    iAddress = 0;
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
    pages.push({ name: i, href: `/location?page=${i}` });
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
      goto(`/location?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/location?page=2`);
    }
    if (p <= pages.length) {
      goto(`/location?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let editForm = async (id: string) => {
    iLocationName = 0;
    iAddress = 0;
    ids = id;
    edit = true;
    formModal = true;
    const editData = await axios.get(endpoint + "location/" + id);
    let d = editData.data.location[0];
    console.log(editData.data);
    if (editData) {
      formInput.location_name = d.location_name;
      formInput.address = d.address;
    }
  };
  let addLocation = () => {
    if (edit) {
      resetValue();
    }
    edit = false;
    formModal = true;
  };
  let formSumbit: SubmitFunction = ({ form, data, action, cancel }) => {
    const { location_name, address } = Object.fromEntries(data);
    loading = true;
    if (location_name.length < 1) {
      iLocationName = 1;
      loading = false;
      cancel();
    } else {
      iLocationName = 2;
    }
    if (address.length < 1) {
      iAddress = 1;
      loading = false;
      cancel();
    } else {
      iAddress = 2;
    }
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          formModal = false;
          toast.success("Successfully added the location.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          resetValue();
          break;
        case "error":
          toast.error("Error while added the location.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed added the location.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;

        default:
          break;
      }
    };
  };
  let deleteLocation: SubmitFunction = ({ form, data, action, cancel }) => {
    loading = true;
    return async ({ result, update }) => {
      loading = false;
      switch (result.type) {
        case "success":
          await update();
          toast.success("Successfully remove the location.", {
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
  <h1 class="text-black dark:text-white text-2xl m-4">
    {$page.url.pathname === "/location" ? "Location" : "Add Location"}
  </h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/location">Location</BreadcrumbItem>
    </Breadcrumb>

    <Button on:click={addLocation} outline pill
      ><span class="mr-5">Add Location</span><PlusOutline />
    </Button>
  </div>
  {#if data.data.count > 0}
    <Table divClass="z-10 m-5 overflow-x-auto " hoverable={true}>
      <TableHead>
        <TableHeadCell>Image</TableHeadCell>
        <TableHeadCell>Location Name</TableHeadCell>
        <TableHeadCell>Address</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each data.data.locations as location}
          <TableBodyRow>
            <TableBodyCell
              ><img
                width="50"
                src={endpoint +
                  "thumbnail/" +
                  location.picture.substring(8) +
                  "?w=50&h=50"}
                alt=""
              /></TableBodyCell
            >
            <TableBodyCell>{location.location_name}</TableBodyCell>
            <TableBodyCell
              >{location.address.length > 50
                ? location.address.substring(0, 50) + "..."
                : location.address}</TableBodyCell
            >
            <TableBodyCell tdClass="w-40">
              <div class="flex gap-5">
                <a href="/location/{location.movie_id}"><EyeOutline /></a>
                <button on:click={() => editForm(location.location_id)}
                  ><EditOutline /></button
                >
                <button
                  type="submit"
                  on:click={() => {
                    deleteModal(location.location_id);
                  }}><TrashBinOutline /></button
                >
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {:else}
    <p class="text-2xl text-black dark:text-white">
      No Location's availble yet!
    </p>
  {/if}
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
      <input type="hidden" name="id" value={ids} />
    {/if}

    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      {edit ? "Edit" : "Add"} Location
    </h3>
    <Label class="space-y-2">
      <span>Location Name</span>
      <Input
        color={iLocationName == 0
          ? "base"
          : iLocationName == 1
          ? "red"
          : "green"}
        type="text"
        name="location_name"
        bind:value={formInput.location_name}
        placeholder="AEON MALL 3"
      />
      {#if iLocationName == 1}
        <Helper class="mt-2" color="red"
          ><span class="font-medium">Invalid!</span> Location Name is required!</Helper
        >
      {:else if iLocationName === 2}
        <Helper class="mt-2" color="green"
          ><span class="font-medium">Well done!</span> Location Name is valid.</Helper
        >
      {/if}
    </Label>
    <Label class="space-y-2">
      <span>Address</span>
      <Textarea
        type="text"
        name="address"
        bind:value={formInput.address}
        placeholder="Takhmao, Kandal, Cambodia"
      />
      {#if iAddress == 1}
        <Helper class="mt-2" color="red"
          ><span class="font-medium">Invalid!</span> Address is required!</Helper
        >
      {:else if iAddress === 2}
        <Helper class="mt-2" color="green"
          ><span class="font-medium">Well done!</span> Address is valid.</Helper
        >
      {/if}
    </Label>
    <Label for="with_helper" class="pb-2">Upload file</Label>
    <Fileupload
      bind:files
      bind:this={fileInput}
      id="with_helper"
      class="mb-2"
      name="poster"
    />
    {#if files?.[0]}
      <p>
        {files[0].name}
      </p>
    {/if}
    <Helper>SVG, PNG, JPG or GIF (MAX. 800x400px).</Helper>
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
        <Spinner color="gray" size={8} />
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
      Are you sure you want to delete this location?
    </h3>
    <form action="?/delete" method="post" use:enhance={deleteLocation}>
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
