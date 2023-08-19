<script>
  import { page } from "$app/stores";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import Navbar from "../../components/navbar.svelte";
  import Sidebar from "../../components/sidebar.svelte";
  export let data;
  let user = data.user || null;
  let pf;
  if (!user.profile) {
    pf = "1691002845965.webp";
  } else {
    pf = user.profile.substring(8);
  }

  // FIX: Please fix this becsae it's bug the whole proccess
  let profile = `${PUBLIC_API_ENDPOINT}/thumbnail/${pf}?w=25&h=25`;
</script>

<title
  >Legacy Cinema | {$page.url.pathname === "/"
    ? "Dashboard"
    : $page.url.pathname.split("/")[1].toLocaleUpperCase()}</title
>

<div class="flex">
  <div class="w-72 container hidden 2xl:block z-50 print">
    <div class="fixed">
      <Sidebar />
    </div>
  </div>
  <div class="self-top w-full">
    <div class="print">
      <Navbar
        email={user.email || ""}
        {profile}
        user={`${user.firstname} ${user.lastname}` || ""}
      />
      <!-- <Navbar /> -->
    </div>
    <slot />
  </div>
</div>
