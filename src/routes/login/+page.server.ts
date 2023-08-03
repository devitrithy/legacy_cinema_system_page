import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import axios from "axios";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("token");
  console.log(token);
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
          cookies.set("token", response.data.token);
          return redirect(303, "/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
