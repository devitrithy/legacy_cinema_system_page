<script lang="ts">
  import {
    Label,
    Input,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import moment from "moment-timezone";
  function convertToFormattedTime(hour) {
    if (hour >= 0 && hour <= 23) {
      const date = new Date();
      date.setHours(hour, 0, 0, 0);

      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);

      return formattedTime;
    } else {
      return "Invalid hour";
    }
  }
  export let data: PageData;
  let bookingHours = data.data.mostBookedHours;
</script>

<main class=" z-0 mt-20 container mx-auto">
  <div class="flex justify-between items-center">
    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-black dark:text-white text-2xl m-4">
          Most Booking Hours
        </h1>
      </div>
      <div class="m-4 flex justify-between items-center print">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
          <BreadcrumbItem href="/booking">Most Booking Hours</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <div class="print flex gap-5 items-end">
      <form method="get" class="flex gap-5 items-end">
        <Label
          >Start Date
          <Input type="date" name="startDate" id="" /></Label
        >
        <Label
          >End Date
          <Input type="date" name="endDate" id="" /></Label
        >
        <Button type="submit">Sort</Button>
      </form>
      <Button
        outline
        on:click={() => {
          window.print();
        }}>Print</Button
      >
    </div>
  </div>
  <Table>
    <TableHead>
      <TableHeadCell>Title</TableHeadCell>
      <TableHeadCell>Cinema</TableHeadCell>
      <TableHeadCell>Booking At</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each bookingHours as booking}
        {#if booking.Tickets.length > 0}
          {#each booking.Tickets as booked}
            <TableBodyRow>
              <TableBodyCell>{booking.movie.title}</TableBodyCell>
              <TableBodyCell
                >{booking.hall.location.location_name}</TableBodyCell
              >
              <TableBodyCell
                >{moment(booked.create_at).format("LT")}</TableBodyCell
              >
            </TableBodyRow>
          {/each}
        {/if}
      {/each}
      <TableBodyCell />
      <TableBodyCell>Average Booking Hours:</TableBodyCell>
      <TableBodyCell
        ><span class="font-bold underline"
          >{convertToFormattedTime(data.data.peakHours)}</span
        ></TableBodyCell
      >
    </TableBody>
  </Table>
</main>
