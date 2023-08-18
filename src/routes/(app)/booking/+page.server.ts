import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import axios from "axios";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const token = cookies.get("token");
  const res = await fetch(`${PUBLIC_API_ENDPOINT}/booking`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { booking: res.json() };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    await axios
      .put(
        `${PUBLIC_API_ENDPOINT}/booking/${data.get("tid")}`,
        {
          isRecived: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        return {
          success: false,
          message: "Fail to add movie",
        };
      });
  },
};
