<script lang="ts">
  import { Seat } from "$lib";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Indicator,
    Tooltip,
  } from "flowbite-svelte";
  export let data;
  const endpoint = "https://cinemaapi.serveo.net/thumbnail/";
  let disabled = true;
  const { tickets, showings } = data;
  let showing = showings.showingtime[0];

  let selected: String[] = [];
  const select = (seatNumber: String) => {
    for (let index = 0; index < selected.length; index++) {
      if (seatNumber === selected[index]) {
        selected.splice(index, 1);
        selected = selected;
        return;
      }
    }
    selected.push(seatNumber);
    selected = selected;
  };
  $: console.log(selected);
  let total;
  $: total = showing.price * selected.length;
</script>

<main class=" z-10 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">
    Select Seat
    <div class="m-4 flex justify-between items-center">
      <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
        <BreadcrumbItem href="/ticket">Ticket</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </h1>
  <div class="flex justify-between gap-10">
    <main class="bg-stone-950 px-10 py-10">
      <div
        class="border dark:border-gray-600 h-16 mx-5 mb-10 flex justify-center items-center"
      >
        <h1 class="dark:text-white text-3xl">Screen</h1>
      </div>
      <div class="flex">
        <div class="grid w-5 dark:text-white my-5 justify-center items-center">
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p>F</p>
          <p>G</p>
          <p>H</p>
          <p>I</p>
        </div>
        <div class="grid grid-cols-20 m-5">
          {#each tickets as seat}
            <div id={`hover${seat.id}`}>
              <Tooltip
                triggeredBy={`#hover${seat.id}`}
                color={seat.selected ? "red" : "green"}
                class="text-2xl">{seat.seatNumber}</Tooltip
              >
              {#if seat.selected}
                <Seat isAvailable={false} />
              {:else}
                <div on:click={() => select(seat.seatNumber)}>
                  <Seat />
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <div class="dark:text-white flex justify-center gap-10">
        <span class="flex items-center"
          ><Indicator size="sm" color="red" class="mr-1.5" />Unavailable</span
        >
        <span class="flex items-center"
          ><Indicator size="sm" color="gray" class="mr-1.5" />Available</span
        >
        <span class="flex items-center"
          ><Indicator size="sm" color="green" class="mr-1.5" />Selected</span
        >
      </div>
    </main>
    <aside
      class="w-1/3 h-full outline rounded-lg dark:outline-slate-700 dark:text-white flex flex-col p-5 gap-5"
    >
      <div class="flex gap-10">
        <img
          width="184"
          height="274"
          src={endpoint + showing.movie.poster.substring(8) + "?w=184&h=274"}
          alt=""
        />
        <div class="flex flex-col gap-5">
          <h1>
            Title: <span class=" font-bold">{showing.movie.title}</span>
          </h1>
          <h1>
            Location: <span class="font-bold"
              >{showing.hall.location.location_name}</span
            >
          </h1>
          <h1>Hall: <span class="font-bold">{showing.hall.hall_name}</span></h1>
        </div>
      </div>
      <h1>Total: <span class="font-bold">${total}</span></h1>
      <h1>
        Seat:
        {#each selected as select}
          <span class="mx-1">
            {select}
          </span>
        {/each}
      </h1>
      <form action="?/pay" method="post" class="w-[100%]">
        <input type="hidden" name="pay" bind:value={selected} />
        <Button type="submit" {disabled}>Pay</Button>
      </form>
    </aside>
  </div>
</main>
