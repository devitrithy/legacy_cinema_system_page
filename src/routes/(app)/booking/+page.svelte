<script lang="ts">
  import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Spinner,
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
  import { EyeOutline } from "flowbite-svelte-icons";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import toast from "svelte-french-toast";
  export let data: PageData;
  let booking = data.booking;
  let loading = false;

  const recived: SubmitFunction = () => {
    loading = true;
    return async ({ result, update }) => {
      console.log(result.type);
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          toast.success("Successfully added the movie.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
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
  console.log(booking);
</script>

<main class=" z-0 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">Booking Tickets</h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/booking">Booking</BreadcrumbItem>
    </Breadcrumb>
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
      {#each booking.booked as booked}
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
              <button><Badge large color="green">Recived</Badge></button>
            {:else}
              <form method="post" use:enhance={recived}>
                <button>
                  <Badge large color="yellow">
                    {#if loading}
                      <Spinner size="4" /> Not Recived
                    {:else}
                      Not Recived
                    {/if}
                  </Badge></button
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
    class="w-60 overflow-auto"
    placement="bottom"
  >
    <div class="flex gap-1 flex-wrap">
      {#each booked.TicketDetails as ticket}
        <p class="w-10 text-center py-1 bg-slate-800 text-xl">{ticket.seat}</p>
      {/each}
    </div>
  </Tooltip>
{/each}
