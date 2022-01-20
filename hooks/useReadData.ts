import { useMutation } from "react-query";
import { supabase } from "../utils/supabaseClient";

interface companyTable {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  pin: number;
  city: string;
  state: string;
  country: string;
  type: string;
  dl_no: string;
  pan_no: string;
  responsible_person: string;
  responsible_phone: number;
  gstin: string;
}

// const addMovie = async (ledger: companyTable, user_id: string) => {
//   const { error } = await supabase.from("movies").upsert(ledger).single();

//   if (error) {
//     throw error;
//   }

//   const { data, error: err } = await supabase
//     .from("recommendations")
//     .upsert(
//       { movie_id: ledger.movie_id, user_id },
//       {
//         onConflict: "user_id, movie_id",
//       }
//     )
//     .single();

//   if (err) {
//     throw err;
//   }

//   return data;
// };

const readData = async (
  table_name: string,
  startRow: number,
  endRow: number
) => {
  console.log("Reaching supabase query function");

  await supabase
    .from(table_name)
    .select("*", { count: "exact" })
    .range(startRow, endRow)
    .then(({ data, error }) => {
      if (!error) {
        return data;
      }
    });
};

export default function useReadData(
  table_name: string,
  startRow: number,
  endRow: number
) {
  console.log("Reaching useReadData Hook");
  //   const user = supabase.auth.user();
  //   return useMutation(() => addMovie(ledger, user?.id));
  return useMutation(() => readData(table_name, startRow, endRow));
}
