<script>
  import { page } from "$app/stores";
  import { SpeedDial, SpeedDialButton } from "flowbite-svelte";
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/sidebar.svelte";
  import { VideoCameraOutline } from "flowbite-svelte-icons";
  export let data;
  console.log(data);
  console.log($page.url.pathname);
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
    <SpeedDial defaultClass="absolute right-6 bottom-6">
      <a href="/movie?add=1">
        <SpeedDialButton name="Movie">
          <VideoCameraOutline />
        </SpeedDialButton>
      </a>
      <SpeedDialButton name="Print">
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
            clip-rule="evenodd"
          /></svg
        >
      </SpeedDialButton>
      <SpeedDialButton name="Download">
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            clip-rule="evenodd"
            d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1.586l-.293-.293a.999.999 0 10-1.414 1.414l2 2a.999.999 0 001.414 0l2-2a.999.999 0 10-1.414-1.414l-.293.293V9z"
            fill-rule="evenodd"
          /></svg
        >
      </SpeedDialButton>
      <SpeedDialButton name="Copy">
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
          /><path
            d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
          /></svg
        >
      </SpeedDialButton>
    </SpeedDial>
  </div>
{:else}
  <slot />
{/if}
