<script lang="ts">
  import { Button, Card } from "flowbite-svelte";
  import src from "../../public/Logo.png";
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

  let login: SubmitFunction = ({ form, data, action, cancel }) => {
    const { username, password } = Object.fromEntries(data);
    if (username.length < 1) {
      iUsername = 1;
      iUsernameMessage = "Please enter a username";
      cancel();
    } else {
      iUsername = 2;
      iUsernameMessage = "Username validated.";
    }
    if (password.length < 1) {
      iPassword = 1;
      iPasswordMessage = "Please enter a Password";
    } else {
      iPassword = 2;
      iPasswordMessage = "Password validated.";
    }
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          goto("/");
          break;
        default:
          break;
      }
    };
  };
</script>

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
        <Button type="submit" class="w-full">Login to your account</Button>
      </form>
    </Card>
  </div>
</main>
