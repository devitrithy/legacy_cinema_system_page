<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Input,
  } from "flowbite-svelte";
  import { Ca } from "$lib";
  import type { PageData } from "./$types";
  import moment from "moment";
  import { ClockOutline, TicketOutline } from "flowbite-svelte-icons";
  let endpoint = "https://cinemaapi.serveo.net/thumbnail/";
  let day = new Date().toISOString().slice(0, 10);

  export let data: PageData;
  let showings = data.data;
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
    <form method="get" class="flex gap-5">
      <!-- // -->
      <Input type="date" bind:value={day} name="day" />
      <Button type="submit">Confirm</Button>
    </form>
  </div>
  <div class="flex gap-10 w-full overflow-x-scroll">
    {#each showings as movie}
      {#if movie.ShowingTime.length > 0}
        <div>
          <Card class="w-[384px]">
            <img
              src={endpoint + movie.poster.substring(8) + "?h=384&w=216"}
              height="384"
              width="216"
              alt=""
              srcset=""
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
                  {moment(s.showing_date)
                    .tz("Atlantic/Azores")
                    .format("hh:mm A")}
                </Button>
              {/each}
            </div>
          </Card>
        </div>
      {/if}
    {/each}
  </div>
</main>
