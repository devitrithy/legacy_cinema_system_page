import { auth } from "$lib/auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  //1
  event.locals.user = auth(event);
  if (
    event.url.pathname.startsWith("/") &&
    !event.url.pathname.startsWith("/login")
  ) {
    if (!event.locals.user) {
      throw redirect(303, "/login");
    }
  }

  const response = await resolve(event); //2
  //3

  return response;
};
