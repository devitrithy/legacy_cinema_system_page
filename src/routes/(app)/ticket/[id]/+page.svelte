<script lang="ts">
  import { enhance } from "$app/forms";
  import { fly } from "svelte/transition";
  import { Seat } from "$lib";
  import type { SubmitFunction } from "@sveltejs/kit";
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Indicator,
    Spinner,
    Toast,
    Tooltip,
  } from "flowbite-svelte";
  import moment from "moment-timezone";
  import toast, { Toaster } from "svelte-french-toast";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  export let data;
  const endpoint = `${PUBLIC_API_ENDPOINT}/thumbnail/`;
  let disabled = true;
  let { tickets, showings } = data;
  let showing = showings.showingtime[0];

  let total: number = 0;

  let selected: String[] = [];
  const select = (seatNumber: String) => {
    disabled = false;
    for (let index = 0; index < selected.length; index++) {
      if (seatNumber === selected[index]) {
        selected.splice(index, 1);
        selected = selected;
        if (selected.length < 1) disabled = true;
        return;
      }
    }
    selected.push(seatNumber);
    selected = selected;
  };
  let loading: boolean = false;
  $: total = showing.price * selected.length;
  const buy: SubmitFunction = () => {
    loading = true;
    disabled = true;
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          await update();
          selected = [];
          loading = false;
          toast.success("Successfully sell the tickets.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
          break;

        case "failure":
          toast.success("Successfully remove.", {
            style: "border-radius: 200px; background: #333; color: #fff;",
          });
        default:
          break;
      }
    };
  };
</script>

<main class=" z-10 mt-20 container mx-auto">
  <h1 class="text-black dark:text-white text-2xl m-4">
    Select Seat
    <div class="m-4 flex justify-between items-center">
      <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
        <BreadcrumbItem href="/ticket">Ticket</BreadcrumbItem>
        <BreadcrumbItem href="/ticket/{showing.showing_id}"
          >{showing.movie.title}</BreadcrumbItem
        >
      </Breadcrumb>
    </div>
  </h1>
  <div class="flex justify-between gap-10">
    <main class="bg-stone-950 px-10 py-10">
      <div class="dark:text-white flex justify-center gap-10">
        <span class="flex items-center"
          ><Indicator size="sm" color="red" class="mr-1.5" />Unavailable</span
        >
        <span class="flex items-center"
          ><Indicator size="sm" color="gray" class="mr-1.5" />Available</span
        >
        <span class="flex items-center"
          ><Indicator size="sm" color="green" class="mr-1.5" />Selected</span
        >
      </div>
      <div class="flex">
        <div class="grid w-5 dark:text-white my-5 justify-center items-center">
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p>F</p>
          <p>G</p>
          <p>H</p>
          <p>I</p>
        </div>
        <div class="grid grid-cols-20 m-5 gap-1">
          {#each data.tickets as seat}
            <div id={`hover${seat.id}`}>
              <Tooltip
                triggeredBy={`#hover${seat.id}`}
                color={seat.selected ? "red" : "green"}
                class="text-2xl">{seat.seatNumber}</Tooltip
              >
              {#if seat.selected}
                <Seat isAvailable={false} />
              {:else}
                <button on:click={() => select(seat.seatNumber)}>
                  <Seat />
                </button>
              {/if}
            </div>
          {/each}
        </div>
        <div class="grid w-5 dark:text-white my-5 justify-center items-center">
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
          <p>F</p>
          <p>G</p>
          <p>H</p>
          <p>I</p>
        </div>
      </div>
      <div
        class="border dark:border-gray-600 h-16 mx-5 mt-10 flex justify-center items-center"
      >
        <h1 class="dark:text-white text-3xl">Screen</h1>
      </div>
    </main>
    <aside
      class="w-1/3 h-full outline rounded-lg dark:outline-slate-700 dark:text-white flex flex-col p-5 gap-5"
    >
      <div class="flex gap-10">
        <img
          width="184"
          height="274"
          src={endpoint + showing.movie.poster.substring(8) + "?w=184&h=274"}
          alt=""
        />
        <div class="flex flex-col justify-between">
          <h1>
            <span class=" font-bold">{showing.movie.title}</span>
          </h1>
          <div class="flex flex-col gap-5">
            <h1>
              <span>
                {moment(showing.showing_date)
                  .tz("Atlantic/Reykjavik")
                  .format("LLL")}
              </span>
            </h1>
            <h1>
              <span>{showing.movie.time} Minutes</span>
            </h1>
            <h1>
              <span>{showing.movie.genre}</span>
            </h1>
          </div>
        </div>
      </div>
      <div class="h-[.5px] bg-gray-700 m-5" />
      <div class="uppercase flex flex-col gap-5 font-bold">
        <h1>
          <span>Legacy Cinema {showing.hall.location.location_name}</span>
        </h1>
        <h1><span>{showing.hall.hall_name}</span></h1>
        <h1>
          <span
            >{moment(showing.showing_date)
              .tz("Atlantic/Reykjavik")
              .format("LL")}</span
          >
        </h1>
        <div class="h-[.5px] bg-gray-700 m-5" />
        <h1>
          Seat
          {#each selected as select}
            <span class="mx-1 font-thin">
              {select}
            </span>
          {/each}
        </h1>
      </div>
      <h1><span class="font-bold text-xl">Total ${total}</span></h1>
      <form action="?/pay" method="post" use:enhance={buy}>
        <input type="hidden" name="pay" bind:value={selected} />
        <div class="w-full grid">
          {#if loading}
            <Button type="submit" {disabled} pill>
              <Spinner class="mr-3" size="4" />
              Pay</Button
            >
          {:else}
            <Button type="submit" {disabled} pill>Pay</Button>
          {/if}
        </div>
      </form>
    </aside>
  </div>
</main>
<Toaster />
