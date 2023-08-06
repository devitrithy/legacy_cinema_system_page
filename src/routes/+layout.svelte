<script>
  import { page } from "$app/stores";
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/sidebar.svelte";
  // export let data;
  // let user = data.user || null;
  // let pf;
  // if (!user.profile) {
  //   pf = "1691002845965.webp";
  // } else {
  //   pf = user.profile.substring(8);
  // }

  // FIX: Please fix this becsae it's bug the whole proccess
  // let profile = `https://cinemaapi.serveo.net/thumbnail/${pf}?w=25&h=25`;
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
        <!-- <Navbar email={user.email || ""} {profile} user={user.username || ""} /> -->
        <Navbar />
      </div>
      <slot />
    </div>
  </div>
{:else}
  <slot />
{/if}
