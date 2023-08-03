import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  logout: ({ cookies }) => {
    cookies.delete("token");
    throw redirect(303, "/login");
  },
};
