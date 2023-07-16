import { fail, type Actions } from "@sveltejs/kit";
import axios from "axios";

export const load = async () => {
  const data = await axios.get("https://cinemaapi.serveo.net/movie");
  return {
    data: data.data,
  };
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .post("https://cinemaapi.serveo.net/movie", data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error: any) {
      return fail(422, {
        description: data.get("description"),
        error: error.message,
      });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .delete("https://cinemaapi.serveo.net/movie/" + data.get("id"))
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
    } catch (error: any) {
      return fail(422, {
        description: data.get("description"),
        error: error.message,
      });
    }
  },
} satisfies Actions;
