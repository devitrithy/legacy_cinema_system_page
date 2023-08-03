import { fail, type Actions, redirect } from "@sveltejs/kit";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  let page = Number(url.searchParams.get("page")) || 1;
  const count = await axios.get("http://localhost:3000/showing");

  if (page > count.data.count / 5 + 1) {
    throw redirect(302, "/showing");
  }
  const showing = await fetch(`http://localhost:3000/showing`);
  let halls = showing.json();
  return {
    data: halls,
  };
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .post("http://localhost:3000/showing", {
          showing_date: data.get("date"),
          movie_id: data.get("movie_id"),
          hall_id: data.get("hall_id"),
          price: data.get("price"),
        })
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

  delete: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .delete("http://localhost:3000/showing/" + data.get("id"))
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
  edit: async ({ request }) => {
    const data = await request.formData();

    try {
      axios
        .put(`http://localhost:3000/showing/${data.get("h_id")}`, {
          hall_name: data.get("hall_name"),
          id: data.get("id"),
        })
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
