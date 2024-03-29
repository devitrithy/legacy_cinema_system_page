<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";
  import type { Snapshot, SubmitFunction } from "@sveltejs/kit";
  import axios from "axios";
  import moment from "moment-timezone";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Helper,
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
    Tooltip,
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    PlusOutline,
    TrashBinOutline,
    XCircleOutline,
  } from "flowbite-svelte-icons";
  import TextField from "$lib/ui/textField.svelte";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { PUBLIC_SECRET_GUEST_KEY } from "$env/static/public";

  export let data;

  let endpoint = `${PUBLIC_API_ENDPOINT}/`;
  let popupModal = false;
  let ids: any;
  let edit = false;
  let loading = false;
  let selectHall: any;
  let selectMovie: any;
  let hallItems: { value: any; name: string }[] = [];
  let movieItems: { value: any; name: any }[] = [];
  let { showing, hall, movie } = data;
  $: showing = data.showing;

  hall.halls.forEach(
    (lo: {
      hall_id: any;
      location: { location_name: any };
      hall_name: any;
    }) => {
      hallItems.push({
        value: lo.hall_id,
        name: `Location: ${lo.location.location_name} => ${lo.hall_name}`,
      });
    }
  );
  movie.forEach((lo: { movie_id: any; title: any }) => {
    movieItems.push({
      value: lo.movie_id,
      name: lo.title,
    });
  });
  let iSelect = 0;
  let iDate = 0;
  let iPrice = 0;

  const deleteModal = (id: any) => {
    popupModal = true;
    ids = id;
    //console.log(ids);
  };
  let formInput = {
    date: new Date().toISOString().substring(0, 10),
    time: new Date().toISOString().substring(11, 16),
    price: 5,
  };
  let resetValue = () => {
    formInput = {
      date: new Date().toISOString().substring(0, 10),
      time: new Date().toISOString().substring(11, 16),
      price: 5,
    };

    iDate = 0;
    iPrice = 0;
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
  //console.log(showing.count);
  $: activeUrl = $page.url.searchParams.get("page");
  let pages: any[] = [];
  let count = showing.count / 5 + 1;
  if (showing.showingTimes.length % 5 == 0) {
    count -= 1;
  }
  for (let i = 1; i <= count; i++) {
    pages.push({ name: i, href: `/showingtime?page=${i}` });
  }

  let times: any[] = [];
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
      goto(`/showingtime?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/showingtime?page=2`);
    }
    if (p <= pages.length) {
      goto(`/showingtime?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let editForm = async (id: string) => {
    ids = id;
    edit = true;
    formModal = true;
    const editData = await axios.get(endpoint + "showing/" + id, {
      headers: { Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}` },
    });
    let d = editData.data.showingtime[0];
    //console.log(d);
    formInput.date = new Date(d.showing_date);
    formInput.price = d.price;
    selectHall = d.hall_id;
    selectMovie = d.movie_id;
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

<main class=" z-10 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">Showing Time</h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/showingtime">Showing Time</BreadcrumbItem>
    </Breadcrumb>

    <Button on:click={addHall} outline pill
      ><span class="mr-5">Add Showing Time</span><PlusOutline />
    </Button>
  </div>
  <Table divClass="z-10 m-5 overflow-x-auto " hoverable={true}>
    <TableHead>
      <TableHeadCell>Poster</TableHeadCell>
      <TableHeadCell>Movie Name</TableHeadCell>
      <TableHeadCell>Location Name</TableHeadCell>
      <TableHeadCell>Hall Name</TableHeadCell>
      <TableHeadCell>Date</TableHeadCell>
      <TableHeadCell>Time</TableHeadCell>
      <TableHeadCell>Ticket Price</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each showing.showingTimes as showingtime}
        <TableBodyRow>
          <TableBodyCell
            ><img
              width="50"
              src={endpoint +
                "thumbnail/" +
                showingtime.movie.poster.substring(8) +
                "?h=96&w=54"}
              alt=""
            /></TableBodyCell
          >
          <TableBodyCell>{showingtime.movie.title}</TableBodyCell>
          <TableBodyCell
            >{showingtime.hall.location.location_name}</TableBodyCell
          >
          <TableBodyCell>{showingtime.hall.hall_name}</TableBodyCell>
          <TableBodyCell>
            {moment(showingtime.showing_date, [
              "YYYY-MM-DD",
              "DD-MM-YYYY",
            ]).format("DD MMMM YYYY")}
          </TableBodyCell>
          <TableBodyCell
            >{moment(showingtime.showing_date)
              .tz("Atlantic/Azores")
              .format("hh:mm A")}</TableBodyCell
          >
          <TableBodyCell>${showingtime.price}</TableBodyCell>
          <TableBodyCell tdClass="w-40">
            <div class="flex gap-5">
              <a href="/showingtime/{showingtime.showing_id}"><EyeOutline /></a>
              <button on:click={() => editForm(showingtime.showing_id)}
                ><EditOutline /></button
              >
              <button
                type="submit"
                on:click={() => {
                  deleteModal(showingtime.showing_id);
                }}><TrashBinOutline /></button
              >
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  {#if showing.count > 5}
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
    use:enhance={formSumbit}
  >
    {#if edit}
      <input type="hidden" name="h_id" value={ids} />
    {/if}

    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      {edit ? "Edit" : "Add"} Hall
    </h3>
    <div class="flex justify-between items-end gap-5">
      <div class="grow">
        <TextField
          fieldName="Time"
          iFieldName={iDate}
          name="none"
          bind:value={formInput.time}
          type="time"
        />
      </div>
      <input type="hidden" name="time" bind:value={times} />
      <Button
        on:click={() => {
          times.push(formInput.time);
          times = times;
        }}>Add Time</Button
      >
    </div>
    <div class="flex gap-5 flex-wrap">
      {#each times as time}
        <div
          class="flex gap-3 dark:text-white bg-primary-600 px-5 py-2 rounded-lg justify-center items-center"
        >
          <p>{time}</p>
          <button
            id="hover"
            type="button"
            on:click={() => {
              for (let i = 0; i < times.length; i++) {
                if (times[i] === time) {
                  times.splice(i, 1);
                  times = times;
                  return;
                }
              }
            }}><XCircleOutline /></button
          >
          <Tooltip triggeredBy="#hover">Remove</Tooltip>
        </div>
      {/each}
    </div>
    <TextField
      fieldName="Date"
      iFieldName={iDate}
      name="date"
      bind:value={formInput.date}
      type="date"
    />
    <TextField
      fieldName="Ticket Price"
      iFieldName={iPrice}
      name="price"
      bind:value={formInput.price}
      type="number"
    />
    <Label class="space-y-2">
      Select Hall
      <Select class="mt-2" items={hallItems} bind:value={selectHall} />
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
    <Label class="space-y-2">
      Select Movie
      <Select class="mt-2" items={movieItems} bind:value={selectMovie} />
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
    <input type="hidden" name="movie_id" bind:value={selectMovie} />
    <input type="hidden" name="hall_id" bind:value={selectHall} />
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
