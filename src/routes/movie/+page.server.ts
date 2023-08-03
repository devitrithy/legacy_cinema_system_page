import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  try {
    const token = cookies.get("token");
    let page = Number(url.searchParams.get("page")) || 1;
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };
    const count = await axios.get("https://cinemaapi.serveo.net/movie", {
      headers: customHeaders,
    });

    if (page > count.data.count / 5 + 1) {
      throw redirect(302, "/movie");
    }
    const data = await fetch(
      `https://cinemaapi.serveo.net/movie?page=${page}`,
      {
        headers: customHeaders,
        credentials: "include",
      }
    );
    return {
      data: data.json(),
    };
  } catch (error) {
    throw redirect(303, "/login");
  }
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
          console.log(response.status);
          if (response.status === 400) {
            return fail(400, { message: response.data.message });
          }
          return {
            success: true,
            message: "Deleted successfully",
          };
        })
        .catch((err) => {
          console.log(err);
          return fail(400, { message: "Failed to delete movie." });
        });
    } catch (error: any) {
      return fail(422, {
        description: data.get("description"),
        error: error.message,
      });
    }
  },
  edit: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .put(`https://cinemaapi.serveo.net/movie/${data.get("id")}`, data)
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
} satisfies Actions;
