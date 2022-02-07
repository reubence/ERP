import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export default function useLogOut() {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries();
      // router.push("/auth/login");
    },
  });
}
