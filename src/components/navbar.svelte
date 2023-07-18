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
  class="flex p-3 fixed bg-white dark:bg-gray-900 w-full 2xl:w-[88%] px-20 justify-between"
>
  <div class="flex items-center md:order-2 gap-5">
    <div
      id="bell"
      class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
    >
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
        /></svg
      >
      <div class="flex relative">
        <div
          class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
        />
      </div>
    </div>
    <Dropdown
      triggeredBy="#bell"
      class="w-full max-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
    >
      <div slot="header" class="text-center py-2 font-bold">Notifications</div>
      <DropdownItem class="flex space-x-4">
        <Avatar
          src="/images/profile-picture-1.webp"
          dot={{ color: "bg-gray-300" }}
          rounded
        />
        <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
            New message from <span
              class="font-semibold text-gray-900 dark:text-white"
              >Jese Leos</span
            >: "Hey, what's up? All set for the presentation?"
          </div>
          <div class="text-xs text-primary-600 dark:text-primary-500">
            a few moments ago
          </div>
        </div>
      </DropdownItem>
      <DropdownItem class="flex space-x-4">
        <Avatar
          src="/images/profile-picture-2.webp"
          dot={{ color: "bg-red-400" }}
          rounded
        />
        <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white"
              >Joseph Mcfall</span
            >
            and
            <span class="font-medium text-gray-900 dark:text-white"
              >5 others</span
            > started following you.
          </div>
          <div class="text-xs text-primary-600 dark:text-primary-500">
            10 minutes ago
          </div>
        </div>
      </DropdownItem>
      <DropdownItem class="flex space-x-4">
        <Avatar
          src="/images/profile-picture-3.webp"
          dot={{ color: "bg-green-400" }}
          rounded
        />
        <div class="pl-3 w-full">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
            <span class="font-semibold text-gray-900 dark:text-white"
              >Bonnie Green</span
            >
            and
            <span class="font-medium text-gray-900 dark:text-white"
              >141 others</span
            > love your story. See it and view more stories.
          </div>
          <div class="text-xs text-primary-600 dark:text-primary-500">
            44 minutes ago
          </div>
        </div>
      </DropdownItem>
      <a
        slot="footer"
        href="/"
        class="block py-2 -my-1 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
      >
        <div class="inline-flex items-center">
          <svg
            class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            /></svg
          >
          View all
        </div>
      </a>
    </Dropdown>

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
    <form class="flex gap-2 w-full lg:w-[300px]">
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
