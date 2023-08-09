import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
  let date = url.searchParams.get("day") || new Date().getDate();
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const data = await fetch(`${PUBLIC_API_ENDPOINT}/showing/now?day=${date}`, {
    headers: customHeaders,
    credentials: "include",
  });
  return { data: data.json() };
};
