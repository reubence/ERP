import AdvancedTable from "../../components/Tables/AdvancedTable";
import ProtectedWrapper from "../../components/layout/Protected";
import { DownloadIcon, FilterIcon } from "@heroicons/react/solid";
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

import { columns } from "../../public/data/data";
import { supabase } from "../../utils/supabaseClient";
import { CSVDownload, CSVLink } from "react-csv";
import { useRouter } from "next/router";
import DropDownButton from "../../components/Buttons/DropdownButton";

/* This example requires Tailwind CSS v2.0+ */

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
    { name: "Invoice", accessor: "invoice", current: menuItem },
    { name: "Invoice Items", accessor: "invoice_items", current: menuItem },
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
    case "invoice_items":
      tableData = columns[5];
      break;
    case "invoice":
      tableData = columns[6];
      break;

    default:
      tableData = columns[0];
  }

  console.log(tableData);
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

  const router = useRouter();
  useEffect(() => {
    if (router.asPath === "/data#invoice") {
      refreshTables("invoice");
    } else if (router.asPath === "/data#inventory") {
      refreshTables("inventory");
    }
  }, []);

  return (
    <ProtectedWrapper>
      <main className="min-w-0 flex-1 h-screen border-gray-200 lg:flex">
        {/* MAIN SECTION */}
        <section
          aria-labelledby="primary-heading"
          className="min-w-0 flex-1 flex flex-col lg:order-last"
        >
          {/* <div className="grid grid-cols-9 grid-rows-9"> */}
          <div className="relative px-4 sm:px-6 lg:px-0 ">
            <div className="flex justify-start z-10 space-x-4 h-16 items-center self-stretch bg-white">
              {/* <div className="flex-grow">
                <TickerTape />
              </div> */}
              <div className="py-1 flex space-x-2">
                <SimpleButton
                  setSolid={false}
                  text="Refresh"
                  icon={RefreshIcon}
                  onClick={() => setRefreshTable(!refreshTable)}
                  btnClass="px-3 py-3 bg-white text-gray-500 group-hover:text-primary-50 group-hover:bg-secondary-50"
                  iconClass="text-gray-500 group-hover:text-primary-50"
                />
                <DropDownButton
                  setSolid={false}
                  text="Sort by"
                  icon={SwitchVerticalIcon}
                  onClick={setSortBy}
                  btnClass="px-3 py-3 bg-white text-gray-500 group-hover:text-primary-50 group-hover:bg-secondary-50"
                  iconClass="text-gray-500 group-hover:text-primary-50"
                  menuItems={[
                    "last_updated",
                    "id",
                    "created_at",
                    "anniversary",
                  ]}
                  state={sortby}
                  setState={setSortBy}
                />
                <div
                  id="download"
                  // onClick={downloadData}
                  className="group items-center bg-white text-gray-500 hover:text-primary-50 flex rounded-md px-3 py-3 hover:bg-secondary-50"
                  // iconClass="text-gray-500 group-hover:text-primary-50"
                >
                  <DownloadIcon className="text-gray-500 w-4 h-4 mr-1 group-hover:text-primary-50" />
                </div>

                <SimpleButton
                  setSolid={false}
                  text={
                    menuItem === "inventory"
                      ? "Add Item"
                      : menuItem === "invoice"
                      ? "Create Invoice"
                      : menuItem === "ledger"
                      ? "Add Company"
                      : "Add Row"
                  }
                  icon={PlusSmIcon}
                  onClick={
                    menuItem === "invoice"
                      ? () => router.push("/invoice")
                      : // : menuItem === "inventory"
                        // ? () => router.push("/inventory")
                        () => Toggle()
                  }
                  btnClass="fixed right-6 px-3 py-3 bg-primary-50 group-hover:bg-primary-100 text-white transition ease-in-out"
                />
                {/* <DropdownButton /> */}
                {/* <div
                  className="right-6 fixed inline-flex items-center px-2 py-1 text-sm font-medium rounded-md text-gray-500 hover:text-coffee hover:bg-gray-300"
                  id="download"
                >
                </div> */}
              </div>
            </div>

            <AdvancedTable
              tableData={tableData}
              tableName={menuItem}
              show={show}
              refreshTable={refreshTable}
              sortby={sortby}
              state={selectedPerson}
              setState={setSelectedPerson}
            ></AdvancedTable>
          </div>
        </section>

        {/* SECOND MENU */}
        <aside className="hidden w-64 lg:block lg:flex-shrink-0 lg:order-first border-r border-gray-200 bg-white ">
          <div className="px-6 pt-10 pb-4">
            <h2 className="text-lg font-bold text-secondary-100">
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
                      className="h-5 w-5 text-secondary-100"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="focus:ring-secondary-100 text-secondary-100 focus:border-secondary-100 block w-full pl-10 sm:text-sm border-gray-200 rounded-md"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group inline-flex justify-center px-3.5 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-md text-coffee bg-white hover:bg-coffee focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-50"
              >
                <FilterIcon
                  className="h-5 w-5 text-secondary-100 group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="sr-only">Search</span>
              </button>
            </form>

            <div className="h-full relative flex flex-col w-52 bg-white overflow-y-auto mt-10">
              <nav className="space-y-1" aria-label="Sidebar">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => refreshTables(item.accessor)}
                    id={item.accessor}
                    className={classNames(
                      item.current === String(item.accessor).toLowerCase()
                        ? "bg-secondary-50 font-bold text-secondary-100"
                        : "text-gray-400 font-medium hover:bg-secondary-50 hover:text-secondary-100 cursor-pointer",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <span className="truncate">{item.name}</span>
                    {item.count ? (
                      <span
                        className={classNames(
                          item.current === String(item.accessor).toLowerCase()
                            ? "bg-white text-coffee"
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
        </aside>

        {/* MODAL FOR ADD-ROW */}
        <ModalHOC selector="#modal">
          <SideModal
            show={show}
            close={Toggle}
            tableName={menuItem}
            dataModal={tableData}
            state={selectedPerson}
            setState={setSelectedPerson}
          />
        </ModalHOC>
      </main>
    </ProtectedWrapper>
  );
}

export default App;

// export async function getServerSideProps() {
//   const { data, error } = await supabase
//     .from("ledger")
//     .select("*")
//     .order("created_at", { ascending: false });

//   !error ? null : null;

//   const fastcsv = require("fast-csv");
//   const fs = require("fs");
//   const ws = fs.createWriteStream("NewFile.csv");
//   const jsonData = data;
//   fastcsv
//     .write(jsonData, { headers: true })
//     .on("finish", function () {
//       console.log("Write to bezkoder_postgresql_fastcsv.csv successfully!");
//     })
//     .pipe(ws);

//   return { props: {} };
// }
