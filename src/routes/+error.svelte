<script>
  import { page } from "$app/stores";
</script>

<div
  class="flex flex-col gap-4 items-center justify-center text-black dark:text-white"
>
  {#if $page.status === 404}
    <h1>{$page.status} {$page.error.message}</h1>
    <span style="font-size: 10em">
      {$page.status}
    </span>
    <p>
      You’re either misspelling the URL or requesting a page that's no longer
      here.
    </p>
    <a href="/" class="underline">Click here to go to home page</a>
  {:else}
    <h1>{$page.status} {$page.error.message}</h1>
    <span style="font-size: 10em">
      {$page.status}
    </span>
    <p>Something went wrong with the connection please try again later.</p>
    <a href="/" class="underline">Click here to go to home page</a>
  {/if}
</div>
