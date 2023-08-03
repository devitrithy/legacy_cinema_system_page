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

  let iTitle = 0;
  let iDescription = 0;
  let iTrailer = 0;
  let iTime = 0;
  let iGenre = 0;
  let iImportCost = 0;
  let loading = false;

  const deleteModal = (id: any) => {
    popupModal = true;
    ids = id;
    console.log(ids);
  };
  let files: any, fileInput: Fileupload;
  let formInput = {
    title: "",
    genre: "",
    description: "",
    trailer: "",
    time: "",
    import_cost: "",
  };
  let resetValue = () => {
    formInput = {
      genre: "",
      title: "",
      description: "",
      trailer: "",
      time: "",
      import_cost: "",
    };
    iTime = 0;
    iTitle = 0;
    iDescription = 0;
    iTrailer = 0;
    iGenre = 0;
    iImportCost = 0;
  };

  import type { SubmitFunction } from "./$types.js";
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
    pages.push({ name: i, href: `/movie?page=${i}` });
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
      goto(`/movie?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/movie?page=2`);
    }
    if (p <= pages.length) {
      goto(`/movie?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let editForm = async (id: string) => {
    iTime = 0;
    iTitle = 0;
    iDescription = 0;
    iTrailer = 0;
    iTime = 0;
    iGenre = 0;
    ids = id;
    edit = true;
    const editData = await axios.get(endpoint + "movie/" + id);
    let d = editData.data.movie[0];
    console.log(editData);
    if (editData) {
      formInput.title = d.title;
      formInput.genre = d.genre;
      formInput.description = d.description;
      formInput.time = d.time;
      formInput.import_cost = d.import_cost;
      formInput.trailer = d.trailer;

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
    const { title, description, time, trailer, genre, import_cost } =
      Object.fromEntries(data);
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
    if (import_cost.length < 1) {
      iImportCost = 1;
      loading = false;
      cancel();
    } else {
      iImportCost = 2;
    }
    if (time.length < 1) {
      iTime = 1;
      loading = false;
      cancel();
    } else {
      iTime = 2;
    }
    if (trailer.length < 1) {
      iTrailer = 1;
      loading = false;
      cancel();
    } else {
      iTrailer = 2;
    }
    if (genre.length < 1) {
      loading = false;
      iGenre = 1;
      cancel();
    } else {
      iGenre = 2;
    }
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          formModal = false;
          toast.success("Successfully added the movie.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          resetValue();
          break;
        case "error":
          toast.error("Error while added the movie.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed added the movie.", {
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
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          popupModal = false;
          toast.success("Successfully remove the movie.", {
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

<main class=" z-10 mt-32 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">
    {$page.url.pathname === "/movie" ? "Movie" : "Add Movie"}
  </h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/movie">Movie</BreadcrumbItem>
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
        <TableHeadCell>Import Cost</TableHeadCell>
        <TableHeadCell>Genre</TableHeadCell>
        <TableHeadCell>Time</TableHeadCell>
        <TableHeadCell>Trailer</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each data.data.movies as movie}
          <TableBodyRow>
            <TableBodyCell
              ><img
                width="50"
                src={endpoint +
                  "thumbnail/" +
                  movie.poster.substring(8) +
                  "?h=96&w=54"}
                alt=""
              /></TableBodyCell
            >
            <TableBodyCell>{movie.title}</TableBodyCell>
            <TableBodyCell
              >{movie.description.length > 50
                ? movie.description.substring(0, 50) + "..."
                : movie.description}</TableBodyCell
            >
            <TableBodyCell>${movie.import_cost}</TableBodyCell>
            <TableBodyCell>{movie.genre}</TableBodyCell>
            <TableBodyCell>{movie.time}</TableBodyCell>
            <TableBodyCell>{movie.trailer}</TableBodyCell>
            <TableBodyCell tdClass="w-40">
              <div class="flex gap-5">
                <a href="/movie/{movie.movie_id}"><EyeOutline /></a>
                <button on:click={() => editForm(movie.movie_id)}
                  ><EditOutline /></button
                >
                <button
                  type="submit"
                  on:click={() => {
                    deleteModal(movie.movie_id);
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
    <div class="grid gap-6 mb-6 md:grid-cols-2">
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
        <span>Genre</span>
        <Input
          color={iGenre == 0 ? "base" : iGenre == 1 ? "red" : "green"}
          type="text"
          name="genre"
          bind:value={formInput.genre}
          placeholder="Action"
        />
        {#if iGenre == 1}
          <Helper class="mt-2" color="red"
            ><span class="font-medium">Invalid!</span> Genre is required!</Helper
          >
        {:else if iGenre === 2}
          <Helper class="mt-2" color="green"
            ><span class="font-medium">Well done!</span> Genre is valid.</Helper
          >
        {/if}
      </Label>
    </div>
    <Label class="space-y-2">
      <span>Description</span>
      <Textarea
        type="text"
        name="description"
        bind:value={formInput.description}
        placeholder="John Wick 4 is an action movie..."
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
    <Label class="space-y-2">
      <span>Import Cost</span>
      <ButtonGroup class="w-full">
        <InputAddon>$</InputAddon>
        <Input
          color={iImportCost == 0 ? "base" : iImportCost == 1 ? "red" : "green"}
          type="number"
          name="import_cost"
          bind:value={formInput.import_cost}
          placeholder="100000"
        />
      </ButtonGroup>
      {#if iImportCost == 1}
        <Helper class="mt-2" color="red"
          ><span class="font-medium">Invalid!</span> Import Cost is required!</Helper
        >
      {:else if iImportCost === 2}
        <Helper class="mt-2" color="green"
          ><span class="font-medium">Well done!</span> Import Cost is valid.</Helper
        >
      {/if}
    </Label>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <Label class="space-y-2">
        <span>Time</span>
        <Input
          color={iTime == 0 ? "base" : iTime == 1 ? "red" : "green"}
          type="text"
          name="time"
          bind:value={formInput.time}
          placeholder="2h40min"
        />
        {#if iTime == 1}
          <Helper class="mt-2" color="red"
            ><span class="font-medium">Invalid!</span> Time is required!</Helper
          >
        {:else if iTime === 2}
          <Helper class="mt-2" color="green"
            ><span class="font-medium">Well done!</span> Time is valid.</Helper
          >
        {/if}
      </Label>
      <Label class="space-y-2">
        <span>Trailer Link</span>
        <Input
          color={iTrailer == 0 ? "base" : iTrailer == 1 ? "red" : "green"}
          type="text"
          name="trailer"
          bind:value={formInput.trailer}
          placeholder="Trailer video link..."
        />
        {#if iTrailer == 1}
          <Helper class="mt-2" color="red"
            ><span class="font-medium">Invalid!</span> Trailer is required!</Helper
          >
        {:else if iTrailer === 2}
          <Helper class="mt-2" color="green"
            ><span class="font-medium">Well done!</span> Trailer is valid.</Helper
          >
        {/if}
      </Label>
    </div>
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
      If you delete this movie, The related data will also delete too. Are you
      sure you want to delete?
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
