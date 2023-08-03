<script>
  import { Label, Helper, Input } from "flowbite-svelte";

  export let fieldName = "";
  export let value = "";
  export let iFieldName = 0;
  export let holder = "";
  export let name = "";
  export let type = "text";
  export let message = "";
</script>

<Label class="space-y-2">
  <span>{fieldName}</span>
  <Input
    color={iFieldName == 0 ? "base" : iFieldName == 1 ? "red" : "green"}
    {type}
    {name}
    bind:value
    placeholder={holder}
  />
  {#if iFieldName == 1 && message !== null}
    <Helper class="mt-2" color="red"
      ><span class="font-medium">{message}</span></Helper
    >
  {:else if iFieldName === 2}
    <Helper class="mt-2" color="green"
      ><span class="font-medium">{message}</span></Helper
    >
  {/if}
</Label>
