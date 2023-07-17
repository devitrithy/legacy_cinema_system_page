<script lang="ts">
  import Logo from "../public/Logo.png";
  import { page } from "$app/stores";
  import {
    AddressCardSolid,
    ArrowRightArrowLeftOutline,
    ArrowRightToBracketOutline,
    BookOpenOutline,
    ClockOutline,
    FileCsvSolid,
    FilePdfOutline,
    FolderDuplicateOutline,
    LockOpenOutline,
    MapLocationOutline,
    TicketOutline,
    UserGroupSolid,
    UserOutline,
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
  } from "flowbite-svelte";
  let spanClass = "flex-1 ml-3 whitespace-nowrap";
  $: activeUrl = $page.url.pathname;
  $: console.log(activeUrl.substring(1, 6));
</script>

<div
  class="pt-5 bg-white dark:bg-gray-900 h-screen flex flex-col items-center gap-10 z-30 overflow-y-auto"
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

        <SidebarItem
          label="Showing Time"
          {spanClass}
          href="/showingtime"
          active={activeUrl === "/showingtime" ||
            activeUrl.substring(1, 12) === "showingtime"}
        >
          <svelte:fragment slot="icon">
            <ClockOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="Tickets"
          {spanClass}
          href="/ticket"
          active={activeUrl === "/ticket" ||
            activeUrl.substring(1, 6) === "ticket"}
        >
          <svelte:fragment slot="icon">
            <TicketOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
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
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem
          label="User"
          {spanClass}
          href="/user"
          active={activeUrl === "/user" || activeUrl.substring(1, 6) === "user"}
        >
          <svelte:fragment slot="icon">
            <UserOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="Job"
          {spanClass}
          href="/job"
          active={activeUrl === "/job" || activeUrl.substring(1, 6) === "job"}
        >
          <svelte:fragment slot="icon">
            <UserSettingsOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="Permission"
          {spanClass}
          href="/permission"
          active={activeUrl === "/permission" ||
            activeUrl.substring(1, 6) === "permission"}
        >
          <svelte:fragment slot="icon">
            <LockOpenOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
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
        <SidebarItem
          label="Report"
          {spanClass}
          href="/employee"
          active={activeUrl === "/employee" ||
            activeUrl.substring(1, 6) === "employee"}
        >
          <svelte:fragment slot="icon">
            <FolderDuplicateOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="Report"
          {spanClass}
          href="/employee"
          active={activeUrl === "/employee" ||
            activeUrl.substring(1, 6) === "employee"}
        >
          <svelte:fragment slot="icon">
            <FileCsvSolid />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem
          label="Report"
          {spanClass}
          href="/employee"
          active={activeUrl === "/employee" ||
            activeUrl.substring(1, 6) === "employee"}
        >
          <svelte:fragment slot="icon">
            <FilePdfOutline />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem
          label="Sign Out"
          {spanClass}
          href="/employee"
          active={activeUrl === "/employee" ||
            activeUrl.substring(1, 6) === "employee"}
        >
          <svelte:fragment slot="icon">
            <ArrowRightToBracketOutline />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>
