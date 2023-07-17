<script lang="ts">
  import {
    DarkMode,
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Button,
    Search,
  } from "flowbite-svelte";
  export let profile = "";
  export let user = "Rithy Devit";
  export let email = "devit@gmail.com";
</script>

<div
  class="flex p-3 fixed top-0 bg-white dark:bg-gray-900 w-full justify-around"
>
  <div class="flex items-center md:order-2 gap-5">
    <DarkMode />
    <Avatar id="avatar-menu" src={profile} />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm"> {user} </span>
      <span class="block truncate text-sm font-medium">
        {email}
      </span>
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
  <div class="hidden relative md:block">
    <form class="flex gap-2 w-full lg:w-[500px]">
      <Search size="md" placeholder="Search...." />
      <Button class="!p-2.5">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          /></svg
        >
      </Button>
    </form>
  </div>
</div>
