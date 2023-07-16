<script>
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/sidebar.svelte";
</script>

<title>Legacy Cinema | Admin Page</title>

<div class="flex">
  <div class="w-72">
    <div class="fixed">
      <Sidebar />
    </div>
  </div>
  <div class="self-top w-full">
    <div class="">
      <Navbar />
    </div>
    <slot />
  </div>
</div>
