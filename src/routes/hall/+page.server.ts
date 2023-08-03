import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  let page = Number(url.searchParams.get("page")) || 1;
  const count = await axios.get("https://cinemaapi.serveo.net/hall", {
    headers: customHeaders,
  });

  if (page > count.data.count / 5 + 1) {
    throw redirect(302, "/hall");
  }
  const hall = await fetch(`https://cinemaapi.serveo.net/hall`, {
    headers: customHeaders,
  });
  let halls = hall.json();
  return {
    data: halls,
  };
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .post("https://cinemaapi.serveo.net/hall", {
          hall_name: data.get("hall_name"),
          id: data.get("id"),
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add hall",
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
      message: "Added hall successfully",
    };
  },

  delete: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .delete("https://cinemaapi.serveo.net/hall/" + data.get("id"))
        .then((response) => {
          return {
            success: true,
            message: "Deleted successfully",
          };
        })
        .catch((err) => {
          return {
            success: false,
            message: "Some problem occurred while deleting the hall",
          };
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
        .put(`https://cinemaapi.serveo.net/hall/${data.get("h_id")}`, {
          hall_name: data.get("hall_name"),
          id: data.get("id"),
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add hall",
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
      message: "Added hall successfully",
    };
  },
} satisfies Actions;
