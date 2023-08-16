<script lang="ts">
  import selected from "../../public/5/select.png";
  import notSelect from "../../public/5/notselect.png";
  import notAvailable from "../../public/5/notavailble.png";
  import { Img } from "flowbite-svelte";
  export let isSelected: boolean = false;
  export let isAvailable: boolean = true;
</script>

{#if isAvailable}
  {#if isSelected}
    <button on:click={() => (isSelected = !isSelected)}>
      <Img src={selected} imgClass="w-10" />
    </button>
  {:else}
    <button on:click={() => (isSelected = !isSelected)}>
      <Img src={notSelect} imgClass="w-10" />
    </button>
  {/if}
{:else}
  <Img src={notAvailable} imgClass="w-10" />
{/if}
