import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import axios from "axios";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const token = cookies.get("token");
  const booking = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };
  return { booking: booking() };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const recived = await axios.put(
      `${PUBLIC_API_ENDPOINT}/booking/${data.get("tid")}`,
      {
        isRecived: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (recived) {
      return {
        success: true,
        message: "Successfully Update",
      };
    }
    console.log(recived);
  },
};
