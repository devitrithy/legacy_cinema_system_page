import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  try {
    let page = Number(url.searchParams.get("page")) || 1;
    const token = cookies.get("token");
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
    console.log(error);
    throw fail(400, { message: "Permission denied" });
  }
};

export const actions = {
  create: async ({ request, cookies }) => {
    const data = await request.formData();

    try {
      const token = cookies.get("token");
      const customHeaders = {
        Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
      };
      axios
        .post("https://cinemaapi.serveo.net/movie", data, {
          headers: customHeaders,
        })
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

  delete: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };

    try {
      axios
        .delete("https://cinemaapi.serveo.net/movie/" + data.get("id"), {
          headers: customHeaders,
        })
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
  edit: async ({ cookies, request }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };

    try {
      axios
        .put(`https://cinemaapi.serveo.net/movie/${data.get("id")}`, data, {
          headers: customHeaders,
        })
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
