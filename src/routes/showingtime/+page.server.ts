import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  let page = Number(url.searchParams.get("page")) || 1;
  const count = await axios.get("https://cinemaapi.serveo.net/showing", {
    headers: customHeaders,
  });

  if (page > count.data.count / 5 + 1) {
    throw redirect(302, "/showing");
  }
  const showing = await fetch(`https://cinemaapi.serveo.net/showing`, {
    headers: customHeaders,
  });
  let halls = showing.json();
  return {
    data: halls,
  };
};

export const actions = {
  create: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };

    try {
      axios
        .post(
          "https://cinemaapi.serveo.net/showing",
          {
            showing_date: data.get("date"),
            movie_id: data.get("movie_id"),
            hall_id: data.get("hall_id"),
            price: data.get("price"),
          },
          { headers: customHeaders }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add showing",
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
      message: "Added showing successfully",
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
        .delete("https://cinemaapi.serveo.net/showing/" + data.get("id"), {
          headers: customHeaders,
        })
        .then((response) => {
          return {
            success: true,
            message: "Deleted successfully",
          };
        })
        .catch((err) => {
          return {
            success: false,
            message: "Some problem occurred while deleting the showing",
          };
        });
    } catch (error: any) {
      return fail(422, {
        description: data.get("description"),
        error: error.message,
      });
    }
  },
  edit: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };

    try {
      axios
        .put(
          `https://cinemaapi.serveo.net/showing/${data.get("h_id")}`,
          {
            hall_name: data.get("hall_name"),
            id: data.get("id"),
          },
          { headers: customHeaders }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add showing",
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
      message: "Added showing successfully",
    };
  },
} satisfies Actions;
