import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import axios from "axios";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const token = cookies.get("token");
  if (token) {
    throw redirect(303, "/");
  }
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    try {
      const data = await request.formData();
      await axios
        .post("https://cinemaapi.serveo.net/user/login", {
          username: data.get("username"),
          password: data.get("password"),
        })
        .then((response) => {
          cookies.set("token", response.data.token, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 8,
          });
          return redirect(303, "/");
        })
        .catch((err) => {
          console.log(err);
          throw redirect(303, "/login");
        });
    } catch (error) {
      console.log(error);
      throw redirect(303, "/login");
    }
  },
};
