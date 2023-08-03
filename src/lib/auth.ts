// src/auth.js

import { writable } from "svelte/store";

// Create a writable store to manage authentication state
export const isAuthenticated = writable(false);
export const currentUser = writable(null);

// Function to log in a user
export async function login(username: String, password: String) {
  // Call your authentication service or API to validate the credentials
  // If authentication is successful, set isAuthenticated to true and store user data
  isAuthenticated.set(true);
  currentUser.set({ username: username }); // You can store more user data as needed
}

// Function to log out a user
export async function logout() {
  // Perform any cleanup or logout actions
  isAuthenticated.set(false);
  currentUser.set(null);
}
