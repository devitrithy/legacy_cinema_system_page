<script lang="ts">
  import { Button, Card, DarkMode, Spinner } from "flowbite-svelte";
  import { page } from "$app/stores";
  import src from "../../../public/Logo.png";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import TextField from "$lib/ui/textField.svelte";
  import { goto } from "$app/navigation";
  let username: String;
  let password: String;
  let iUsername = 0;
  let iUsernameMessage = "";
  let iPassword = 0;
  let iPasswordMessage = "";
  let loading = false;
  let iFail = 0;
  let iFailMessage = "";

  let login: SubmitFunction = ({ form, data, action, cancel }) => {
    const { username, password } = Object.fromEntries(data);
    loading = true;
    if (username.length < 1) {
      iUsername = 1;
      iUsernameMessage = "Please enter a username";
      loading = false;
      cancel();
    } else {
      iUsername = 2;
      iUsernameMessage = "Username validated.";
    }
    if (password.length < 1) {
      iPassword = 1;
      iPasswordMessage = "Please enter a Password";
      loading = false;
      cancel();
    } else {
      iPassword = 2;
      iPasswordMessage = "Password validated.";
    }
    return async ({ result, update }) => {
      //console.log(result.type);
      switch (result.type) {
        case "success":
          if ($page.url.searchParams.get("r")) {
            const r = $page.url.searchParams.get("r") || "/";
            goto(`/${r.slice(1)}`);
          } else {
            goto("/");
          }
          break;
        // case "error":
        //   iUsername = 0;
        //   iPassword = 0;
        //   iPasswordMessage = "";
        //   iUsernameMessage = "";
        //   iFail = 1;
        //   iFailMessage = "Server is under maintenance please wait ⚠️";
        //   loading = false;
        //   break;

        default:
          iUsername = 1;
          iPassword = 1;
          iPasswordMessage = "";
          iUsernameMessage = "";
          iFail = 1;
          iFailMessage = "Please check your username and password.";
          loading = false;
          break;
      }
    };
  };
</script>

<div style="display: none;">
  <DarkMode />
</div>

<main
  class="w-screen h-screen text-white bg-slate-950 flex items-center justify-center"
>
  <div>
    <Card class="w-[500px] dark:bg-slate-900">
      <form
        class="flex flex-col space-y-6"
        action="?/login"
        method="POST"
        use:enhance={login}
      >
        <div class="flex justify-between items-center">
          <img {src} alt="" class="w-24" />
          <p class="text-2xl text-white">Sign In</p>
        </div>

        <TextField
          type="text"
          name="username"
          value={username}
          fieldName="Username"
          iFieldName={iUsername}
          message={iUsernameMessage}
          holder="Boombasticsideeye"
        />
        <TextField
          value={password}
          type="password"
          name="password"
          fieldName="Password"
          iFieldName={iPassword}
          message={iPasswordMessage}
          holder="•••••"
        />
        {#if iFail === 1}
          <small class="text-red-700">{iFailMessage}</small>
        {/if}
        {#if !loading}
          <Button type="submit" class="w-full">Login to your account</Button>
        {:else}
          <Button>
            <Spinner color="gray" class="mr-3" size="4" />
            Logging in ...
          </Button>
        {/if}
      </form>
    </Card>
  </div>
</main>
