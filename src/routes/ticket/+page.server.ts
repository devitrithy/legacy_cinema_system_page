import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
  let date = url.searchParams.get("day") || new Date().getDay() - 1;
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const data = await fetch(
    `https://cinemaapi.serveo.net/showing/now?day=${date}`,
    {
      headers: customHeaders,
      credentials: "include",
    }
  );
  return { data: data.json() };
};
