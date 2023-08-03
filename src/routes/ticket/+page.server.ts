import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const data = await fetch(`http://localhost:3000/showing/now`, {
    headers: customHeaders,
  });
  return { data: data.json() };
}) satisfies PageServerLoad;
