<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Toggle,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import moment from "moment";
  let endpoint = "https://cinemaapi.serveo.net/thumbnail/";

  export let data: PageData;
  let showings = data.data;
  console.log(data.data);
</script>

<main class=" z-10 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">Tickets</h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/showingtime">Tickets</BreadcrumbItem>
    </Breadcrumb>
  </div>
  {#each showings as showing}
    <p class="text-black dark:text-white text-2xl font-light">
      {moment(showing.showing_date, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
        "DD MMMM YYYY"
      )}
    </p>
    <Card padding="none">
      <a href="/">
        <img
          class="p-8 rounded-t-lg"
          src={endpoint + showing.movie.poster.substring(8) + "?w=200&h=300"}
          alt="product 1"
        />
      </a>
      <div class="px-5 pb-5">
        <a href="/">
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h5>
        </a>
        <div class="flex justify-between items-center">
          <span class="text-3xl font-bold text-gray-900 dark:text-white"
            >$543</span
          >
          <Button href="/">Buy now</Button>
        </div>
      </div>
    </Card>
  {/each}
</main>
