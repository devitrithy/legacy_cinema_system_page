import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export const load: PageServerLoad = async ({ url, cookies }) => {
  try {
    let page = Number(url.searchParams.get("page")) || 1;
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };
    const count = await axios.get(`${PUBLIC_API_ENDPOINT}/showing`, {
      headers: customHeaders,
    });

    if (page > count.data.count / 5 + 1) {
      throw redirect(302, "/showingtime");
    }
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/showing?page=${page}`, {
      headers: customHeaders,
      credentials: "include",
    });
    return {
      data: data.json(),
    };
  } catch (err) {
    console.log(err.response.data.message);
    if (err.response.status === 401) {
      cookies.delete("token");
      throw redirect(303, "/login");
    }
    throw error(400, {
      message: "Permission Denied",
    });
  }
};

export const actions = {
  create: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };
    let times = data.get("time")?.toString().split(",");
    let arrayTimes = [];
    times?.forEach((time) => {
      arrayTimes.push({
        showing_date: new Date(
          `${data.get("date")}T${time}:00.000Z`
        ).toISOString(),
        price: data.get("price"),
        movie_id: data.get("movie_id"),
        hall_id: data.get("hall_id"),
      });
    });

    try {
      axios
        .post(
          `${PUBLIC_API_ENDPOINT}/showing`,
          { arrayTimes },
          {
            headers: customHeaders,
          }
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
        .delete(`${PUBLIC_API_ENDPOINT}/showing/` + data.get("id"), {
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
          `${PUBLIC_API_ENDPOINT}/showing/${data.get("h_id")}`,
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
