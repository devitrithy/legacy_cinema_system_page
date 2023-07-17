<script lang="ts">
  import { page } from "$app/stores";
  import {
    Breadcrumb,
    BreadcrumbItem,
    DescriptionList,
    InformationCircle,
    Timeline,
  } from "flowbite-svelte";
  import {
    ClockOutline,
    DesktopPcOutline,
    TagOutline,
    VideoCameraOutline,
  } from "flowbite-svelte-icons";

  export let data;
  let movie = data.data.movie[0];
  let endpoint = "http://localhost:3000/";
</script>

<main class="m-5">
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
  <div class="flex gap-5 text-black dark:text-white">
    <img
      src={endpoint + movie.poster}
      style="height: 350px; border-radius: 25px;"
      alt={movie.title}
    />
    <div class="flex flex-col items-start gap-5 justify-start">
      <p class="flex justify-center items-center gap-5">
        <VideoCameraOutline />
        <span>
          Title: {movie.title}
        </span>
      </p>
      <p class="flex justify-center gap-5">
        <DesktopPcOutline />
        <span>
          Description: {movie.description}
        </span>
      </p>
      <p class="flex justify-center items-center gap-5">
        <ClockOutline />
        <span>
          Time: {movie.time}
        </span>
      </p>
      <p class="flex justify-center items-center gap-5">
        <TagOutline />
        <span>
          Genre: {movie.genre}
        </span>
      </p>
    </div>
  </div>
  <div>
    <iframe
      width="1500"
      height="600"
      src="https://www.youtube.com/embed/{movie.trailer}"
      title={movie.title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  </div>
</main>
