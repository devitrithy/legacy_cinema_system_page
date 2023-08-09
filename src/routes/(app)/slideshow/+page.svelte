<script lang="ts">
  export const load = true;
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";
  import type { Snapshot } from "@sveltejs/kit";
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
    Toggle,
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    PlusOutline,
    TrashBinOutline,
  } from "flowbite-svelte-icons";

  export let data;
  let endpoint = `${PUBLIC_API_ENDPOINT}/`;
  let popupModal = false;
  let ids: any;
  let edit = false;

  let iTitle = 0;
  let iDescription = 0;
  let active = true;

  let loading = false;

  const deleteModal = (id: any) => {
    popupModal = true;
    ids = id;
    console.log(ids);
  };
  let files: any, fileInput: Fileupload;
  let formInput = {
    title: "",
    description: "",
  };
  let resetValue = () => {
    formInput = {
      title: "",
      description: "",
    };
    iTitle = 0;
    iDescription = 0;
  };

  import type { SubmitFunction } from "./$types.js";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
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
    pages.push({ name: i, href: `/slideshow?page=${i}` });
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
      goto(`/slideshow?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/slideshow?page=2`);
    }
    if (p <= pages.length) {
      goto(`/slideshow?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let editForm = async (id: string) => {
    iTitle = 0;
    iDescription = 0;

    ids = id;
    edit = true;
    const editData = await axios.get(endpoint + "slideshow/" + id, {
      headers: {
        Authorization: "Bearer guest",
      },
    });
    let d = editData.data.slideshow[0];
    console.log(editData);
    if (editData) {
      formInput.title = d.title;
      formInput.description = d.description;
      active = d.active;
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
    const { title, description } = Object.fromEntries(data);
    loading = true;
    if (title.length < 1) {
      iTitle = 1;
      loading = false;
      cancel();
    } else {
      iTitle = 2;
    }
    if (description.length < 1) {
      iDescription = 1;
      loading = false;
      cancel();
    } else {
      iDescription = 2;
    }

    return async ({ result, update }) => {
      await update();
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          formModal = false;
          toast.success("Successfully added the slideshow.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          resetValue();
          break;
        case "error":
          toast.error("Error while added the slideshow.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed added the slideshow.", {
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
      await update();
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          popupModal = false;
          toast.success("Successfully remove the slideshow.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;

        case "failure":
          toast.success("Successfully remove.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
        default:
          break;
      }
    };
  };
</script>

<main class=" z-10 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">
    {$page.url.pathname === "/slideshow" ? "Movie" : "Add Movie"}
  </h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/slideshow">Movie</BreadcrumbItem>
    </Breadcrumb>

    <Button on:click={addMovie} outline pill
      ><span class="mr-5">Add Movie</span><PlusOutline />
    </Button>
  </div>
  {#if data.data.count > 0}
    <Table divClass="z-10 m-5 overflow-x-auto " hoverable={true}>
      <TableHead>
        <TableHeadCell>Poster</TableHeadCell>
        <TableHeadCell>Title</TableHeadCell>
        <TableHeadCell>Description</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each data.data.slideshows as slideshow}
          <TableBodyRow>
            <TableBodyCell
              ><img
                width="50"
                src={endpoint +
                  "thumbnail/" +
                  slideshow.poster.substring(8) +
                  "?h=96&w=54"}
                alt=""
              /></TableBodyCell
            >
            <TableBodyCell>{slideshow.title}</TableBodyCell>
            <TableBodyCell
              >{slideshow.description.length > 50
                ? slideshow.description.substring(0, 50) + "..."
                : slideshow.description}</TableBodyCell
            >
            <TableBodyCell tdClass="w-40">
              <div class="flex gap-5">
                <a href="/slideshow/{slideshow.id}"><EyeOutline /></a>
                <button on:click={() => editForm(slideshow.id)}
                  ><EditOutline /></button
                >
                <button
                  type="submit"
                  on:click={() => {
                    deleteModal(slideshow.id);
                  }}><TrashBinOutline /></button
                >
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {:else}
    <p class="text-2xl text-black dark:text-white">No Movie's availble yet!</p>
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
      {edit ? "Edit" : "Add"} Movie
    </h3>
    <Label class="space-y-2">
      <span>Title</span>
      <Input
        color={iTitle == 0 ? "base" : iTitle == 1 ? "red" : "green"}
        type="text"
        name="title"
        bind:value={formInput.title}
        placeholder="John Wick 4"
      />
      {#if iTitle == 1}
        <Helper class="mt-2" color="red"
          ><span class="font-medium">Invalid!</span> Title is required!</Helper
        >
      {:else if iTitle === 2}
        <Helper class="mt-2" color="green"
          ><span class="font-medium">Well done!</span> Title is valid.</Helper
        >
      {/if}
    </Label>
    <Label class="space-y-2">
      <span>Description</span>
      <Textarea
        type="text"
        name="description"
        bind:value={formInput.description}
        placeholder="John Wick 4 is an action slideshow..."
      />
      {#if iDescription == 1}
        <Helper class="mt-2" color="red"
          ><span class="font-medium">Invalid!</span> Description is required!</Helper
        >
      {:else if iDescription === 2}
        <Helper class="mt-2" color="green"
          ><span class="font-medium">Well done!</span> Description is valid.</Helper
        >
      {/if}
    </Label>
    <Toggle checked={active}>Enable Slideshow</Toggle>
    <input type="hidden" name="active" bind:value={active} />

    <Label for="with_helper" class="pb-2">Upload file</Label>
    <Fileupload
      accept="Image/jpeg"
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
      If you delete this slideshow, The related data will also delete too. Are
      you sure you want to delete?
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
