<script lang="ts">
  import Logo from "../public/Logo.png";
  import { page } from "$app/stores";
  import {
    AddressCardSolid,
    TagOutline,
    VideoCameraOutline,
  } from "flowbite-svelte-icons";
  import {
    Sidebar,
    SidebarWrapper,
    SidebarGroup,
    SidebarItem,
    NavBrand,
  } from "flowbite-svelte";
  let spanClass = "flex-1 ml-3 whitespace-nowrap";
  $: activeUrl = $page.url.pathname;
  $: console.log(activeUrl.substring(1, 6));
</script>

<div
  class="pt-5 bg-white dark:bg-gray-900 h-screen flex flex-col items-center gap-10 z-30"
>
  <NavBrand href="/">
    <img src={Logo} class="ml-3 w-40" alt="Legacy Cinema Logo" />
  </NavBrand>
  <Sidebar>
    <SidebarWrapper divClass="px-3 ">
      <SidebarGroup>
        <SidebarItem label="Dashboard" href="/" active={activeUrl === "/"}>
          <svelte:fragment slot="icon">
            <AddressCardSolid size="md" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="Movie"
          {spanClass}
          href="/movie"
          active={activeUrl === "/movie" ||
            activeUrl.substring(1, 6) === "movie"}
        >
          <svelte:fragment slot="icon">
            <VideoCameraOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Genre" {spanClass}>
          <svelte:fragment slot="icon">
            <TagOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Users">
          <svelte:fragment slot="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              /></svg
            >
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Sign In">
          <svelte:fragment slot="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              /></svg
            >
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Sign UP">
          <svelte:fragment slot="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              /></svg
            >
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>
