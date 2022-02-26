import SimpleStripedTable from "../../components/Tables/SimpleStripedTable";
import ProtectedWrapper from "../../components/layout/Protected";
import { DownloadIcon, FilterIcon } from "@heroicons/react/solid";
import SimpleButton from "../../components/Buttons/SimpleButton";
import {
  SearchIcon,
  PlusSmIcon,
  RefreshIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import ModalHOC from "../../components/HigherOrderComponents/ModalHOC";
import Modal from "../../components/Modal/Modal";
import { DropDownButton } from "../../components/Buttons/DropdownButton";

const tableData = [
  { Header: "ID", accessor: "user_id" as const },
  // { Header: "Edited By", accessor: "edited_by" as const },
  { Header: "Name", accessor: "company_name" as const },
  { Header: "Email", accessor: "email" as const },
  { Header: "Contact", accessor: "contact" as const },
  { Header: "Address", accessor: "address" as const },
  { Header: "Pin", accessor: "pin" as const },
  { Header: "City", accessor: "city" as const },
  { Header: "States", accessor: "states" as const },
  { Header: "Country", accessor: "country" as const },
  { Header: "TypeOfCompany", accessor: "typeofcompany" as const },
  { Header: "DL NO", accessor: "dl_no" as const },
  { Header: "Pan No", accessor: "pan_no" as const },
  { Header: "Responsible Person", accessor: "responsible_person" as const },
  { Header: "Responsible Phone", accessor: "responsible_phone" as const },
  { Header: "GSTIN", accessor: "gstin" as const },
];

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
  { name: "Ledger", href: "#", current: true, count: "5" },
  { name: "Sales", href: "#", current: false },
  { name: "Purchase", href: "#", current: false, count: "19" },
  { name: "Payments", href: "#", current: false, count: "20+" },
  { name: "Inventory", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [show, setShow] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const Toggle = () => {
    setShow(!show);
  };

  return (
    <ProtectedWrapper>
      <main className="min-w-0 flex-1 h-screen border-gray-200 lg:flex">
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
                <div className="right-6 fixed">
                  <SimpleButton
                    setSolid={false}
                    text="Export Data"
                    icon={DownloadIcon}
                    iconClass="text-gray-500 group-hover:text-coffee"
                    btnClass="text-gray-500 group-hover:text-coffee group-hover:bg-gray-300"
                  />
                </div>
              </div>
            </div>

            <SimpleStripedTable
              tableData={tableData}
              tableName="company"
              show={show}
              refreshTable={refreshTable}
            ></SimpleStripedTable>
          </div>
        </section>
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
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-coffee text-cream"
                        : "text-gray-600 hover:bg-gray-300 hover:text-gray-700",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <span className="truncate">{item.name}</span>
                    {item.count ? (
                      <span
                        className={classNames(
                          item.current
                            ? "bg-cream text-coffee"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200",
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
        <ModalHOC selector="#modal">
          <Modal
            show={show}
            close={Toggle}
            tableName={"company"}
            dataModal={tableData}
          />
        </ModalHOC>
        {/* </div> */}
      </main>
    </ProtectedWrapper>
  );
}

export default App;
