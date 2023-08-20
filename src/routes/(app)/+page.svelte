<script>
  import { Button, Card, Dropdown, DropdownItem } from "flowbite-svelte";
  import { DotsVerticalOutline } from "flowbite-svelte-icons";
  function convertToFormattedTime(hour) {
    if (hour >= 0 && hour <= 23) {
      const date = new Date();
      date.setHours(hour, 0, 0, 0);

      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);

      return formattedTime;
    } else {
      return "Invalid hour";
    }
  }
  export let data;
  let {
    peakHours,
    year,
    month,
    today,
    overall,
    mostWatched,
    cinemasMostWatched,
    mostWatchGenre,
    users,
  } = data;
  let revenue = [
    { name: "This Year", price: year.totalRevenue },
    { name: "This Month", price: month.totalRevenue },
    { name: "Today", price: today.totalRevenue },
    { name: "Overall", price: overall.totalRevenue },
  ];
  let revenueSelected = 2;
  /**
   * @type {string}
   */
  let formattedNumber;
  $: formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(revenue[revenueSelected].price);
</script>

<main class=" z-10 mt-32 container mx-auto text-black dark:text-white">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 place-content-center"
  >
    <Card
      color="green"
      class="flex justify-between flex-col hover:shadow-green-600"
    >
      <div class="flex justify-between items-center">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Revenue | {revenue[revenueSelected].name}
        </h5>
        <button><DotsVerticalOutline /> </button>
        <Dropdown>
          <DropdownItem
            on:click={() => {
              revenueSelected = 2;
            }}>Today</DropdownItem
          >
          <DropdownItem
            on:click={() => {
              revenueSelected = 1;
            }}>This Month</DropdownItem
          >
          <DropdownItem
            on:click={() => {
              revenueSelected = 0;
            }}>This Year</DropdownItem
          >
          <DropdownItem
            on:click={() => {
              revenueSelected = 3;
            }}>Overall</DropdownItem
          >
        </Dropdown>
      </div>
      <p
        class="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400 leading-tight"
      >
        <span class="font-bold">{formattedNumber}</span>
      </p>
    </Card>
    <Card
      color="green"
      class="flex justify-between flex-col hover:shadow-green-600"
    >
      <div class="flex justify-between items-center">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Most Watched Movie Type
        </h5>
      </div>
      <p
        class="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400 leading-tight"
      >
        <span class="font-bold">{mostWatchGenre[0].genre}</span>
      </p>
    </Card>
    <Card
      color="red"
      class="flex justify-between flex-col hover:shadow-red-600"
    >
      <div class="flex justify-between items-center">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Most Booking Hour
        </h5>
      </div>
      <p
        class="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400 leading-tight"
      >
        <span class="font-bold"
          >{convertToFormattedTime(peakHours.peakHours)}</span
        >
      </p>
    </Card>
    <Card
      color="red"
      class="flex justify-between flex-col hover:shadow-red-600"
    >
      <div class="flex justify-between items-center">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Active Users
        </h5>
      </div>
      <p
        class="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400 leading-tight"
      >
        <span class="font-bold">{users}</span>
      </p>
    </Card>
    <Card
      color="yellow"
      class="flex justify-between flex-col hover:shadow-yellow-600"
    >
      <div class="flex justify-between items-center">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Most Watched Movie
        </h5>
      </div>
      <p
        class="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400 leading-tight"
      >
        <span class="font-bold">{mostWatched[0].movieTitle} Tickets</span>
      </p>
    </Card>
    <Card
      color="blue"
      class="flex justify-between flex-col hover:shadow-blue-600"
    >
      <div class="flex justify-between items-center">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Most Booked Cinema | {cinemasMostWatched.sortedShowings[0].location}
        </h5>
      </div>
      <p
        class="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400 leading-tight"
      >
        <span class="font-bold"
          >{cinemasMostWatched.sortedShowings[0].bookingCount} Booked</span
        >
      </p>
    </Card>
  </div>
</main>
