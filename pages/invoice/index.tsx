import SimpleTable from "../../components/Tables/SimpleTable";
import ProtectedWrapper from "../../components/layout/Protected";
import SimpleButton from "../../components/Buttons/SimpleButton";
import {
  SearchIcon,
  PlusSmIcon,
  RefreshIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import ModalHOC from "../../components/HigherOrderComponents/ModalHOC";
import SimpleSideModal from "../../components/Modal/SimpleSideModal";

import { columns } from "../../public/data/data";
import { supabase } from "../../utils/supabaseClient";
import React, { useMemo, useRef } from "react";
import ComboBox from "../../components/Buttons/ComboBox";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
// tableData={tableData}
// tableName={menuItem}
// sortby={sortby}
// state={show}
// setState={setShow}

interface invoiceData {}

function App() {
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [show, setShow] = useState(false);
  const Toggle = () => {
    setShow(!show);
  };
  const [selectedPerson, setSelectedPerson] = useState("Something");
  let [company, setCompany] = useState([""]);

  let tableData = columns[5];

  const getData = async () => {
    const { data, error } = await supabase
      .from("ledger")
      .select("company_name");
    let arr: string[] = [];
    data!.map((key, i) => {
      arr.push(String(Object.values(key)[0]));
    });
    setCompany(arr);
    setSelectedOption(arr[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  const [selectedOption, setSelectedOption] = useState(company[0]);
  return (
    <ProtectedWrapper>
      <main className="flex w-full h-screen border-gray-200">
        {/* MAIN SECTION */}
        <section
          aria-labelledby="primary-heading"
          className="w-full flex flex-col lg:order-last items-center overflow-auto"
        >
          <div className="flex border-b border-coffee relative px-4 justify-start z-10 space-x-4 items-stretch self-stretch">
            {/* <div className="flex-1">
                <TickerTape />
              </div> */}
            <div className="py-1 flex space-x-2">
              <ComboBox
                data={company}
                state={selectedOption}
                setState={setSelectedOption}
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
              <div className="flex flex-col bg-white border-2 border-black w-[1200px] h-[800px]">
                <div className="flex flex-row border-b-2 border-black justify-between w-full h-1/4">
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
                  <span className=" w-full border-r-2 leading-none border-black px-4 py-2 text-blue-900 text-center">
                    <h1 className="font-extrabold text-3xl">GST INVOICE</h1>
                    {/* <h1 className="font-extrabold text-md">CREDIT</h1> */}
                    <div className="p-4">
                      <dl className="bg-white grid grid-cols-2">
                        <div className="flex flex-col border-blue-900 p-2 text-center border-0 border-r">
                          <dt className="order-2 mt-2 text-lg leading-6 font-medium">
                            #21313213
                          </dt>
                          <dd className="order-1 font-bold">Invoice No</dd>
                        </div>
                        <div className="flex flex-col border-blue-900 p-2 text-center border-0 border-l">
                          <dt className="order-2 mt-2 text-lg leading-6 font-medium">
                            23/03/2021
                          </dt>
                          <dd className="order-1 font-bold">Invoice Date</dd>
                        </div>
                      </dl>
                    </div>
                  </span>
                  <span className=" w-full px-4 py-2 leading-none">
                    {/* <div className="w-6/6 px-4 py-2 border-r-2 border-dotted border-black"> */}
                    <h1 className="font-extrabold text-lg mb-2">
                      BILLING ADDRESS
                    </h1>
                    <p className="text-sm font-bold leading-tight">
                      AB-8, BASEMENT, COMMUNITY CENTRE, SAFDARJANG ENCLAVE, NEW
                      DELHI-29 <br />
                      State : 07 (110029)
                      <br /> PHONE. : 01126161817, 4051560, 9811283881
                      <br /> GSTIN : 07ANDPP2450P1ZN
                    </p>
                    {/* </div> */}
                    {/* <div className="w-3/6 px-4 py-2">
                      <span className="font-bold">Shipping Address :-</span>
                    </div> */}
                  </span>
                </div>
                <div className="flex border-b-2 border-black flex-col justify-between">
                  <div className="border-b-2 border-black h-96">
                    <SimpleTable
                      tableData={tableData}
                      show={show}
                      tableName={"invoice_items"}
                      state={selectedPerson}
                      setState={setSelectedPerson}
                      invoiceData={invoiceData}
                      setInvoiceData={setInvoiceData}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full h-28">
                    <span className="border-r-2 border-black w-9/12">05</span>
                    <span className=" w-3/12">06</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between w-full h-1/4">
                  <span className="border-r-2 border-black w-5/12">07</span>
                  <span className="border-r-2 border-black w-4/12">08</span>
                  <span className=" w-3/12">09</span>
                </div>
              </div>
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
            state={selectedPerson}
            setState={setSelectedPerson}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
          />
        </ModalHOC>
      </main>
    </ProtectedWrapper>
  );
}

export default App;
