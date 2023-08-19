<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Input,
    Label,
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
  let totalAmount;
  let revenue;
  $: totalAmount = data.data.totalRevenue;
  $: revenue = data.data.sales;
  const formattedNumber = (amount: String) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  console.log(data.data.sales);
</script>

<main class=" z-0 mt-20 container mx-auto">
  <div class="flex justify-between items-center">
    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-black dark:text-white text-2xl m-4">Total Revenue</h1>
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
      <TableHeadCell>Status</TableHeadCell>
      <TableHeadCell>Payment Type</TableHeadCell>
      <TableHeadCell>Showing Date</TableHeadCell>
      <TableHeadCell>Transaction Date</TableHeadCell>
      <TableHeadCell>Amount</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each revenue as sale}
        <TableBodyRow>
          <TableBodyCell>{sale.tickets.Showingtime.movie.title}</TableBodyCell>
          <TableBodyCell
            >{sale.tickets.isBooking ? "Booking" : "Visit"}</TableBodyCell
          >
          <TableBodyCell>{sale.payment_type}</TableBodyCell>
          <TableBodyCell
            >{moment(sale.tickets.Showingtime.showing_date)
              .tz("Atlantic/Reykjavik")
              .format("LL")}</TableBodyCell
          >
          <TableBodyCell
            >{moment(sale.transaction_date)
              .tz("Atlantic/Reykjavik")
              .format("LL")}</TableBodyCell
          >
          <TableBodyCell>{formattedNumber(sale.total_amount)}</TableBodyCell>
        </TableBodyRow>
      {/each}
      <TableBodyRow>
        <TableBodyCell />
        <TableBodyCell />
        <TableBodyCell />
        <TableBodyCell />
        <TableBodyCell>Total:</TableBodyCell>
        <TableBodyCell tdClass="font-bold"
          >{formattedNumber(totalAmount)}</TableBodyCell
        >
      </TableBodyRow>
    </TableBody>
  </Table>
</main>
