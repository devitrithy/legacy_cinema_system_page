<script lang="ts">
  import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Search,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Tooltip,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import moment from "moment-timezone";
  import { EyeOutline, SearchOutline } from "flowbite-svelte-icons";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import toast, { Toaster } from "svelte-french-toast";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  export let data: PageData;
  let booking;
  $: booking = data.booking;
  let loading = false;

  const recived: SubmitFunction = () => {
    loading = true;
    return async ({ result, update }) => {
      //console.log(result.type);
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          toast.success("Customer successfully recived the ticket.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "error":
          toast.error("Error while change status.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed change status.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;

        default:
          break;
      }
    };
  };
  let search;

  let searchBooking = data.booking.booked.map((c: any) => ({
    ...c,
    searchTerms: `${c.Showingtime.movie.title} ${c.users.username} ${c.users.firstname} ${c.users.lastname} ${c.ticket_id} ${c.users.user_id}`,
  }));

  const searchStore = createSearchStore(searchBooking);

  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<Toaster />

<main class=" z-0 mt-20 container mx-auto">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-black dark:text-white text-2xl m-4">Booking Tickets</h1>
      <div class="m-4 flex justify-between items-center">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
          <BreadcrumbItem href="/booking">Booking</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <form class="flex gap-2">
      <Search size="md" bind:value={$searchStore.search} />
      <Button class="!p-2.5">
        <SearchOutline />
      </Button>
    </form>
  </div>
  <Table>
    <TableHead>
      <TableHeadCell>#</TableHeadCell>
      <TableHeadCell>Seat</TableHeadCell>
      <TableHeadCell>Title</TableHeadCell>
      <TableHeadCell>Show Time</TableHeadCell>
      <TableHeadCell>Username</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each $searchStore.filtered as booked}
        <TableBodyRow>
          <TableHeadCell>#</TableHeadCell>
          <TableBodyCell
            ><button id={`click_${booked.ticket_id}`}><EyeOutline /></button
            ></TableBodyCell
          >
          <TableHeadCell>{booked.Showingtime.movie.title}</TableHeadCell>
          <TableHeadCell
            >{moment(booked.Showingtime.showing_date)
              .tz("Atlantic/Reykjavik")
              .format("LLL")}</TableHeadCell
          >
          <TableHeadCell>{booked.users.username}</TableHeadCell>
          <TableHeadCell>
            {#if booked.isRecived}
              <button disabled
                ><Badge large color="green">Recived</Badge></button
              >
            {:else}
              <form method="post" use:enhance={recived}>
                <button>
                  <Badge large color="yellow">Not Recived</Badge></button
                >
                <input type="hidden" name="tid" bind:value={booked.ticket_id} />
              </form>
            {/if}
          </TableHeadCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>

{#each booking.booked as booked}
  <Tooltip
    trigger="click"
    triggeredBy={`#click_${booked.ticket_id}`}
    class="max-w-60 w-60 overflow-auto"
    placement="bottom"
  >
    <div class="flex gap-1 flex-wrap">
      {#each booked.TicketDetails as ticket}
        <p class="w-10 text-center py-1 bg-slate-800 text-xl">{ticket.seat}</p>
      {/each}
    </div>
  </Tooltip>
{/each}
