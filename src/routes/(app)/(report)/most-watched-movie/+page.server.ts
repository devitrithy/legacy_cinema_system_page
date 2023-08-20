import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const data = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/report/most-watched`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
    return res.json();
  };

  return { data: data() };
}) satisfies PageServerLoad;
