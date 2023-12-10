import axios from "axios";
import type { Actions, PageServerLoad } from "../$types";
import { error, redirect } from "@sveltejs/kit";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const ticket = async () => {
    const da = await fetch(`${PUBLIC_API_ENDPOINT}/ticket/` + params.id);
    return da.json();
  };
  const showing = async () => {
    const da = await fetch(`${PUBLIC_API_ENDPOINT}/showing/` + params.id, {
      headers: customHeaders,
    });
    return da.json();
  };
  return {
    tickets: ticket(),
    showings: showing(),
  };
};

export const actions: Actions = {
  pay: async ({ request, params }) => {
    const p = await request.formData();
    let arrayDatas = [];
    let arrayData = p.get("pay")?.toString().split(",");
    //console.log(arrayData);
    arrayData?.forEach((element) => {
      arrayDatas.push({
        seat: element,
      });
    });
    try {
      const pay = await axios.post(`${PUBLIC_API_ENDPOINT}/ticket`, {
        sid: params.id,
        arrayDatas,
      });
      //console.log(pay);
    } catch (error) {
      //console.log(error);
    }
  },
};
