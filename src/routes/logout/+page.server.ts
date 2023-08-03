import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get("token")) {
    cookies.delete("token");
  }
  throw redirect(303, "/login");
};
