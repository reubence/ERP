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
import Modal from "../../components/Modal/Modal";
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [show, setShow] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [menuItem, setMenuItem] = useState("ledger");

  const navigation = [
    { name: "Ledger", accessor: "ledger", current: menuItem },
    { name: "Sales", accessor: "sales", current: menuItem },
    { name: "Purchase", accessor: "purchase", current: menuItem },
    { name: "Payments", accessor: "payments", current: menuItem },
    { name: "Inventory", accessor: "inventory", current: menuItem },
    { name: "Reports", accessor: "reports", current: menuItem, count: "25+" },
  ];
  let tableData;
  switch (menuItem) {
    case "ledger":
      tableData = columns[0];
      break;
    case "inventory":
      tableData = columns[1];
      break;
    case "payments":
      tableData = columns[2];
      break;
    case "purchase":
      tableData = columns[3];
      break;
    case "sales":
      tableData = columns[4];
      break;
    default:
      tableData = columns[0];
  }

  const Toggle = () => {
    setShow(!show);
  };

  const refreshTables = (name: string) => {
    setMenuItem(String(name).toLowerCase());
    setRefreshTable(!refreshTable);
  };

  const [sortby, setSortBy] = useState("last_updated");
  const [selectedPerson, setSelectedPerson] = useState(
    `${
      menuItem === "ledger"
        ? `Buyer`
        : menuItem === "inventory"
        ? `High`
        : menuItem === "purchase" || menuItem === "sales"
        ? "Paid"
        : "Late"
    }`
  );

  console.log(menuItem, selectedPerson);
  var obj: any = {};
  useEffect(() => {
    setSelectedPerson(
      `${
        menuItem === "ledger"
          ? `Buyer`
          : menuItem === "inventory"
          ? `High`
          : menuItem === "purchase" || menuItem === "sales"
          ? "Paid"
          : "Late"
      }`
    );
  }, [menuItem]);

  const [data, setData] = useState<string>("");
  const getData = async () => {
    const { data: string, error } = await supabase.from("ledger").select("*");
    if (string) {
      setData(String(string));
    }
    return true;
  };

  const navigations = [
    { name: "Home", href: "/", icon: HomeIcon, current: false },
    { name: "Ledger", href: "/ledger", icon: LibraryIcon, current: true },
    {
      name: "Invoicing",
      href: "/invoicing",
      icon: PrinterIcon,
      current: false,
    },
    {
      name: "Purchase",
      href: "/purchase",
      icon: ShoppingCartIcon,
      current: false,
    },
    { name: "Payments", href: "/payments", icon: CashIcon, current: false },
    {
      name: "Inventory",
      href: "/inventory",
      icon: ArchiveIcon,
      current: false,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: ChartPieIcon,
      current: false,
    },
    { name: "Settings", href: "/settings", icon: CogIcon, current: false },
  ];

  const router = useRouter();

  return (
    <div className="flex h-full w-full">
      <ProtectedWrapper>
        <div className="h-screen w-16 flex flex-col justify-between overflow-y-hidden bg-cream-light border-r border-coffee-light">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black"
              alt="Workflow"
            />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-2">
            {navigations.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                //   aria-current={item.current ? "page" : undefined}
              >
                <a
                  key={item.name}
                  // href={item.href}
                  className={classNames(
                    item.href === router.asPath
                      ? "bg-coffee-light text-cream-light"
                      : "text-coffee-light hover:bg-cofffee-light hover:text-accent-light hover:ring-2 hover:ring-accent-light",
                    "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                  )}
                  aria-current={
                    item.href === router.asPath ? "page" : undefined
                  }
                >
                  <item.icon
                    key={item.name}
                    className={classNames(
                      item.href === router.asPath
                        ? "text-cream-light"
                        : "text-coffee-light group-hover:text-accent-light",
                      "h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {/* <span key={item.name} className="mt-2">
                      {item.name}
                    </span> */}
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-screen px-6 pt-6 pb-4 border-r border-coffee">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Data Directory
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Search through entire directory
            </p>
            <form className="mt-6 flex space-x-4" action="#">
              <div className="flex-1 min-w-0">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon
                      className="h-5 w-5 text-coffee"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-coffee rounded-md"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group inline-flex justify-center px-3.5 py-2 border border-coffee shadow-sm text-sm font-medium rounded-md text-coffee bg-white hover:bg-coffee focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <FilterIcon
                  className="h-5 w-5 text-coffee group-hover:text-cream"
                  aria-hidden="true"
                />
                <span className="sr-only">Search</span>
              </button>
            </form>

            <div className="h-full relative flex flex-col w-64 border-r- border-coffee bg-cream overflow-y-auto mt-10">
              <nav className="space-y-1" aria-label="Sidebar">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => refreshTables(item.accessor)}
                    className={classNames(
                      item.current === String(item.accessor).toLowerCase()
                        ? "bg-coffee text-cream"
                        : "text-gray-600 hover:bg-gray-300 hover:text-gray-700 cursor-pointer",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <span className="truncate">{item.name}</span>
                    {item.count ? (
                      <span
                        className={classNames(
                          item.current === String(item.accessor).toLowerCase()
                            ? "bg-cream text-coffee"
                            : "bg-gray-200 text-gray-600 group-hover:bg-gray-200",
                          "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
                        )}
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <main className="flex flex-col overflow-x-hidden h-screen border-gray-200 flex-1">
          {/* MAIN SECTION */}
          <div className="flex justify-between px-5 py-2 max-h-12 h-12 space-x-4 items-center">
            {/* <div className="flex-grow">
                <TickerTape />
              </div> */}
            <div className="py-1 flex space-x-2">
              <SimpleButton
                setSolid={false}
                text="Refresh"
                icon={RefreshIcon}
                onClick={() => setRefreshTable(!refreshTable)}
                btnClass="bg-cream text-gray-500 group-hover:text-coffee group-hover:bg-gray-300"
                iconClass="text-gray-500 group-hover:text-coffee"
              />
              <DropDownButton
                setSolid={false}
                text="Sort by"
                icon={SwitchVerticalIcon}
                onClick={setSortBy}
                btnClass="bg-cream text-gray-500 group-hover:text-coffee group-hover:bg-gray-300"
                iconClass="text-gray-500 group-hover:text-coffee"
              />
              <SimpleButton
                setSolid={false}
                text="Add Row"
                icon={PlusSmIcon}
                onClick={() => Toggle()}
                btnClass="bg-green-400 group-hover:bg-green-500 text-cream"
              />
              {/* <DropdownButton /> */}
            </div>
            {/* <div
              className="right-6 fixed inline-flex items-center px-2 py-1 text-sm font-medium rounded-md text-gray-500 hover:text-coffee hover:bg-gray-300"
              id="download"
            ></div> */}
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <SimpleStripedTable
              tableData={tableData}
              tableName={menuItem}
              show={show}
              refreshTable={refreshTable}
              sortby={sortby}
              state={selectedPerson}
              setState={setSelectedPerson}
            ></SimpleStripedTable>
          </div>
        </main>
      </ProtectedWrapper>
    </div>
  );
}

export default App;
