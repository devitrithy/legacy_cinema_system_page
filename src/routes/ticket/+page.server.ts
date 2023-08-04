import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const data = await fetch(`https://cinemaapi.serveo.net/showing/now`, {
    headers: customHeaders,
  });
  return { data: data.json() };
}) satisfies PageServerLoad;
