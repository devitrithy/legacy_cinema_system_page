import { NODE_ENV } from "$env/static/private";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const token = cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const peakHours = async () => {
    const res = await fetch(
      `${PUBLIC_API_ENDPOINT}/report/peak-booking-hours`,
      {
        headers: customHeaders,
      }
    );
    return res.json();
  };
  const today = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/report/revenue/day`, {
      headers: customHeaders,
    });
    return res.json();
  };
  const month = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/report/revenue/month`, {
      headers: customHeaders,
    });
    return res.json();
  };
  const year = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/report/revenue/year`, {
      headers: customHeaders,
    });
    return res.json();
  };
  const overall = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/report/revenue/overall`, {
      headers: customHeaders,
    });
    return res.json();
  };
  const mostWatched = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/report/most-watched`, {
      headers: customHeaders,
    });
    return res.json();
  };
  const cinemasMostWatched = async () => {
    const res = await fetch(
      `${PUBLIC_API_ENDPOINT}/report/most-booked-showings`,
      {
        headers: customHeaders,
      }
    );
    return res.json();
  };
  const genre = async () => {
    const res = await fetch(
      `${PUBLIC_API_ENDPOINT}/report/most-watched-genre`,
      {
        headers: customHeaders,
      }
    );
    return res.json();
  };
  //console.log(genre());
  const users = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/report/active-users`, {
      headers: customHeaders,
    });
    return res.json();
  };
  return {
    today: today(),
    month: month(),
    year: year(),
    overall: overall(),
    peakHours: peakHours(),
    mostWatched: mostWatched(),
    cinemasMostWatched: cinemasMostWatched(),
    mostWatchGenre: genre(),
    users: users(),
  };
};
