<script>
  import { page } from "$app/stores";
  import { SpeedDial, SpeedDialButton } from "flowbite-svelte";
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/sidebar.svelte";
  import { VideoCameraOutline } from "flowbite-svelte-icons";
  // export let data;
  // let user = data.user;

  // let pf = user.profile.substring(8) | "1691002845965.webp";
  // FIX: Please fix this becsae it's bug the whole proccess
  // let profile = `https://cinemaapi.serveo.net/thumbnail/${pf})}?w=25&h=25`;
</script>

<title>Legacy Cinema | Admin Page</title>

{#if $page.url.pathname !== "/login"}
  <div class="flex">
    <div class="w-72 container hidden 2xl:block z-50">
      <div class="fixed">
        <Sidebar />
      </div>
    </div>
    <div class="self-top w-full">
      <div>
        <Navbar />
      </div>
      <slot />
    </div>
  </div>
{:else}
  <slot />
{/if}
