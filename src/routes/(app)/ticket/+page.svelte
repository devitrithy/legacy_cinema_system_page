<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Chevron,
    Dropdown,
    DropdownItem,
    Input,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import moment from "moment-timezone";
  import { ClockOutline, TicketOutline } from "flowbite-svelte-icons";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  let endpoint = `${PUBLIC_API_ENDPOINT}/thumbnail/`;
  let nextDay = (day: Number) => {
    return new Date(Date.now() + 3600 * 1000 * 24 * day);
  };

  let dropdownOpen = false;
  export let data: PageData;
  let showings: any = [];
  $: showings = data.data;
</script>

<main class=" z-10 mt-20 container mx-auto">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-black dark:text-white text-2xl m-4">Tickets</h1>
      <div class="m-4 flex justify-between items-center">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
          <BreadcrumbItem href="/showingtime">Tickets</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <Button><Chevron>Select Date</Chevron></Button>
      <Dropdown bind:open={dropdownOpen}>
        <DropdownItem
          data-sveltekit-prefetch
          href={"/ticket?day=" +
            new Date(nextDay(0))
              .toDateString()
              .substring(0, 15)
              .substring(8, 10)}
          >{new Date(nextDay(0)).toDateString().substring(0, 15)}</DropdownItem
        >
        <DropdownItem
          data-sveltekit-prefetch
          href={"/ticket?day=" +
            new Date(nextDay(1))
              .toDateString()
              .substring(0, 15)
              .substring(8, 10)}
          >{new Date(nextDay(1)).toDateString().substring(0, 15)}</DropdownItem
        >
        <DropdownItem
          data-sveltekit-prefetch
          href={"/ticket?day=" +
            new Date(nextDay(2))
              .toDateString()
              .substring(0, 15)
              .substring(8, 10)}
          >{new Date(nextDay(2)).toDateString().substring(0, 15)}</DropdownItem
        >
        <DropdownItem
          data-sveltekit-prefetch
          href={"/ticket?day=" +
            new Date(nextDay(3))
              .toDateString()
              .substring(0, 15)
              .substring(8, 10)}
          >{new Date(nextDay(3)).toDateString().substring(0, 15)}</DropdownItem
        >
        <DropdownItem
          data-sveltekit-prefetch
          href={"/ticket?day=" +
            new Date(nextDay(4))
              .toDateString()
              .substring(0, 15)
              .substring(8, 10)}
          >{new Date(nextDay(4)).toDateString().substring(0, 15)}</DropdownItem
        >
      </Dropdown>
    </div>
  </div>
  <div class="flex gap-10 w-full flex-wrap">
    {#each showings as movie}
      {#if movie.ShowingTime.length > 0}
        <div class="relative">
          <img
            src={endpoint + movie.poster.substring(8) + "?h=384&w=216"}
            alt={movie.title}
          />
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {movie.title}
          </h5>
          <p
            class="mb-3 font-normal text-gray-700 dark:text-white text-2xl leading-tight flex items-center gap-3"
          >
            <TicketOutline /> ${movie.ShowingTime[0].price}
          </p>
          <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight flex items-center gap-3"
          >
            <ClockOutline />
            {movie.time} Minutes
          </p>
          <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight flex items-center gap-3"
          >
            {movie.genre}
          </p>

          <div class="flex flex-wrap gap-5">
            {#each movie.ShowingTime as s}
              <Button>
                <a href={`/ticket/${s.showing_id}`} class="text-xl">
                  {moment(s.showing_date).tz("Atlantic/Reykjavik").format("LT")}
                </a>
              </Button>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</main>
