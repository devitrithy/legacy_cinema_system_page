<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Label,
    Input,
    Button,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  //console.log(data.data);
</script>

<main class=" z-0 mt-20 container mx-auto">
  <div class="flex justify-between items-center">
    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-black dark:text-white text-2xl m-4">
          Most Booked Cinema
        </h1>
      </div>
      <div class="m-4 flex justify-between items-center print">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
          <BreadcrumbItem href="/booking">Most Booking Cinema</BreadcrumbItem>
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
      <TableHeadCell>Booking Count</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each data.data.sortedShowings as cinema}
        <TableBodyRow>
          <TableBodyCell>{cinema.movieTitle}</TableBodyCell>
          <TableBodyCell>{cinema.location}</TableBodyCell>
          <TableBodyCell>{cinema.bookingCount}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>
