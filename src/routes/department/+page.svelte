<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";
  import type { Snapshot } from "@sveltejs/kit";
  import axios from "axios";
  import { onMount } from "svelte";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
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
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    PlusOutline,
    TrashBinOutline,
  } from "flowbite-svelte-icons";

  export let data;
  export let form;
  let endpoint = "https://cinemaapi.serveo.net/";
  let popupModal = false;
  let ids: any;
  let edit = false;

  let iName = 0;
  let iDescription = 0;
  let loading = false;

  const deleteModal = (id: any) => {
    popupModal = true;
    ids = id;
    console.log(ids);
  };
  let txtDescription = "";
  let formInput = {
    name: "",
  };
  let resetValue = () => {
    formInput = {
      name: "",
    };
    iName = 0;
    iDescription = 0;
    txtDescription = "";
  };

  import type { SubmitFunction } from "./$types.js";
  import TextField from "$lib/ui/textField.svelte";
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
    pages.push({ name: i, href: `/department?page=${i}` });
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
      goto(`/department?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/department?page=2`);
    }
    if (p <= pages.length) {
      goto(`/department?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let editForm = async (id: string) => {
    iName = 0;
    ids = id;
    edit = true;
    const editData = await axios.get(endpoint + "department/" + id);
    let d = editData.data.department[0];
    if (editData) {
      formInput.name = d.department_name;
      txtDescription = d.description;

      formModal = true;
    }
  };
  let addMovie = () => {
    if (edit) {
      resetValue();
    }
    edit = false;
    formModal = true;
  };
  let formSumbit: SubmitFunction = ({ form, data, action, cancel }) => {
    const { department_name, description } = Object.fromEntries(data);
    loading = true;
    if (department_name.length < 1) {
      iName = 1;
      loading = false;
      cancel();
    } else {
      iName = 2;
    }
    if (description.length < 1) {
      iDescription = 1;
      loading = false;
      cancel();
    } else {
      iDescription = 2;
    }
    return async ({ result, update }) => {
      loading = false;
      switch (result.type) {
        case "success":
          resetValue();
          toast.success("Successfully added the department.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          formModal = false;
          await update();
          break;
        case "error":
          toast.error("Error while added the department.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed added the department.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;

        default:
          break;
      }
    };
  };
  let deleteMovie: SubmitFunction = ({ form, data, action, cancel }) => {
    loading = true;
    return async ({ result, update }) => {
      loading = false;
      switch (result.type) {
        case "success":
          await update();
          toast.success("Successfully remove the department.", {
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
    {$page.url.pathname === "/department" ? "Department" : "Add Department"}
  </h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/department">Department</BreadcrumbItem>
    </Breadcrumb>

    <Button on:click={addMovie} outline pill
      ><span class="mr-5">Add Department</span><PlusOutline />
    </Button>
  </div>
  {#if data.data.count > 0}
    <Table divClass="z-10 m-5 overflow-x-auto " hoverable={true}>
      <TableHead>
        <TableHeadCell>Department Name</TableHeadCell>
        <TableHeadCell>Detail</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each data.data.departments as department}
          <TableBodyRow>
            <TableBodyCell>{department.department_name}</TableBodyCell>
            <TableBodyCell>{department.description}</TableBodyCell>
            <TableBodyCell tdClass="w-40">
              <div class="flex gap-5">
                <a href="/department/{department.department_id}"
                  ><EyeOutline /></a
                >
                <button on:click={() => editForm(department.department_id)}
                  ><EditOutline /></button
                >
                <button
                  type="submit"
                  on:click={() => {
                    deleteModal(department.department_id);
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
      No Department's availble yet!
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
      {edit ? "Edit" : "Add"} Department
    </h3>
    <TextField
      fieldName="Department Name"
      value={formInput.name}
      name="department_name"
      iFieldName={iName}
      holder="Department Name..."
    />
    <Label for="textarea-id" class="mb-2">Description</Label>
    <Textarea
      id="textarea-id"
      placeholder="Description..."
      bind:value={txtDescription}
      rows="2"
      name="description"
    />
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
      Are you sure you want to delete this department?
    </h3>
    <form action="?/delete" method="post" use:enhance={deleteMovie}>
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
