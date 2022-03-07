import { supabase } from "../../utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { CSVLink, CSVDownload } from "react-csv";
import XLSX from "xlsx";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("ledger").select("*");

  //   if (error) throw new Error(`unexpected response ${error.message}`);
  //   console.log(data);
  //   const downloadExcel = () => {
  //     const worksheet = XLSX.utils.json_to_sheet(data);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //     //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //     //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  //     XLSX.writeFile(workbook, "DataSheet.xlsx");
  //   };
  //   downloadExcel;

  return res.status(200).json(data);
};
