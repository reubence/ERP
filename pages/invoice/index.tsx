import SimpleStripedTable from "../../components/Tables/SimpleStripedTable";
import ProtectedWrapper from "../../components/layout/Protected";
import {
  ArchiveIcon,
  CashIcon,
  ChartPieIcon,
  CogIcon,
  DownloadIcon,
  FilterIcon,
  HomeIcon,
  LibraryIcon,
  PrinterIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import SimpleButton from "../../components/Buttons/SimpleButton";
import {
  SearchIcon,
  PlusSmIcon,
  RefreshIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import ModalHOC from "../../components/HigherOrderComponents/ModalHOC";
import SideModal from "../../components/Modal/SideModal";
import { DropDownButton } from "../../components/Buttons/DropdownButton";

import { columns } from "../../public/data/data";
import { supabase } from "../../utils/supabaseClient";
import { CSVDownload, CSVLink } from "react-csv";
import ReactTable from "react-table";
import React, { useMemo, useRef } from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import moment from "moment";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import router, { useRouter } from "next/router";
import SimpleModal from "../../components/Modal/SimpleModal";
import ComboBox from "../../components/Buttons/ComboBox";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [show, setShow] = useState(false);
  let [company, setCompany] = useState([""]);
  const Toggle = () => {
    setShow(!show);
  };

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
          <div className="flex border-b border-coffee relative px-4 sm:px-6 lg:px-0 justify-start z-10 space-x-4 items-stretch self-stretch">
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
            <div className="block h-[1000px] object-scale-down justify-center overflow-scroll">
              <div className="flex flex-col overflow-scroll bg-black w-[1200px] h-[800px]">
                <div className="flex flex-row justify-between w-full h-1/4">
                  <span className="bg-red-500 w-full">01</span>
                  <span className="bg-green-500 w-full">02</span>
                  <span className="bg-blue-500 w-full">03</span>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="bg-yellow-500 h-96">04</span>
                  <div className="flex flex-row justify-between w-full h-28">
                    <span className="bg-purple-500 w-9/12">05</span>
                    <span className="bg-pink-500 w-3/12">06</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between w-full h-1/4">
                  <span className="bg-yellow-300 w-5/12">07</span>
                  <span className="bg-gray-600 w-4/12">08</span>
                  <span className="bg-red-200 w-3/12">09</span>
                </div>
              </div>
            </div>
          </div>

          <SimpleModal show={show} close={Toggle} />
        </section>

        {/* <ModalHOC selector="#modal">
          <Modal
            show={show}
            close={Toggle}
            tableName={menuItem}
            dataModal={tableData}
            state={selectedPerson}
            setState={setSelectedPerson}
          />
        </ModalHOC> */}
      </main>
    </ProtectedWrapper>
  );
}

export default App;
