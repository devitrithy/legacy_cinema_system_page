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
  import moment from "moment-timezone";

  export let data: PageData;
  let movies = data.data;
</script>

<main class=" z-0 mt-20 container mx-auto">
  <div class="flex justify-between items-center">
    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-black dark:text-white text-2xl m-4">
          Most Watched Movie
        </h1>
      </div>
      <div class="m-4 flex justify-between items-center print">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
          <BreadcrumbItem href="/most-watched-movie"
            >Most Watched Movie</BreadcrumbItem
          >
        </Breadcrumb>
      </div>
    </div>
    <div class="print flex gap-5 items-end">
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
      <TableHeadCell>Genre</TableHeadCell>
      <TableHeadCell>Release Date</TableHeadCell>
      <TableHeadCell>Duration</TableHeadCell>
      <TableHeadCell>Ticket Count</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each movies as movie}
        <TableBodyRow>
          <TableBodyCell>{movie.movieTitle}</TableBodyCell>
          <TableBodyCell>{movie.genre}</TableBodyCell>
          <TableBodyCell>{moment(movie.releaseDate).format("LL")}</TableBodyCell
          >
          <TableBodyCell>{movie.time} Minutes</TableBodyCell>
          <TableBodyCell>{movie.ticketCount}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</main>
