import { PlusSmIcon, PrinterIcon } from "@heroicons/react/solid";
import { CashIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import SimpleButton from "../../components/Buttons/SimpleButton";
import ModalHOC from "../../components/HigherOrderComponents/ModalHOC";
import Breadcrumb from "../../components/layout/Breadcrumbs";
import ProtectedWrapper from "../../components/layout/Protected";
import { columns } from "../../public/data/data";
import { supabase } from "../../utils/supabaseClient";
import React, { useRef } from "react";

import GridCards from "../../components/Grid/Cards";
import SideModal from "../../components/Modal/SideModal";

function Inventory({ data, error }: any) {
  const [itemName, setItemName] = useState(data[0].name);
  const [show, setShow] = useState(false); // MODAL
  let tableData = columns[1];
  const [inventoryData, setInventoryData] = useState<any>(tableData); // LOCAL COPY OF ROWS
  const [selectedDropDown, setSelectedDropDown] = useState("High"); // REQUIRED COMBO BOX IN MODAL
  const Toggle = (data: any) => {
    setInventoryData(data);
    setShow(!show);
  };

  const updataData = ({ obj }: any) => {};

  return (
    <>
      <ProtectedWrapper>
        <main className="min-w-0 flex-1 h-screen border-gray-200 lg:flex">
          {/* MAIN SECTION */}
          <section
            aria-labelledby="primary-heading"
            className="flex flex-1 flex-col lg:order-last overflow-y-auto"
          >
            {/* TOP INPUT COMBO BOX && BUTTONS */}
            <div className="w-full flex border-b h-16 items-center border-coffee bg-white justify-start z-10 space-x-4 self-stretch">
              <Breadcrumb
                pages={[
                  {
                    name: "Inventory",
                    href: "/data#inventory",
                    current: false,
                  },
                  {
                    name: `Item (${itemName})`,
                    href: "#",
                    current: true,
                  },
                ]}
              />

              <div className="py-1 flex space-x-2">
                <div
                  className="top-2 right-6 fixed inline-flex items-center text-sm font-medium rounded-md text-gray-500 "
                  id="download"
                >
                  <SimpleButton
                    setSolid={false}
                    text="Add New Batch"
                    icon={CashIcon}
                    onClick={() => Toggle(tableData)}
                    btnClass={`px-3 py-3 bg-secondary-100 group-hover:bg-green-500 text-white cursor-pointer text-white`}
                  />
                  {/* <SimpleButton
                    setSolid={false}
                    text="Add New Batch"
                    icon={TrashIcon}
                    // onClick={handleDelete}
                    btnClass={`px-3 py-3 bg-red-500 group-hover:bg-red-600 text-white cursor-pointer text-white`}
                  /> */}
                </div>
              </div>
            </div>
            <div className="lg:p-12 flex">
              <GridCards
                title="Batches"
                data={data}
                onClick={Toggle}
                show={show}
                state={selectedDropDown}
                setState={setSelectedDropDown}
              />
            </div>
          </section>
          {/* MODAL FOR LOG-PAYMENT */}
          <ModalHOC selector="#modal">
            <SideModal
              show={show}
              close={Toggle}
              tableName={"inventory"}
              dataModal={inventoryData}
              state={selectedDropDown}
              setState={setSelectedDropDown}
              // data={inventoryData}
              // setInvoiceData={updataData}
              // invoiceNo={invoiceNo}
              // serial={serial}
            />
          </ModalHOC>
        </main>
      </ProtectedWrapper>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const { params } = context;
  const { item_name } = params;
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .match({ item_name: item_name });

  if (!data) {
    return {
      notFound: true,
    };
  }
  console.log("HEEERE", data[0]);
  const projects: any = [];
  data.map((item: any) => {
    projects.push({
      name: item.item_name,
      initials: "# " + item.batch_no,
      href: "#",
      subtitle: item.group_ + " Stock",
      line1: "Stock In Hand : " + item.stock_in_hand,
      line2: "Expiry : " + item.expiry,
      bgColor:
        item.group_ === "High"
          ? "bg-secondary-100"
          : item.group_ === "Low"
          ? "bg-red-500"
          : "bg-gray-300 text-gray-700",
      values: item,
    });
  });
  return {
    props: {
      data: projects,
      error: error,
    },
  };
}

export default Inventory;
