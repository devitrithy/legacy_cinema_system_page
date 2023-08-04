<script>
  export let title = "";
  export let imageUrl = "";
  export let description = "";
</script>

<div class="shadow-lg rounded-lg bg-white overflow-hidden">
  <img class="w-full h-40 object-cover" src={imageUrl} alt={title} />

  <div class="p-4">
    <h2 class="text-xl font-semibold mb-2">{title}</h2>
    <p class="text-gray-600">{description}</p>
  </div>
</div>

<style>
  /* Customize card styles here if needed */
</style>
