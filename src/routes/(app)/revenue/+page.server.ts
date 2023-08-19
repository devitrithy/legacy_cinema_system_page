import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url, cookies }) => {
  let startDate =
    url.searchParams.get("startDate") ||
    new Date().toISOString().substring(0, 10);
  let endDate =
    url.searchParams.get("endDate") ||
    new Date(
      new Date(startDate).getFullYear(),
      new Date(startDate).getMonth(),
      new Date(startDate).getDate() + 2
    )
      .toISOString()
      .substring(0, 10);

  console.log(startDate);
  console.log(endDate);
  const data = async () => {
    const res = await fetch(
      `${PUBLIC_API_ENDPOINT}/report/revenue?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: { Authorization: `Bearer ${cookies.get("token")}` },
      }
    );
    return res.json();
  };
  return { data: data() };
}) satisfies PageServerLoad;
