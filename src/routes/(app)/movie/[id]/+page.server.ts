import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  let id = params.id;
  const data = await fetch(`${PUBLIC_API_ENDPOINT}/movie/` + id, {
    headers: customHeaders,
  });
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
