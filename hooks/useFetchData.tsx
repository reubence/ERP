import { User } from "@supabase/supabase-js";
import { useQuery } from "react-query";
import { supabase } from "../utils/supabaseClient";

export const useFetchData = async (
  tableName: any,
  startRow: any,
  endRow: any
) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .range(startRow, endRow);

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
