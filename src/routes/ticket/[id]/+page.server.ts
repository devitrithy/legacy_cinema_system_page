import axios from "axios";
import type { Actions, PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params, cookies }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const ticket = async () => {
    const da = await fetch("https://cinemaapi.serveo.net/ticket/" + params.id);
    return da.json();
  };
  const showing = async () => {
    const da = await fetch(
      "https://cinemaapi.serveo.net/showing/" + params.id,
      {
        headers: customHeaders,
      }
    );
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
    console.log(arrayData);
    arrayData?.forEach((element) => {
      arrayDatas.push({
        showing_id: params.id,
        seat: element,
      });
    });
    try {
      const pay = await axios.post("https://cinemaapi.serveo.net/ticket", {
        arrayDatas,
      });
      console.log(pay);
    } catch (error) {
      console.log(error);
    }
  },
};
