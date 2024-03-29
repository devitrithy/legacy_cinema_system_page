import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  let page = Number(url.searchParams.get("page")) || 1;
  const count = await axios.get(`${PUBLIC_API_ENDPOINT}/department`, {
    headers: customHeaders,
  });

  if (page > count.data.count / 5 + 1) {
    throw redirect(302, "/department");
  }
  const data = await fetch(`${PUBLIC_API_ENDPOINT}/department?page=${page}`, {
    headers: customHeaders,
  });
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
        .post(`${PUBLIC_API_ENDPOINT}/department`, {
          department_name: data.get("department_name"),
          description: data.get("description"),
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add department",
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
      message: "Added department successfully",
    };
  },

  delete: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .delete(`${PUBLIC_API_ENDPOINT}/department/` + data.get("id"))
        .then((response) => {
          return {
            success: true,
            message: "Deleted successfully",
          };
        })
        .catch((err) => {
          return {
            success: false,
            message: "Some problem occurred while deleting the department",
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
        .put(`${PUBLIC_API_ENDPOINT}/department/${data.get("id")}`, {
          department_name: data.get("department_name"),
          description: data.get("description"),
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          return {
            success: false,
            message: "Fail to add department",
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
      message: "Added department successfully",
    };
  },
} satisfies Actions;
