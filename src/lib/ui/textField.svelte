<script lang="ts">
  import type { Snapshot } from "@sveltejs/kit";
  import { Label, Helper, Input } from "flowbite-svelte";
  import type { InputType } from "flowbite-svelte/dist/types";

  export let fieldName = "";
  export let value: any = "";
  export let iFieldName = 0;
  export let holder = "";
  export let name = "";
  export let type: InputType = "text";
  export let message = "";

  export const snapshot: Snapshot = {
    capture: () => value,
    restore: (v) => (value = v),
  };
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
