import { fail, type Actions } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  let page = Number(url.searchParams.get("page")) || 1;
  console.log(page);
  const data = await fetch(`http://cinemaapi.serveo.net/movie?page=${page}`);
  const res = data.json();
  return {
    data: res,
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
          return {
            success: false,
            message: "Fail to add movie",
          };
        });
    } catch (error: any) {
      return fail(422, {
        description: data.get("description"),
        error: error.message,
      });
    }
    return {
      success: true,
      message: "Added movie successfully",
    };
  },

  delete: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .delete("https://cinemaapi.serveo.net/movie/" + data.get("id"))
        .then((response) => {
          return {
            success: true,
            message: "Deleted successfully",
          };
        })
        .catch((err) => {
          return {
            success: false,
            message: "Some problem occurred while deleting the movie",
          };
        });
    } catch (error: any) {
      return fail(422, {
        description: data.get("description"),
        error: error.message,
      });
    }
  },
} satisfies Actions;
