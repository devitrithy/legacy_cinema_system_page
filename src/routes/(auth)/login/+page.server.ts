import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import axios from "axios";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const token = cookies.get("token");
  if (token) {
    throw redirect(303, "/");
  }
};

export const actions: Actions = {
  login: async ({ request, cookies, url }) => {
    try {
      const data = await request.formData();
      await axios
        .post(`${PUBLIC_API_ENDPOINT}/user/admin/login`, {
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
          return redirect(303, `/`);
        })
        .catch((err) => {
          //console.log(err);
          throw error(400, { message: "Fail to login." });
        });
    } catch (err) {
      //console.log(error);
      throw error(400, { message: "Fail to login." });
    }
  },
};
