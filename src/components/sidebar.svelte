<script lang="ts">
  import Logo from "../public/Logo.png";
  import { page } from "$app/stores";
  import {
    AddressCardSolid,
    ArrowRightToBracketOutline,
    BookOpenOutline,
    ClockOutline,
    FileCsvSolid,
    FileImageOutline,
    FilePdfOutline,
    FolderDuplicateOutline,
    ImageOutline,
    MapLocationOutline,
    TicketOutline,
    UserGroupSolid,
    UserSettingsOutline,
    VideoCameraOutline,
    WindowOutline,
  } from "flowbite-svelte-icons";
  import {
    Sidebar,
    SidebarWrapper,
    SidebarGroup,
    SidebarItem,
    NavBrand,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
  } from "flowbite-svelte";
  let spanClass = "flex-1 ml-3 whitespace-nowrap";
  $: activeUrl = $page.url.pathname;
</script>

<div class="bg-white dark:bg-gray-900 p-8">
  <NavBrand href="/">
    <img src={Logo} class="ml-3 w-40" alt="Legacy Cinema Logo" />
  </NavBrand>
</div>
<div
  class="pt-5 bg-white dark:bg-gray-900 h-screen flex flex-col items-center gap-10 z-30 overflow-y-auto"
>
  <Sidebar>
    <SidebarWrapper divClass="px-3 ">
      <SidebarGroup>
        <SidebarItem label="Dashboard" href="/" active={activeUrl === "/"}>
          <svelte:fragment slot="icon">
            <AddressCardSolid size="md" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          data-sveltekit-prefetch
          label="Slideshow"
          {spanClass}
          href="/slideshow"
          active={activeUrl === "/slideshow" ||
            activeUrl.substring(1, 6) === "slideshow"}
        >
          <svelte:fragment slot="icon">
            <ImageOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          data-sveltekit-prefetch
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

        <SidebarItem
          label="Showing Time"
          {spanClass}
          data-sveltekit-prefetch
          href="/showingtime"
          active={activeUrl === "/showingtime" ||
            activeUrl.substring(1, 12) === "showingtime"}
        >
          <svelte:fragment slot="icon">
            <ClockOutline />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem
          data-sveltekit-prefetch
          label="Tickets"
          {spanClass}
          href="/ticket"
          active={activeUrl === "/ticket" ||
            activeUrl.substring(0, 7) === "/ticket"}
        >
          <svelte:fragment slot="icon">
            <TicketOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          data-sveltekit-prefetch
          label="Booking"
          {spanClass}
          href="/booking"
          active={activeUrl === "/booking" ||
            activeUrl.substring(1, 8) === "booking"}
        >
          <svelte:fragment slot="icon">
            <BookOpenOutline />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem
          data-sveltekit-prefetch
          label="Location"
          {spanClass}
          href="/location"
          active={activeUrl === "/location" ||
            activeUrl.substring(1, 9) === "location"}
        >
          <svelte:fragment slot="icon">
            <MapLocationOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          data-sveltekit-prefetch
          label="Hall"
          {spanClass}
          href="/hall"
          active={activeUrl === "/hall" || activeUrl.substring(1, 5) === "hall"}
        >
          <svelte:fragment slot="icon">
            <WindowOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          data-sveltekit-prefetch
          label="Departments"
          {spanClass}
          href="/department"
          active={activeUrl === "/department" ||
            activeUrl.substring(1, 6) === "department"}
        >
          <svelte:fragment slot="icon">
            <UserSettingsOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          data-sveltekit-prefetch
          label="Employee"
          {spanClass}
          href="/employee"
          active={activeUrl === "/employee" ||
            activeUrl.substring(1, 6) === "employee"}
        >
          <svelte:fragment slot="icon">
            <UserGroupSolid />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarDropdownWrapper label="Reports">
          <svelte:fragment slot="icon">
            <FilePdfOutline />
          </svelte:fragment>
          <SidebarDropdownItem href="/revenue" label="Revenue" />
          <SidebarDropdownItem href="/booking-hour" label="Booking Hour" />
          <SidebarDropdownItem
            href="/most-watched-movie"
            label="Most Watched Movie"
          />
          <SidebarDropdownItem
            href="/most-booked-cinema"
            label="Most Booked Cinema"
          />
          <SidebarDropdownItem
            href="/most-watched-movie"
            label="Most Watched Movie"
          />
        </SidebarDropdownWrapper>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem label="Sign Out" href="/logout" {spanClass}>
          <svelte:fragment slot="icon">
            <ArrowRightToBracketOutline />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>
