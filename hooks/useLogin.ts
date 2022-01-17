import { useMutation } from "react-query";
import { supabase } from "../utils/supabaseClient";
// interface User {
//   email: string;
//   password: string;
// }
const login = async ({ email, password }) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    console.log("Error bhai");
    throw new Error(error.message);
  }

  return user;
};

export default function useLogin({ email, password }) {
  return useMutation(() => login({ email, password }));
}
