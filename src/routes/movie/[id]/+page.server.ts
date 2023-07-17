import axios from "axios";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  let id = params.id;
  const data = await fetch("https://cinemaapi.serveo.net/movie/" + id);
  console.log(data.status);
  if (data.status === 404) {
    console.log("error loading");
    throw error(404, { message: "Movie not found" });
  }
  const res = await data.json();

  return {
    data: res,
  };
};
