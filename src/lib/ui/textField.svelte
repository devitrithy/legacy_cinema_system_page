<script>
  import { Label, Helper, Input } from "flowbite-svelte";

  export let fieldName = "Unknown";
  export let value = "Unknown value";
  export let iFieldName = 0;
  export let holder = "Unknown placeholder";
  export let name = "Unknown";
</script>

<Label class="space-y-2">
  <span>{fieldName}</span>
  <Input
    color={iFieldName == 0 ? "base" : iFieldName == 1 ? "red" : "green"}
    type="text"
    {name}
    bind:value
    placeholder={holder}
  />
  {#if iFieldName == 1}
    <Helper class="mt-2" color="red"
      ><span class="font-medium">Invalid!</span>
      {fieldName} is required!</Helper
    >
  {:else if iFieldName === 2}
    <Helper class="mt-2" color="green"
      ><span class="font-medium">Well done!</span> {fieldName} is valid.</Helper
    >
  {/if}
</Label>
