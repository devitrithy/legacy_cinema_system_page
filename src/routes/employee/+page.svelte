<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";
  import type { Snapshot } from "@sveltejs/kit";
  import axios from "axios";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Fileupload,
    Helper,
    Label,
    Modal,
    Pagination,
    Radio,
    Select,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Textarea,
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    PlusOutline,
    TrashBinOutline,
  } from "flowbite-svelte-icons";

  export let data;
  export let form;
  let endpoint = "https://cinemaapi.serveo.net/";
  let popupModal = false;
  let ids: any;
  let edit = false;
  let loading = false;
  let iName = 0;
  let address = "";
  let iAge = 0;
  let iEmail = 0;
  let iUsername = 0;
  let iPassword = 0;
  let iConfirmPassword = 0;
  let iPhoneNumber = 0;
  let selectedGen;
  let gender = [
    { value: "m", name: "Male" },
    { value: "f", name: "Female" },
    { value: "o", name: "Other" },
  ];

  const deleteModal = (id: any) => {
    popupModal = true;
    ids = id;
    console.log(ids);
  };
  let files: any, fileInput: Fileupload;
  let formInput = {
    name: "",
    gender: "",
    age: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    address: "",
    role: "",
    phone_number: "",
  };
  let resetValue = () => {
    formInput = {
      name: "",
      gender: "",
      age: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      address: "",
      role: "",
      phone_number: "",
    };
    iName = 0;
    iAge = 0;
    iEmail = 0;
    iUsername = 0;
    iPassword = 0;
    iConfirmPassword = 0;
    iPhoneNumber = 0;
    address = "";
  };

  import type { SubmitFunction } from "./$types.js";
  import TextField from "$lib/ui/textField.svelte";
  let formModal = false;
  export const snapshot: Snapshot = {
    capture: () => formInput,
    restore: (value) => (formInput = value),
  };

  if ($page.url.searchParams.get("add")) {
    formModal = true;
  }
  // Pagination
  $: activeUrl = $page.url.searchParams.get("page");
  let pages: any[] = [];
  let count = data.data.count / 5 + 1;
  if (data.data.count % 5 == 0) {
    count -= 1;
  }
  for (let i = 1; i <= count; i++) {
    pages.push({ name: i, href: `/user?page=${i}` });
  }

  $: {
    pages.forEach((page) => {
      let splitUrl = page.href.split("?");
      let queryString = splitUrl.slice(1).join("?");
      const hrefParams = new URLSearchParams(queryString);
      let hrefValue = hrefParams.get("page");
      if (hrefValue === activeUrl) {
        page.active = true;
      } else if (activeUrl === null) {
        page.active = true;
        activeUrl = "1";
      } else {
        page.active = false;
      }
    });
    pages = pages;
  }

  let p = Number($page.url.searchParams.get("page"));
  let previous = () => {
    p -= 1;
    if (p >= 1) {
      goto(`/user?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/user?page=2`);
    }
    if (p <= pages.length) {
      goto(`/user?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let editForm = async (id: string) => {
    resetValue();
    ids = id;
    edit = true;
    const editData = await axios.get(endpoint + "user/" + id);
    let d = editData.data.user[0];
    console.log(d);
    if (editData) {
      formInput.name = d.name;
      formInput.gender = d.gender;
      formInput.age = d.age;
      formInput.email = d.email;
      formInput.username = d.username;
      formInput.password = d.password;
      formInput.confirm_password = d.password;
      address = d.address;
      formInput.phone_number = d.phone_number;
      selectedGen = d.gender;

      formModal = true;
    }
  };
  let addMovie = () => {
    if (edit) {
      resetValue();
    }
    edit = false;
    formModal = true;
  };
  let formSumbit: SubmitFunction = ({ form, data, action, cancel }) => {
    const {
      name,
      age,
      email,
      password,
      confirm_password,
      username,
      phone_number,
      address,
    } = Object.fromEntries(data);
    loading = true;
    console.log(name);
    if (name.length < 5) {
      iName = 1;
      loading = false;
      cancel();
    } else {
      iName = 2;
    }
    if (age.length < 1) {
      iAge = 1;
      loading = false;
      cancel();
    } else {
      iAge = 2;
    }
    if (email.length < 5) {
      iEmail = 1;
      loading = false;
      cancel();
    } else {
      iEmail = 2;
    }
    if (phone_number.length < 9) {
      iPhoneNumber = 1;
      loading = false;
      cancel();
    } else {
      iPhoneNumber = 2;
    }
    if (username.length < 1) {
      iUsername = 1;
      loading = false;
      cancel();
    } else {
      iUsername = 2;
    }
    if (password.length < 5) {
      iPassword = 1;
      loading = false;
      cancel();
    } else {
      iPassword = 2;
    }
    if (confirm_password.length < 5) {
      iConfirmPassword = 1;
      loading = false;
      cancel();
    } else {
      iConfirmPassword = 2;
    }
    if (confirm_password !== password) {
      iConfirmPassword = 1;
      loading = false;
      cancel();
    } else {
      if (confirm_password.length > 1) {
        iConfirmPassword = 2;
      } else {
        cancel();
      }
    }
    return async ({ result, update }) => {
      loading = false;
      switch (result.type) {
        case "success":
          resetValue();
          toast.success("Successfully added the user.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          formModal = false;
          await update();
          break;
        case "error":
          toast.error("Error while added the user.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed added the user.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;

        default:
          break;
      }
    };
  };
  let deleteMovie: SubmitFunction = ({ form, data, action, cancel }) => {
    loading = true;
    return async ({ result, update }) => {
      loading = false;
      switch (result.type) {
        case "success":
          await update();
          toast.success("Successfully remove the user.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          popupModal = false;
          break;
        default:
          break;
      }
    };
  };
</script>

<main class=" z-10 mt-32 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">
    {$page.url.pathname === "/user" ? "User" : "Add User"}
  </h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/user">Users</BreadcrumbItem>
    </Breadcrumb>

    <Button on:click={addMovie} outline pill
      ><span class="mr-5">Add User</span><PlusOutline />
    </Button>
  </div>
  {#if data.data.count > 0}
    <Table divClass="z-10 m-5 overflow-x-auto " hoverable={true}>
      <TableHead>
        <TableHeadCell>Profile</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Age</TableHeadCell>
        <TableHeadCell>Email</TableHeadCell>
        <TableHeadCell>Gender</TableHeadCell>
        <TableHeadCell>Username</TableHeadCell>
        <TableHeadCell>Phone Number</TableHeadCell>
        <TableHeadCell>Address</TableHeadCell>
        <TableHeadCell>Role</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each data.data.users as user}
          <TableBodyRow>
            <TableBodyCell
              ><img
                class="rounded-full"
                width="50"
                src={endpoint +
                  "thumbnail/" +
                  user.profile_picture.substring(8) +
                  "?w=50&h=50"}
                alt=""
              /></TableBodyCell
            >
            <TableBodyCell>{user.name}</TableBodyCell>
            <TableBodyCell>${user.age}</TableBodyCell>
            <TableBodyCell
              >{user.email.length > 50
                ? user.email.substring(0, 50) + "..."
                : user.email}</TableBodyCell
            >
            <TableBodyCell
              >{user.gender === "o"
                ? "Other"
                : user.gender === "m"
                ? "Male"
                : "Female"}</TableBodyCell
            >
            <TableBodyCell>{user.username}</TableBodyCell>
            <TableBodyCell>{user.phone_number}</TableBodyCell>
            <TableBodyCell>{user.address}</TableBodyCell>
            <TableBodyCell
              >{user.role === 0 ? "Customer" : "Employee"}</TableBodyCell
            >
            <TableBodyCell tdClass="w-40">
              <div class="flex gap-5">
                <a href="/user/{user.user_id}"><EyeOutline /></a>
                <button on:click={() => editForm(user.user_id)}
                  ><EditOutline /></button
                >
                <button
                  type="submit"
                  on:click={() => {
                    deleteModal(user.user_id);
                  }}><TrashBinOutline /></button
                >
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {:else}
    <p class="text-2xl text-black dark:text-white">No User's availble yet!</p>
  {/if}
  {#if data.data.count > 5}
    <div class="flex justify-center items-center mt-5">
      <Pagination {pages} on:previous={previous} on:next={next} large />
    </div>
  {/if}
</main>
<Modal bind:open={formModal} autoclose={false} class="w-full">
  <form
    class="flex flex-col space-y-6"
    action="?/{edit ? 'edit' : 'create'}"
    method="POST"
    enctype="multipart/form-data"
    use:enhance={formSumbit}
  >
    {#if edit}
      <input type="hidden" name="id" value={ids} />
    {/if}

    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      {edit ? "Edit" : "Add"} User
    </h3>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <TextField
        fieldName="Name"
        value={formInput.name}
        name="name"
        iFieldName={iName}
        holder="Fullname..."
      />
      <TextField
        fieldName="Age"
        name="age"
        value={formInput.age}
        iFieldName={iAge}
        holder="Age..."
      />
    </div>
    <Label
      >Gender
      <Select class="mt-2" items={gender} bind:value={selectedGen} />
    </Label>
    <input type="hidden" name="gender" bind:value={selectedGen} />
    <Label for="textarea-id" class="mb-2">Your message</Label>
    <Textarea
      id="textarea-id"
      placeholder="Address..."
      bind:value={address}
      rows="2"
      name="address"
    />
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <TextField
        fieldName="Email"
        name="email"
        value={formInput.email}
        type="email"
        iFieldName={iEmail}
        holder="Email..."
      />
      <TextField
        fieldName="Phone Number"
        name="phone_number"
        type="tel"
        value={formInput.phone_number}
        iFieldName={iPhoneNumber}
        holder="Phone Number..."
      />
    </div>
    <TextField
      fieldName="Username"
      name="username"
      type="text"
      value={formInput.username}
      iFieldName={iUsername}
      holder="Username..."
    />
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <TextField
        fieldName="Password"
        name="password"
        value={formInput.password}
        type="password"
        iFieldName={iPassword}
        holder="Password..."
      />
      <TextField
        fieldName="Confirm Password"
        name="confirm_password"
        type="password"
        value={formInput.confirm_password}
        iFieldName={iConfirmPassword}
        holder="Confirm Password..."
      />
    </div>
    <input type="hidden" name="role" value="1" />

    <Label for="with_helper" class="pb-2">Profile Picture</Label>
    <Fileupload
      bind:files
      bind:this={fileInput}
      id="with_helper"
      class="mb-2"
      name="profile"
    />
    {#if files?.[0]}
      <p>
        {files[0].name}
      </p>
    {/if}
    <Helper>SVG, PNG, JPG or GIF (MAX. 800x400px).</Helper>
    <div class="flex gap-10">
      <Button type="button" color="red" on:click={resetValue} class="w-full"
        >Reset</Button
      >
      <Button type="submit" color="green" class="w-full" shadow>
        {#if loading}<Spinner class="mr-3" size="4" color="white" /> Submitting{:else}Submit{/if}
      </Button>
    </div>
  </form>
</Modal>
<Modal bind:open={popupModal} size="xs" autoclose={false}>
  <div class="text-center">
    {#if loading}
      <div class="my-5">
        <Spinner color="gray" size={8} />
      </div>
    {:else}
      <svg
        aria-hidden="true"
        class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
    {/if}
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to delete this user?
    </h3>
    <form action="?/delete" method="post" use:enhance={deleteMovie}>
      <Button type="submit" color="red" class="mr-2">Yes, I'm sure</Button>
      <Button
        type="button"
        on:click={() => {
          popupModal = false;
        }}
        color="alternative"
        class="mr-2">Cancel</Button
      >
      <input type="hidden" name="id" bind:value={ids} />
    </form>
  </div>
</Modal>
<Toaster />
