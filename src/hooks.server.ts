import { redirect, type Handle } from "@sveltejs/kit";
import { verify } from "jsonwebtoken";

export const handle: Handle = async ({ event, resolve }) => {
  //1
  const token = event.cookies.get("token");
  if (token) {
    let user = verify(token, "anh thunh jm aii");
    event.locals.user = {
      user_id: user.user_id,
      profile: user.profile,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
    };
  }
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
