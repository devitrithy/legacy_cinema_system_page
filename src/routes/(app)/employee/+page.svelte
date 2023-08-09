<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";
  import type { Snapshot } from "@sveltejs/kit";
  import axios from "axios";
  import { onMount } from "svelte";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Checkbox,
    Fileupload,
    Helper,
    Input,
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
    LockOpenSolid,
    PlusOutline,
    TrashBinOutline,
  } from "flowbite-svelte-icons";

  let locations = [];
  let departments = [];
  let lo: any[] = [];
  let de: any[] = [];
  let selectLoc: any[];
  let selectDep: any[];
  onMount(async () => {
    const loc = await fetch(`${endpoint}location`, {
      headers: { Authorization: "Bearer guest" },
    });
    const dep = await fetch(`${endpoint}department`, {
      headers: { Authorization: "Bearer guest" },
    });
    locations = await loc.json();
    departments = await dep.json();

    locations.locations.forEach((l) => {
      lo.push({
        value: l.location_id,
        name: l.location_name,
      });
    });
    departments.departments.forEach((l) => {
      de.push({
        value: l.department_id,
        name: l.department_name,
      });
    });
  });

  export let data;
  let endpoint = `${PUBLIC_API_ENDPOINT}/`;
  let popupModal = false;
  let ids: any;
  let edit = false;
  let loading = false;
  let iFirstname = 0;
  let iLastname = 0;
  let address = "";
  let iAge = 0;
  let iDepartment = 0;
  let iLocation = 0;
  let iEmail = 0;
  let iUsername = 0;
  let iPassword = 0;
  let iSalary = 0;
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
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    address: "",
    role: "",
    phone_number: "",
    salary: 0,
  };
  let date = new Date().toISOString().slice(0, 10);
  let resetValue = () => {
    formInput = {
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      address: "",
      role: "",
      phone_number: "",
      salary: 0,
    };
    iFirstname = 0;
    iLastname = 0;
    iAge = 0;
    iEmail = 0;
    iSalary = 0;
    iUsername = 0;
    iPassword = 0;
    iConfirmPassword = 0;
    iDepartment = 0;
    iLocation = 0;
    iPhoneNumber = 0;
    address = "";
    date = new Date().toISOString().slice(0, 10);
  };

  import type { SubmitFunction } from "./$types.js";
  import TextField from "$lib/ui/textField.svelte";
  import moment from "moment";
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
    pages.push({ name: i, href: `/employee?page=${i}` });
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
      goto(`/employee?page=${p}`);
    } else {
      p += 1;
    }
  };
  let next = () => {
    p += 1;
    if (activeUrl === null) {
      goto(`/employee?page=2`);
    }
    if (p <= pages.length) {
      goto(`/employee?page=${p}`);
    } else {
      p -= 1;
    }
  };

  //Edit Form
  let emp_id;
  let editForm = async (id: string) => {
    resetValue();
    edit = true;
    const editData = await axios.get(endpoint + "employee/" + id, {
      headers: { Authorization: "Bearer guest" },
    });
    let d = editData.data.movie[0];
    ids = d.users.user_id;
    emp_id = d.employee_id;

    if (editData) {
      console.log(d);
      formInput.firstname = d.users.firstname;
      formInput.lastname = d.users.lastname;
      selectedGen = d.users.gender;
      formInput.salary = d.salary;
      formInput.age = d.users.age;
      formInput.email = d.users.email;
      formInput.username = d.users.username;
      formInput.password = d.users.password;
      formInput.confirm_password = d.users.password;
      address = d.users.address;
      formInput.phone_number = d.users.phone_number;
      selectedGen = d.users.gender;
      selectDep = d.department_id;
      selectLoc = d.location_id;

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
      firstname,
      lastname,
      age,
      email,
      password,
      confirm_password,
      username,
      phone_number,
      address,
      salary,
      department_id,
      location_id,
    } = Object.fromEntries(data);
    loading = true;
    console.log(name);
    if (firstname.length < 1) {
      iFirstname = 1;
      loading = false;
      cancel();
    } else {
      iFirstname = 2;
    }
    if (lastname.length < 1) {
      iLastname = 1;
      loading = false;
      cancel();
    } else {
      iLastname = 2;
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
    if (department_id == "") {
      iDepartment = 1;
      loading = false;
      cancel();
    } else {
      iDepartment = 2;
    }
    if (location_id == "") {
      iLocation = 1;
      loading = false;
      cancel();
    } else {
      iLocation = 2;
    }
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          await update();
          loading = false;
          formModal = false;
          toast.success("Successfully added the employee.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          resetValue();
          break;
        case "error":
          toast.error("Error while added the employee.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;
        case "failure":
          toast.error("Failed added the employee.", {
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
  let modalPermission = false;
  const permission = (id) => {
    modalPermission = true;
  };
</script>

<main class=" z-10 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">
    {$page.url.pathname === "/employee" ? "Employee" : "Add Employee"}
  </h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/employee">Employees</BreadcrumbItem>
    </Breadcrumb>

    <Button on:click={addMovie} outline pill
      ><span class="mr-5">Add Employee</span><PlusOutline />
    </Button>
  </div>
  {#if data.data.count > 0}
    <Table divClass="z-10 m-5 overflow-x-auto " hoverable={true}>
      <TableHead>
        <TableHeadCell>Profile</TableHeadCell>
        <TableHeadCell>Fullname</TableHeadCell>
        <TableHeadCell>Gender</TableHeadCell>
        <TableHeadCell>Phone Number</TableHeadCell>
        <TableHeadCell>Salary</TableHeadCell>
        <TableHeadCell>Hire Date</TableHeadCell>
        <TableHeadCell>Department</TableHeadCell>
        <TableHeadCell>Location</TableHeadCell>
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
                  user.users.profile_picture.substring(8) +
                  "?w=50&h=50"}
                alt=""
              /></TableBodyCell
            >
            <TableBodyCell
              >{user.users.lastname + " " + user.users.firstname}</TableBodyCell
            >
            <TableBodyCell
              >{user.users.gender === "o"
                ? "Other"
                : user.users.gender === "m"
                ? "Male"
                : "Female"}</TableBodyCell
            >
            <TableBodyCell>{user.users.phone_number}</TableBodyCell>
            <TableBodyCell>${user.salary}</TableBodyCell>
            <TableBodyCell>
              {moment(user.hire_date, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
                "DD MMMM YYYY"
              )}
            </TableBodyCell>
            <TableBodyCell>{user.departments.department_name}</TableBodyCell>
            <TableBodyCell>{user.locations.location_name}</TableBodyCell>
            <TableBodyCell tdClass="w-40">
              <div class="flex gap-5">
                <button on:click={() => permission(user.users.user_id)}
                  ><LockOpenSolid /></button
                >
                <button on:click={() => editForm(user.employee_id)}
                  ><EditOutline /></button
                >
                <button
                  type="submit"
                  on:click={() => {
                    deleteModal(user.users.user_id);
                  }}><TrashBinOutline /></button
                >
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  {:else}
    <p class="text-2xl text-black dark:text-white">
      No Employee's availble yet!
    </p>
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
      {edit ? "Edit" : "Add"} Employee
    </h3>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <TextField
        fieldName="Firstname"
        value={formInput.firstname}
        name="firstname"
        iFieldName={iFirstname}
        holder="Firstname..."
      />
      <TextField
        fieldName="Lastname"
        value={formInput.lastname}
        name="lastname"
        iFieldName={iLastname}
        holder="Lastname..."
      />
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <Label
        >Gender
        <Select class="mt-2" items={gender} bind:value={selectedGen} />
      </Label>
      <TextField
        fieldName="Age"
        name="age"
        value={formInput.age}
        iFieldName={iAge}
        holder="Age..."
      />
      <input type="hidden" name="gender" bind:value={selectedGen} />
    </div>
    <Label for="textarea-id" class="mb-2">Address</Label>
    <Textarea
      id="textarea-id"
      placeholder="Address..."
      bind:value={address}
      rows="2"
      name="address"
    />
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <Label
        >Location
        <Select class="mt-2" items={lo} bind:value={selectLoc} />
      </Label>
      <Label
        >Department
        <Select class="mt-2" items={de} bind:value={selectDep} />
      </Label>
      <input type="hidden" name="location_id" bind:value={selectLoc} />
      <input bind:value={selectDep} type="hidden" name="department_id" />
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <TextField
        fieldName="Salary"
        name="salary"
        value={formInput.salary}
        type="number"
        iFieldName={iSalary}
        holder="Salary..."
      />
      <div>
        <Label class="block mb-2">Hire Date</Label>
        <Input
          label="Hire Date"
          id="date"
          name="hire_date"
          required
          bind:value={date}
          type="date"
        />
      </div>
    </div>

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
    <input type="hidden" name="employee_id" bind:value={emp_id} />
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
      accept="Image/jpeg"
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

<Modal bind:open={modalPermission} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Permission
    </h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input
        type="email"
        name="email"
        placeholder="name@company.com"
        required
      />
    </Label>
    <Label class="space-y-2">
      <span>Your password</span>
      <Input type="password" name="password" placeholder="•••••" required />
    </Label>
    <div class="flex items-start">
      <Checkbox>Remember me</Checkbox>
    </div>
    <Button type="submit" class="w-full1">Login to your account</Button>
  </form>
</Modal>
