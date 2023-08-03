<script>
  import { page } from "$app/stores";
</script>

<div
  class="flex flex-col gap-4 items-center justify-center text-black dark:text-white"
>
  <div id="main">
    <div class="fof">
      <h1 class="mb-5">Error {$page.status}</h1>
      <p class="mb-5">
        {$page.error?.message}
      </p>
      <a href="/" class="underline">Click here to go to home page</a>
    </div>
  </div>
</div>

<style>
  #main {
    display: table;
    width: 100%;
    height: 90vh;
    text-align: center;
  }

  .fof {
    display: table-cell;
    vertical-align: middle;
  }

  .fof h1 {
    font-size: 50px;
    display: inline-block;
    padding-right: 12px;
    animation: type 0.5s alternate infinite;
  }

  @keyframes type {
    from {
      box-shadow: inset -3px 0px 0px #888;
    }
    to {
      box-shadow: inset -3px 0px 0px transparent;
    }
  }
</style>
