import SimpleTable from "../../components/Tables/SimpleTable";
import ProtectedWrapper from "../../components/layout/Protected";
import SimpleButton from "../../components/Buttons/SimpleButton";
import { PlusSmIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import ModalHOC from "../../components/HigherOrderComponents/ModalHOC";
import SimpleSideModal from "../../components/Modal/SimpleSideModal";
import { columns } from "../../public/data/data";
import { supabase } from "../../utils/supabaseClient";
import React, { useMemo, useRef } from "react";
import ComboBox from "../../components/Buttons/ComboBox";
import moment from "moment";
import _, { toNumber } from "lodash";

// GST DATA COLUMNS
const totalDataColumn = [
  {
    Header: "TOTAL",
    accessor: "total" as const,
    type: "text",
  },
  {
    Header: "400021",
    accessor: "num" as const,
    type: "text",
  },
];

// GST DATA
const totalData = [
  {
    total: "ITEM DIS AMT.",
    num: 0,
  },
  {
    total: " BILL DIS AMT.",
    num: 0,
  },
  {
    total: "TOTAL DIS",
    num: 0,
  },
  {
    total: "IGST PAYBLE",
    num: 0,
  },
  {
    total: "Round off",
    num: 0,
  },
];

// GST DATA COLUMNS
const gstDataColumns = [
  {
    Header: "Class",
    Footer: "TOTAL",
    accessor: "class" as const,
    type: "text",
  },
  {
    Header: "Total",
    accessor: "total" as const,
    type: "number",
    Footer: (info: { rows: any[] }) => {
      // Only calculate total visits if rows change
      const total = React.useMemo(
        () => info.rows.reduce((sum, row) => row.values.total + sum, 0),
        [info.rows]
      );

      return <>{total}</>;
    },
  },
  // {
  //   Header: "Scheme",
  //   accessor: "scheme" as const,
  //   type: "text",
  //   Footer: (info: { rows: any[] }) => {
  //     // Only calculate total visits if rows change
  //     const total = React.useMemo(
  //       () => info.rows.reduce((sum, row) => row.values.scheme + sum, 0),
  //       [info.rows]
  //     );

  //     return <>{total}</>;
  //   },
  // },
  {
    Header: "discount",
    accessor: "discount" as const,
    type: "number",
    Footer: (info: { rows: any[] }) => {
      // Only calculate total visits if rows change
      const total = React.useMemo(
        () => info.rows.reduce((sum, row) => row.values.discount + sum, 0),
        [info.rows]
      );

      return <>{total}</>;
    },
  },
  {
    Header: "igst",
    accessor: "igst" as const,
    type: "number",
    Footer: (info: { rows: any[] }) => {
      // Only calculate total visits if rows change
      const total = React.useMemo(
        () => info.rows.reduce((sum, row) => row.values.igst + sum, 0),
        [info.rows]
      );

      return <>{total}</>;
    },
  },
];

// GST DATA
const gstDataMeta: any[] = [
  {
    class: "IGST 5.00%",
    total: 0,
    // scheme: 2000,
    discount: 0,
    igst: 0,
  },
  {
    class: "IGST 12.00%",
    total: 0,
    // scheme: 0,
    discount: 0,
    igst: 0,
  },
  {
    class: "IGST 18.00%",
    total: 0,
    // scheme: 0,
    discount: 0,
    igst: 0,
  },
];

function App() {
  // INITIALIZE STATE
  const [invoiceData, setInvoiceData] = useState<any[]>([]); // LOCAL COPY OF ROWS
  const [show, setShow] = useState(false); // MODAL
  const Toggle = () => {
    setShow(!show);
  };
  let [company, setCompany] = useState<string[]>([]); // LIST OF COMPANIES AVAILABLE TO CHOOSE FROM
  let tableData = columns[5];
  const [invoiceBillData, setInvoiceBillData] = useState<any[]>([]); // INVOICE DATA
  const [selectedCompany, setSelectedCompany] = useState(""); // SELECTED COMPANY
  const [selectedGST, setSelectedGST] = useState("5"); // REQUIRED COMBO BOX IN MODAL
  const [serial, setSerial] = useState(1); // SERIAL NOs
  const [gstData, setGstData] = useState<any[]>(gstDataMeta); //GST DATA TABLE
  const [totalTable, setTotalTable] = useState<any[]>(totalData);

  // DATA STATES :- INV. NO, QTY, IGST, TOTAL, DIS, SCHEME
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [qty, setQty] = useState(0);

  // ADDING ROW TO LOCAL CACHE
  const updataData = ({ obj }: any) => {
    setInvoiceData((oldArray: any) => {
      let arr: any[] = [];
      let delRowIndex = 2000;
      if (!obj["add"]) {
        oldArray.map((item: { [key: string]: any }, index: number) => {
          if (item["s_no"] === obj["s_no"]) {
            setGstData((prevState) => {
              let temp = prevState;

              let j = null;
              if (Number(item.igst) === 5) {
                j = 0;
              } else if (Number(item.igst) === 12) {
                j = 1;
              } else {
                //
                j = 2;
              }
              temp[j].total = Number(prevState[j].total) - Number(item.total);
              temp[j].discount =
                Number(prevState[j].discount) - Number(item.discount);
              temp[j].igst = Number(prevState[j].igst) - Number(item.igst);

              return [...temp];
            });

            setTotalTable((prevState) => {
              let temp = prevState;
              temp[0].num = Number(prevState[0].num) - Number(item.discount); // ITEM DIS
              temp[1].num = Number(prevState[1].num) - Number(item.discount); // BILL DIS
              temp[2].num = Number(prevState[2].num) - Number(item.discount); // TOTAL DIS
              temp[3].num = Number(prevState[3].num) - Number(item.igst); // IGST PAYABLE
              temp[4].num = 1; // ROUND OFF
              return [...temp];
            });
            //DELETE
            if (obj["delete"]) {
              setQty((prevState) => {
                return prevState - Number(item["qty"]);
              });
              oldArray.splice(index, 1);
              delRowIndex = index;
              arr = [...oldArray];
              setSerial(serial - 1);
              for (let i = 0; i < arr.length; i++) {
                console.log(arr[i]["s_no"]);
                if (i >= delRowIndex) {
                  arr[i]["s_no"] = Number(arr[i]["s_no"] - 1);
                  console.log(arr[i]);
                }
              }
              // EDIT
            } else if (obj["edit"]) {
              setGstData((prevState) => {
                let i = null;
                if (Number(obj["igst"]) === 5) {
                  i = 0;
                } else if (Number(obj["igst"]) === 12) {
                  i = 1;
                } else {
                  //
                  i = 2;
                }
                let temp = prevState;

                temp[i].total = Number(prevState[i].total) + Number(obj.total);
                temp[i].discount =
                  Number(prevState[i].discount) + Number(obj.discount);
                temp[i].igst = Number(prevState[i].igst) + Number(obj.igst);

                return [...temp];
              });

              setTotalTable((prevState) => {
                let temp = prevState;
                temp[0].num = Number(prevState[0].num) + Number(obj.discount);
                temp[1].num = Number(prevState[1].num) + Number(obj.discount);
                temp[2].num = Number(prevState[2].num) + Number(obj.discount);
                temp[3].num = Number(prevState[3].num) + Number(obj.igst);
                temp[4].num = 1;
                return [...temp];
              });

              oldArray[index] = obj;
              setQty((prevState) => {
                return prevState - Number(item["qty"]) + Number(obj["qty"]);
              });
              arr = [...oldArray];

              // ADDING IGST TOTALS
            }
          }
        });
      }

      // ADD ROW
      if (obj["add"]) {
        setSerial(serial + 1);
        setQty((prevState) => {
          return Number(obj["qty"]) + prevState;
        });

        arr = [...oldArray, obj];

        // ADDING IGST TOTALS
        setGstData((prevState) => {
          let i = null;
          if (Number(obj["igst"]) === 5) {
            i = 0;
          } else if (Number(obj["igst"]) === 12) {
            i = 1;
          } else {
            //
            i = 2;
          }
          let temp = prevState;
          temp[i].total = Number(prevState[i].total) + Number(obj.total);
          temp[i].discount =
            Number(prevState[i].discount) + Number(obj.discount);
          temp[i].igst = Number(prevState[i].igst) + Number(obj.igst);

          return [...temp];
        });
        setTotalTable((prevState) => {
          let temp = prevState;
          temp[0].num = Number(prevState[0].num) + Number(obj.discount);
          temp[1].num = Number(prevState[1].num) + Number(obj.discount);
          temp[2].num = Number(prevState[2].num) + Number(obj.total);
          temp[3].num = Number(prevState[3].num) + Number(obj.igst);
          temp[4].num = 1;
          return [...temp];
        });
      }
      return arr;
    });
  };

  // COMPANY NAME DROPDOWN DATA
  const getCompanyName = async () => {
    const { data, error } = await supabase
      .from("ledger")
      .select("company_name");
    let arr: string[] = [];
    data!.map((key, i) => {
      arr.push(String(Object.values(key)[0]));
    });
    setCompany(arr);
    console.log(company);
  };

  useEffect(() => {
    getCompanyName();
  }, []);

  // GENERATE INVOICE NO
  useEffect(() => {
    setInvoiceNo(Math.random().toString(36).substring(2, 8).toUpperCase());
  }, [selectedCompany]);

  // INVOICE BILL DATA
  const getInvoiceData = async () => {
    const { data: work_address } = await supabase
      .from("ledger")
      .select("work_address")
      .eq("company_name", selectedCompany);
    const { data: company_phone } = await supabase
      .from("ledger")
      .select("company_phone")
      .eq("company_name", selectedCompany);
    const { data: state_ } = await supabase
      .from("ledger")
      .select("state_")
      .eq("company_name", selectedCompany);
    const { data: pincode } = await supabase
      .from("ledger")
      .select("pincode")
      .eq("company_name", selectedCompany);
    const { data: gstin } = await supabase
      .from("ledger")
      .select("gstin")
      .eq("company_name", selectedCompany);

    setInvoiceBillData([
      Object.values(work_address![0])[0], // BILLING ADDRESS
      Object.values(company_phone![0])[0], // PHONE NOs
      Object.values(state_![0])[0], // STATE NAME
      Object.values(pincode![0])[0], // PINCODE
      Object.values(gstin![0])[0], // GST NO
    ]);
    console.log(invoiceBillData, selectedCompany);
  };

  useEffect(() => {
    selectedCompany !== "" && getInvoiceData();
  }, [selectedCompany]);

  return (
    <ProtectedWrapper>
      <main className="flex w-full h-screen border-gray-200">
        {/* MAIN SECTION */}
        <section
          aria-labelledby="primary-heading"
          className="w-full flex flex-col lg:order-last items-center overflow-auto"
        >
          {/* TOP INPUT COMBO BOX && BUTTONS */}
          <div className="flex border-b border-coffee relative px-4 justify-start z-10 space-x-4 items-stretch self-stretch">
            <div className="py-1 flex space-x-2">
              <ComboBox
                data={company}
                state={selectedCompany}
                setState={setSelectedCompany}
              />
              <SimpleButton
                setSolid={false}
                text="Add Row"
                icon={PlusSmIcon}
                onClick={() => Toggle()}
                btnClass="bg-green-400 group-hover:bg-green-500 text-cream"
              />
            </div>
          </div>
          <div className="lg:p-24 flex md:pl-96 md:p-24">
            <div className="block shadow-2xl object-scale-down justify-center">
              {selectedCompany !== "" && (
                <div className="flex flex-col bg-white border-2 border-black w-[1200px] h-[800px]">
                  <div className="flex flex-row border-b-2 border-black justify-between w-full h-1/4">
                    {/* COMPANY DATA DEFAULTS */}
                    <div className=" w-full border-r-2 border-black px-4 py-2 text-blue-900">
                      <h1 className="font-extrabold text-lg mb-2">
                        NEO KUMFURT SOLUTIONS PVT. LTD
                      </h1>
                      <p className="text-sm font-bold leading-tight">
                        SCO - 155,GROUND FLOOR, SEC-7 MAIN MARKET,KARNAL-132001
                        <br />
                        HARYANA Phone : 9817413886, 0184-7960686
                        <br />
                        Licence No. : 20B&21B-332058-OW/H,W/H
                        <br />
                        GSTIN : 06AAFCN0531K1ZN
                      </p>
                    </div>
                    {/* INVOICE NO && DATE */}
                    <span className=" w-full border-r-2 leading-none border-black px-4 py-2 text-blue-900 text-center">
                      <h1 className="font-extrabold text-3xl">GST INVOICE</h1>
                      {/* <h1 className="font-extrabold text-md">CREDIT</h1> */}
                      <div className="p-4">
                        <dl className="bg-white grid grid-cols-2">
                          <div className="flex flex-col border-blue-900 p-2 text-center border-0 border-r">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium">
                              #{invoiceNo}
                            </dt>
                            <dd className="order-1 font-bold">Invoice No</dd>
                          </div>
                          <div className="flex flex-col border-blue-900 p-2 text-center border-0 border-l">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium">
                              {moment().format("ll")}
                            </dt>
                            <dd className="order-1 font-bold">Invoice Date</dd>
                          </div>
                        </dl>
                      </div>
                    </span>
                    {/* BILLING ADDRESS */}
                    <span className=" w-full px-4 py-2 leading-none">
                      {/* <div className="w-6/6 px-4 py-2 border-r-2 border-dotted border-black"> */}
                      <h1 className="font-extrabold text-lg mb-2">
                        BILLING ADDRESS
                      </h1>
                      <p className="text-sm font-bold leading-tight">
                        ADDRESS : {String(invoiceBillData[0]).toUpperCase()}
                        <br />
                        STATE : {invoiceBillData[3]},{" "}
                        {String(invoiceBillData[2]).toUpperCase()}
                        <br /> PHONE. : {invoiceBillData[1]}
                        <br /> GSTIN :{String(invoiceBillData[4]).toUpperCase()}
                      </p>
                      {/* </div> */}
                      {/* <div className="w-3/6 px-4 py-2">
                      <span className="font-bold">Shipping Address :-</span>
                    </div> */}
                    </span>
                  </div>
                  <div className="flex border-b-2 border-black flex-col justify-between">
                    {/* INVENTORY ITEMS TABLE */}
                    <div className="border-b-2 border-black h-96">
                      <SimpleTable
                        tableData={tableData}
                        show={show}
                        tableName={"invoice_items"}
                        state={selectedGST}
                        setState={setSelectedGST}
                        invoiceData={invoiceData}
                        setInvoiceData={updataData}
                        footer={false}
                      />
                    </div>
                    <div className="flex flex-row justify-between w-full h-32">
                      {/* GST DATA TABLE */}
                      <span className="border-r border-black w-6/12">
                        <SimpleTable
                          tableData={gstDataColumns}
                          show={show}
                          tableName={"gst_data"}
                          state={selectedGST}
                          setState={setSelectedGST}
                          invoiceData={gstData}
                          setInvoiceData={updataData}
                          footer={true}
                        />
                      </span>
                      {/* TOTAL ITEMS && TOTAL QTY. */}
                      <span className="border-r-2 border-black w-3/12">
                        <div className="flex flex-col h-full justify-center items-center space-y-4">
                          <div className="font-normal text-xl">
                            Total Items : {invoiceData.length}
                          </div>
                          <div className="font-normal text-xl">
                            Total Qty : {qty}
                          </div>
                        </div>
                      </span>
                      {/* TOTAL TABLE */}
                      <span className=" w-3/12">
                        <SimpleTable
                          tableData={totalDataColumn}
                          show={show}
                          tableName={"total_data"}
                          state={selectedGST}
                          setState={setSelectedGST}
                          invoiceData={totalTable}
                          setInvoiceData={updataData}
                          footer={false}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between w-full h-1/4">
                    <span className="border-r-2 border-black w-5/12">08</span>
                    <span className="border-r-2 border-black w-4/12">09</span>
                    <span className=" w-3/12">10</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* MODAL FOR ADD-ROW */}

        <ModalHOC selector="#modal">
          <SimpleSideModal
            show={show}
            close={Toggle}
            tableName={"invoice_items"}
            dataModal={tableData}
            state={selectedGST}
            setState={setSelectedGST}
            invoiceData={invoiceData}
            setInvoiceData={updataData}
            invoiceNo={invoiceNo}
            serial={serial}
          />
        </ModalHOC>
      </main>
    </ProtectedWrapper>
  );
}

export default App;
