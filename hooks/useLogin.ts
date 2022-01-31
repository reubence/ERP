import { useMutation } from "react-query";
import { supabase } from "../utils/supabaseClient";
import App from "../components/Tables/SimpleStripedTable";
// interface User {
//   email: string;
//   password: string;
// }
const login = async ({ email, password }: AppProps) => {
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

interface AppProps {
  email: string;
  password: string;
}

export default function useLogin({ email, password }: AppProps) {
  return useMutation(() => login({ email, password }));
}
