<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data);
</script>

<main class=" z-10 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">Tickets</h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/showingtime">Tickets</BreadcrumbItem>
    </Breadcrumb>
  </div>
</main>
