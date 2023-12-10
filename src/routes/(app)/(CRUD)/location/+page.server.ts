import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  let page = Number(url.searchParams.get("page")) || 1;
  const count = await axios.get(`${PUBLIC_API_ENDPOINT}/location`, {
    headers: customHeaders,
  });

  if (page > count.data.count / 5 + 1) {
    throw redirect(302, "/location");
  }
  const data = await fetch(`${PUBLIC_API_ENDPOINT}/location?page=${page}`, {
    headers: customHeaders,
  });
  const res = data.json();
  return {
    data: res,
  };
};

export const actions = {
  create: async ({ cookies, request }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };

    try {
      axios
        .post(`${PUBLIC_API_ENDPOINT}/location`, data, {
          headers: customHeaders,
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add location",
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
      message: "Added location successfully",
    };
  },

  delete: async ({ cookies, request }) => {
    const data = await request.formData();
    const token = cookies.get("token");
    const customHeaders = {
      Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    };

    try {
      axios
        .delete(`${PUBLIC_API_ENDPOINT}/location/` + data.get("id"), {
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
            message: "Some problem occurred while deleting the location",
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
        .put(`${PUBLIC_API_ENDPOINT}/location/${data.get("id")}`, data, {
          headers: customHeaders,
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add location",
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
      message: "Added location successfully",
    };
  },
} satisfies Actions;
