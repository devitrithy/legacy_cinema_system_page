<script lang="ts">
  import selected from "./select.png";
  import notSelect from "./notselect.png";
  import notAvailable from "./notavailble.png";
  import { Img } from "flowbite-svelte";
  export let isSelected: boolean = false;
  export let isAvailable: boolean = true;
</script>

{#if isAvailable}
  {#if isSelected}
    <div on:click={() => (isSelected = !isSelected)}>
      <Img src={selected} imgClass="w-12" />
    </div>
  {:else}
    <div on:click={() => (isSelected = !isSelected)}>
      <Img src={notSelect} imgClass="w-12" />
    </div>
  {/if}
{:else}
  <Img src={notAvailable} imgClass="w-12" />
{/if}
