<script lang="ts">
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
    Fileupload,
    Helper,
    Input,
    Label,
    Modal,
    Pagination,
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

  let iTitle = true;
  let iDescription = true;
  let iTrailer = true;
  let iTime = true;
  let iGenre = true;

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
  };
  let resetValue = () => {
    formInput = {
      genre: "",
      title: "",
      description: "",
      trailer: "",
      time: "",
    };
  };

  import type { SubmitFunction } from "./$types.js";
  let formModal = false;
  export const snapshot: Snapshot = {
    capture: () => formInput,
    restore: (value) => (formInput = value),
  };
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
    ids = id;
    edit = true;
    const editData = await axios.get(endpoint + "movie/" + id);
    let d = editData.data.movie[0];
    if (editData) {
      formInput.title = d.title;
      formInput.genre = d.genre;
      formInput.description = d.description;
      formInput.time = d.time;
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
    const { title, description, time, trailer, genre } =
      Object.fromEntries(data);
    if (title.length < 1) {
      iTitle = false;
      cancel();
    } else {
      iTitle = true;
    }
    if (description.length < 1) {
      iDescription = false;
      cancel();
    } else {
      iDescription = true;
    }
    if (time.length < 1) {
      iTime = false;
      cancel();
    } else {
      iTime = true;
    }
    if (trailer.length < 1) {
      iTrailer = false;
      cancel();
    } else {
      iTrailer = true;
    }
    if (genre.length < 1) {
      iGenre = false;
      cancel();
    } else {
      iGenre = true;
    }
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          resetValue();
          toast.success("Successfully added the movie.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          formModal = false;
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
      await update();
    };
  };
  let deleteMovie: SubmitFunction = ({ form, data, action, cancel }) => {
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          toast.success("Successfully remove the movie.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          formModal = false;
          break;
        default:
          break;
      }
      await update();
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
    <Table
      divClass="z-10 m-5 overflow-x-scroll xl:overflow-x-hidden"
      hoverable={true}
    >
      <TableHead>
        <TableHeadCell>Poster</TableHeadCell>
        <TableHeadCell>Title</TableHeadCell>
        <TableHeadCell>Description</TableHeadCell>
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
                src={endpoint + movie.poster}
                alt=""
              /></TableBodyCell
            >
            <TableBodyCell>{movie.title}</TableBodyCell>
            <TableBodyCell
              >{movie.description.length > 50
                ? movie.description.substring(0, 50) + "..."
                : movie.description}</TableBodyCell
            >
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
    <Label class="space-y-2">
      <span>Title</span>
      {#if !iTitle}
        <small class="text-red-500 float-right"> *Required</small>
      {/if}
      <Input
        color={iTitle ? "green" : "red"}
        type="text"
        name="title"
        bind:value={formInput.title}
        placeholder="John Wick 4"
      />
    </Label>
    <Label class="space-y-2">
      <span>Description</span>
      {#if !iDescription}
        <small class="text-red-500 float-right"> *Required</small>
      {/if}
      <Textarea
        color={iDescription ? "green" : "red"}
        type="text"
        name="description"
        bind:value={formInput.description}
        placeholder="John Wick 4 is an action movie..."
      />
    </Label>
    <Label class="space-y-2">
      <span>Genre</span>
      {#if !iGenre}
        <small class="text-red-500 float-right">*Required</small>
      {/if}
      <Input
        color={iGenre ? "green" : "red"}
        type="text"
        name="genre"
        bind:value={formInput.genre}
        placeholder="Action"
      />
    </Label>
    <Label class="space-y-2">
      <span>Time</span>
      {#if !iTime}
        <small class="text-red-500 float-right">*Required</small>
      {/if}
      <Input
        color={iTime ? "green" : "red"}
        type="text"
        name="time"
        bind:value={formInput.time}
        placeholder="2h40min"
      />
    </Label>
    <Label class="space-y-2">
      <span>Trailer Link</span>
      {#if !iTrailer}
        <small class="text-red-500 float-right">*Required</small>
      {/if}
      <Input
        color={iTrailer ? "green" : "red"}
        type="text"
        name="trailer"
        bind:value={formInput.trailer}
        placeholder="Trailer video link..."
      />
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
      <Button type="submit" color="green" class="w-full">Submit</Button>
    </div>
  </form>
</Modal>
<Modal bind:open={popupModal} size="xs" autoclose={false}>
  <div class="text-center">
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
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to delete this movie?
    </h3>
    <form action="?/delete" method="post" use:enhance={deleteMovie}>
      <Button
        type="submit"
        on:click={() => {
          popupModal = false;
        }}
        color="red"
        class="mr-2">Yes, I'm sure</Button
      >
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
