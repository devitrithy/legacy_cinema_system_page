import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  let id = params.id;
  const data = await fetch("http://localhost:3000/movie/" + id);
  const res = await data.json();

  return {
    data: res,
  };
};
