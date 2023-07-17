<script lang="ts">
  import moment from "moment";
  import { page } from "$app/stores";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import {
    CalendarMonthOutline,
    ClockOutline,
    TagOutline,
  } from "flowbite-svelte-icons";

  export let data;
  let movie = data.data.movie[0];
  let endpoint = "https://cinemaapi.serveo.net/";
</script>

<main class="m-5 container text-black dark:text-white mt-20">
  <h1 class="text-black dark:text-white text-2xl m-4">
    {$page.url.pathname === "/movie" ? "Movie" : "Add Movie"}
  </h1>
  <div class="m-4 flex justify-between items-center">
    <Breadcrumb aria-label="Default breadcrumb example">
      <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
      <BreadcrumbItem href="/movie">Movie</BreadcrumbItem>
      <BreadcrumbItem href="/movie/{movie.movie_id}"
        >{movie.title}</BreadcrumbItem
      >
    </Breadcrumb>
  </div>
  <div class="flex gap-10 mx-10 mt-5">
    <img
      src={endpoint + movie.poster}
      class="h-[80vh] rounded-lg shadow-lg shadow-red-900"
      alt={movie.title}
    />
    <div class="flex gap-10 flex-col">
      <p class="text-2xl text-bold">{movie.title}</p>
      <p class="flex items-center gap-5">
        <CalendarMonthOutline />{moment(movie.create_at, [
          "YYYY-MM-DD",
          "DD-MM-YYYY",
        ]).format("DD MMMM YYYY")}
      </p>
      <p class="flex items-center gap-5"><ClockOutline />{movie.time}</p>
      <p class="flex items-center gap-5"><TagOutline />{movie.genre}</p>
      <p class="w-[50vw]">{movie.description}</p>
      <iframe
        class="h-full"
        src="https://www.youtube.com/embed/{movie.trailer}?autoplay=1&mute=1"
        title={movie.title}
        frameborder="0"
        allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; loop;"
        allowfullscreen
      />
    </div>
  </div>
</main>
