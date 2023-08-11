import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { auth } from "$lib/auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  //1
  const token = event.cookies.get("token");
  const customHeaders = {
    Authorization: "Bearer " + token, // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  };
  const authData = await fetch(`${PUBLIC_API_ENDPOINT}/user/callback`, {
    headers: customHeaders,
  });
  event.locals.user = auth(event);
  const response = await resolve(event); //2
  //3
  if (!event.url.pathname.startsWith("/login")) {
    if (authData.status !== 200) {
      const fromUrl = event.url.pathname + event.url.search;
      throw redirect(303, `/login?r=${fromUrl}`);
    }
  }

  return response;
};
