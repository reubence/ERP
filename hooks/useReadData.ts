import { useMutation, useQuery } from "react-query";
import { supabase } from "../utils/supabaseClient";
import axios from "axios";
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

interface props {
  table_name: string;
  startRow: number;
  endRow: number;
}

const readData = async ({ table_name, startRow, endRow }: props) => {
  console.log("Reaching supabase query function");
  const { data, error } = await supabase
    .from(table_name)
    .select("*")
    .range(startRow, endRow);
  // .then(({ data, error }) => {
  //   if (!error) {
  //     return data as [];
  //   } else {
  //     return error;
  //   }
  // });

  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }

  return data;
};

export default function useReadData({ table_name, startRow, endRow }: props) {
  // console.log("Reaching useReadData Hook");
  //   const user = supabase.auth.user();
  //   return useMutation(() => addMovie(ledger, user?.id));

  // const { isLoading, error, data } = useQuery("table", () =>
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.data)
  // );
  // if (isLoading) return "Loading...";
  // if (error) return "An error occurred" + error.message;

  // console.log(data);

  return useMutation(
    () => readData({ table_name, startRow, endRow })
    // {
    //   onSuccess: (data) => {
    //     console.log("Get data!");
    //     console.log(data);
    //   },
    // }
  );
}
