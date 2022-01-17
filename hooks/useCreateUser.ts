import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../utils/supabaseClient";

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
}

const createUser = async (yolo: User) => {
  // Check if username exists
  const { data: userWithUsername } = await supabase
    .from("users")
    .select("*")
    .eq("username", yolo.username)
    .single();

  if (userWithUsername) {
    console.log(yolo);
    throw new Error("User with username exists");
  }

  const { user, error: signUpError } = await supabase.auth.signUp({
    email: yolo.email,
    password: yolo.password,
  });

  if (signUpError) {
    console.log("Error bhai");
    throw signUpError;
  }

  return user;
};

export default function useCreateUser(user: User) {
  return useMutation(() => createUser(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({
          name: user.name,
          username: user.username,
          id: data.id,
        });

      if (insertError) {
        throw insertError;
      }

      return insertData;
    },
  });
}
