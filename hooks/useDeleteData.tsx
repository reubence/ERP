import { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { supabase } from "../utils/supabaseClient";

export const useDeleteData = async (
  tableName: any,
  selectedFlatRows: any[]
) => {
  const ids = selectedFlatRows.map((d) => d.original.id);
  const { data, error } = await supabase.from("ledger").delete().in("id", ids);

  if (error) {
    console.log("Error bhai");
    throw new Error(error.message);
  }

  if (data) {
    toast.success("Row Deleted Successfully", {
      duration: 6000,
      position: "bottom-right",
      style: {
        background: "#262125",
        color: "#ffffff",
      },
    });
  }
  return data;
};
