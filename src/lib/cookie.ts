import { Cookie } from "js-cookie";

// Set a cookie with given options
export function setCookie(name: String, value: String, options = {}) {
  Cookie.set(name, value, options);
}

// Get the value of a cookie by name
export function getCookie(name) {
  return Cookie.get(name);
}

// Remove a cookie by name
export function removeCookie(name) {
  Cookie.remove(name);
}
