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
import { DropDownButton } from "../../components/Buttons/DropdownButton";

import { columns } from "../../public/data/data";
import { supabase } from "../../utils/supabaseClient";
import { CSVDownload, CSVLink } from "react-csv";

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

  return (
    <ProtectedWrapper>
      <main className="min-w-0 flex-1 h-screen border-gray-200 lg:flex">
        {/* MAIN SECTION */}
        <section
          aria-labelledby="primary-heading"
          className="min-w-0 flex-1 flex flex-col lg:order-last"
        >
          {/* <div className="grid grid-cols-9 grid-rows-9"> */}
          <div className="relative px-4 sm:px-6 lg:px-0">
            <div className="flex justify-start z-10 space-x-4 items-stretch self-stretch">
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
                <div
                  className="right-6 fixed inline-flex items-center px-2 py-1 text-sm font-medium rounded-md text-gray-500 hover:text-coffee hover:bg-gray-300"
                  id="download"
                >
                  {/* <SimpleButton
                    setSolid={false}
                    text="Export Data"
                    icon={DownloadIcon}
                    // onClick={downloadData}
                    iconClass="text-gray-500 group-hover:text-coffee"
                    onClick={getData}
                    btnClass="text-gray-500 group-hover:text-coffee group-hover:bg-gray-300"
                  /> */}
                </div>
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
        <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first border-r border-coffee">
          <div className="px-6 pt-6 pb-4">
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
