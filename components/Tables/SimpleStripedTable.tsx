import React from "react";
import {
  useExpanded,
  useRowSelect,
  useTable,
  useMountedLayoutEffect,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import makeData from "./makeData";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { supabase } from "../../utils/supabaseClient";
import { PlusSmIcon, SearchIcon } from "@heroicons/react/solid";

interface props {
  table_name: string;
  startRow: number;
  endRow: number;
}

interface AppProps {
  tableData: {}[];
  tableName: string;
}
interface TableProps {
  columns: any;
  data: Array<any>;
  formatRowProps: object | any;
  fetchData: any;
  loading: any;
  pageCount: any;
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex items-center bg-coffee rounded-md">
      <SearchIcon className="w-5 h-5 text-cream ml-4" />
      <input
        type="text"
        name="name"
        id="name"
        value={value || ""}
        placeholder={`Search Through ${count} records...`}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="block h-12 w-full text-cream placeholder-cream border-0 border-b-2 border-transparent bg-coffee focus:border-accent focus:ring-0 text-sm"
      />
    </div>
  );
}

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table({
  columns,
  data,
  formatRowProps,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,

    state: {
      pageIndex,
      pageSize, // Get the state from the instance
    },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0, // Pass our hoisted table state
      },
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      {/* <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select> */}
      <div className="flex flex-col">
        <table
          {...getTableProps()}
          className="min-w-full divide-y-2 divide-gray-200 bg-coffee"
        >
          <thead>
            <tr>
              <th colSpan={10000}>
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </thead>
          <thead className="bg-coffee-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-cream-light uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-cream-light divide-y divide-gray-200"
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <>
                  <tr
                    {...row.getRowProps(formatRowProps && formatRowProps(row))}
                    className="group"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:bg-coffee group-hover:text-cream group-hover:cursor-pointer"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </>
              );
            })}
            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan={10000}>Loading...</td>
              ) : (
                <td colSpan={10000} className="relative ">
                  {/* Bottom Nav Bar */}
                  <nav
                    className="bg-coffee relative px-4 py-6 flex flex-grow items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:flex  left-54">
                      <p className="text-md text-cream">
                        Showing{" "}
                        <span className="font-medium">{page.length}</span> to{" "}
                        <span className="font-medium">{pageSize}</span> of{" "}
                        <span className="font-medium">
                          {controlledPageCount * pageSize}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div className=" right-12 flex-1 flex justify-start sm:justify-end">
                      <a
                        href="#"
                        onClick={() => previousPage()}
                        className="relative inline-flex items-center px-4 py-2 border-2 border-cream text-sm font-medium rounded-md text-cream bg-coffee hover:bg-accent hover:border-accent"
                      >
                        Previous
                      </a>
                      <a
                        onClick={() => nextPage()}
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border-2 border-cream text-sm font-medium rounded-md text-cream bg-coffee hover:bg-accent hover:border-accent"
                      >
                        Next
                      </a>
                    </div>
                  </nav>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
const serverData = makeData(10000);

function App({ tableData, tableName }: AppProps) {
  // We'll start our table without any data
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState<any>(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;
      const table_name = tableName;

      const readData = async ({ table_name, startRow, endRow }: props) => {
        console.log("Reaching supabase query function");
        const { data, error } = await supabase
          .from(table_name)
          .select("*")
          .range(startRow, endRow);

        if (error) {
          throw new Error(`${error.message}: ${error.details}`);
        }

        setData(data);
        setPageCount(3);

        return data;
      };

      const data = readData({
        table_name,
        startRow,
        endRow,
      });

      setLoading(false);
    }
  }, []);

  // const columns = React.useMemo(() => [], []);

  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState<any>({});
  let data_row = {};
  const formatTrProps = (state = {}) => {
    return {
      onClick: () => {
        console.log(state, "State");
        setShowModal(true);
        setDataModal(state);
        console.log(dataModal, "dataModal");
      },
    };
  };

  const Modal = () => {
    useEffect(() => {
      // Update the document title using the browser API
      data;
    }, [formatTrProps]);

    return (
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setShowModal}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-coffee bg-opacity-75 transition-opacity" />

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-2xl">
                  <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="px-4 py-6 bg-gray-50 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-coffee">
                              {tableName.charAt(0).toUpperCase() +
                                tableName.slice(1)}
                              {" Table"}
                            </Dialog.Title>
                            <p className="text-sm text-coffee">
                              Get started by filling in the information below to
                              create your new project.
                            </p>
                          </div>
                          <div className="h-7 flex items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-coffee"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                        {/* Project name */}
                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                          {Object.keys(dataModal.values).map((key, i) => (
                            <>
                              <div>
                                <label
                                  key={i}
                                  htmlFor="project-name"
                                  className="block text-sm font-medium text-coffee sm:mt-px sm:pt-2"
                                >
                                  {key.toUpperCase()}
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  key={i}
                                  type="text"
                                  name="project-name"
                                  id="project-name"
                                  defaultValue={dataModal.values[key]}
                                  // onChange={}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                  focus:border-coffee border-gray-300 rounded-md"
                                />
                              </div>
                            </>
                          ))}
                        </div>

                        {/* Project description */}
                        {/*  No need */}

                        {/* Team members */}
                        {/* Privacy */}
                      </div>
                    </div>
                    {/* <pre>
                      <code>
                        {JSON.stringify(
                          dataModal.values
                          // JSON.stringify(data, refReplacer())
                        )}
                      </code>
                    </pre> */}
                    {/* Action buttons */}
                    <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                      <div className="space-x-3 flex justify-end">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border-2 border-coffee rounded-md shadow-sm text-sm font-medium text-gray-700 hover:border-red-500 hover:text-cream hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-coffee hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  // const data = React.useMemo(() => makeData(20), []);
  // const data2 = React.useMemo(() => makeData(10), []);
  const csvdata = React.useMemo(() => {
    return data.map((d: any) => Object.values(d));
  }, []);

  return (
    <>
      <div className="">
        <div
          className="min-w-full flex flex-col border-2 border-coffee-light 
          rounded-lg overflow-x-auto"
        >
          {/* <CSVLink data={csvdata}>Download me</CSVLink> */}

          {/* <button onClick={resetData}>Reset Data</button> */}
          <Table
            columns={tableData}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
            formatRowProps={(state: any) => formatTrProps(state)}
          ></Table>
          {showModal === true && <Modal></Modal>}
          {/* <p>Selected Rows: {selectedRowKeys.length}</p> */}
          {/* <pre>
                <code>
                  {JSON.stringify(
                    {
                      selectedRowKeys,
                      // selectedFlatRows: selectedFlatRows.map(
                      //   (row) => row.original
                      // ),
                    },
                    null,
                    2
                  )}
                  {console.log(new_data, "ODHAR")}
                </code>
              </pre> */}
        </div>
      </div>
    </>
  );
}

export default App;
