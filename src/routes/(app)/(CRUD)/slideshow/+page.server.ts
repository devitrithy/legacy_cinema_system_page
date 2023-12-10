import { error, fail, type Actions, redirect } from "@sveltejs/kit";
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
    const count = await axios.get(`${PUBLIC_API_ENDPOINT}/slideshow`, {
      headers: customHeaders,
    });

    if (page > count.data.count / 5 + 1) {
      throw redirect(302, "/slideshow");
    }
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/slideshow?page=${page}`, {
      headers: customHeaders,
      credentials: "include",
    });
    return {
      data: data.json(),
    };
  } catch (err) {
    //console.log(err);
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

    try {
      const token = cookies.get("token");
      const customHeaders = {
        Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
      };
      axios
        .post(`${PUBLIC_API_ENDPOINT}/slideshow`, data, {
          headers: customHeaders,
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add slideshow",
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
      message: "Added slideshow successfully",
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
        .delete(`${PUBLIC_API_ENDPOINT}/slideshow/` + data.get("id"), {
          headers: customHeaders,
        })
        .then((response) => {
          //console.log(response.status);
          if (response.status === 400) {
            return fail(400, { message: response.data.message });
          }
          return {
            success: true,
            message: "Deleted successfully",
          };
        })
        .catch((err) => {
          //console.log(err);
          return fail(400, { message: "Failed to delete slideshow." });
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
        .put(`${PUBLIC_API_ENDPOINT}/slideshow/${data.get("id")}`, data, {
          headers: customHeaders,
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add slideshow",
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
      message: "Added slideshow successfully",
    };
  },
} satisfies Actions;
