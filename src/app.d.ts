// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
type User = {
  user_id: string;
  email: string;
  profile: string;
  firstname: string;
  lastname: string;
  username: string;
};

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
