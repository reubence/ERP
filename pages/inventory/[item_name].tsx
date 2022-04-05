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

function Inventory({ data, error, projects }: any) {
  const [inventoryData, setInventoryData] = useState<any[]>(data); // LOCAL COPY OF ROWS
  const [itemName, setItemName] = useState(data[0].item_name);
  const [show, setShow] = useState(false); // MODAL
  const [selectedDropDown, setSelectedDropDown] = useState(""); // REQUIRED COMBO BOX IN MODAL
  const Toggle = () => {
    setShow(!show);
  };
  console.log(data, projects);
  let tableData = columns[1];

  const updataData = ({ obj }: any) => {};

  return (
    <>
      <ProtectedWrapper>
        <main className="min-w-0 flex-1 h-screen border-gray-200 lg:flex">
          {/* MAIN SECTION */}
          <section
            aria-labelledby="primary-heading"
            className="flex flex-1 flex-col lg:order-last items-center overflow-y-auto"
          >
            {/* TOP INPUT COMBO BOX && BUTTONS */}
            <div className="w-full flex border-b h-16 items-center border-coffee bg-white px-8 justify-start z-10 space-x-4 self-stretch">
              <Breadcrumb
                pages={[
                  {
                    name: "Items List",
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
                    onClick={Toggle}
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
            <div className="lg:p-16 md:pl-96 md:p-16 flex">
              <GridCards title="Batch Items" data={projects} onClick={Toggle} />
            </div>
          </section>
          {/* MODAL FOR LOG-PAYMENT */}
          <ModalHOC selector="#modal">
            <SideModal
              show={show}
              close={Toggle}
              tableName={"invoice_items"}
              dataModal={tableData}
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
  const projects: any = [];
  data.map((item: any) => {
    projects.push({
      name: item.item_name,
      initials: "# " + item.batch_no,
      href: "#",
      members: item.group_,
      bgColor: "bg-pink-600",
    });
  });
  return {
    props: {
      data: data,
      error: error,
      projects,
    },
  };
}

export default Inventory;
