import { User } from "@supabase/supabase-js";
import { useQuery } from "react-query";
import { supabase } from "../utils/supabaseClient";

const getUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .single();

  if (error) {
    console.log("Error bhai");
    throw new Error(error.message);
  }

  if (!data) {
    console.log("Error bhai");
    throw new Error("User not found");
  }

  return data;
};

export default function useUser() {
  const user = supabase.auth.user();
  return useQuery("user", () => getUser(user?.id!));
}
