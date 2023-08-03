import pkg from "jsonwebtoken";
const { verify } = pkg;

export const auth = (event) => {
  const token = event.cookies.get("token");
  if (token) {
    let user = verify(token, "anh thunh jm aii");
    return {
      user_id: user.user_id,
      profile: user.profile,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
    };
  }
  return null;
};
