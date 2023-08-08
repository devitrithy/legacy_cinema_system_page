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
    <div on:click={() => (isSelected = !isSelected)}>
      <Img src={selected} imgClass="w-10" />
    </div>
  {:else}
    <div on:click={() => (isSelected = !isSelected)}>
      <Img src={notSelect} imgClass="w-10" />
    </div>
  {/if}
{:else}
  <Img src={notAvailable} imgClass="w-10" />
{/if}
