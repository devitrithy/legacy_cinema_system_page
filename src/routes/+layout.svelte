<script>
  import "../app.postcss";
  import Navbar from "../components/navbar.svelte";
  import Sidebar from "../components/sidebar.svelte";
</script>

<title>Legacy Cinema | Admin Page</title>

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
