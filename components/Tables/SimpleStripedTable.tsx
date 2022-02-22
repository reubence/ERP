import ReactTable from "react-table";
import React, { useRef } from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { SearchIcon } from "@heroicons/react/solid";
import Modal from "../Modal/Modal";
import ModalHOC from "../HigherOrderComponents/ModalHOC";

interface props {
  table_name: string;
  startRow: number;
  endRow: number;
}

interface AppProps {
  tableData: {}[];
  tableName: string;
  btnModal?: boolean;
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
    <div className="flex items-center bg-gray-100">
      <SearchIcon className="w-5 h-5 text-coffee ml-4" />
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
        className="block h-12 w-full text-coffee placeholder-gray-500 border-0 border-b-2 border-transparent bg-gray-100 focus:border-green-400 focus:ring-0 text-sm"
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
  const [open, setOpen] = React.useState(false); // Use the state and functions returned from useTable to build your UI
  // const skipPageResetRef = React.useRef();
  // React.useEffect(() => {
  //   // After the table has updated, always remove the flag
  //   skipPageResetRef.current = false;
  // });

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
      autoResetPage: false,
      // autoResetExpanded: !skipPageResetRef.current,
      // autoResetGroupBy: !skipPageResetRef.current,
      // autoResetSelectedRows: !skipPageResetRef.current,
      // autoResetSortBy: !skipPageResetRef.current,
      // autoResetFilters: !skipPageResetRef.current,
      // autoResetRowState: !skipPageResetRef.current,

      initialState: {
        pageIndex: 0, // Pass our hoisted table state
        pageSize: 10,
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
      <div className="w-full overflow-auto border-t border-coffee">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      <div className="overflow-auto flex-grow h-[615px] border-t border-coffee pb-96 pr-96">
        <div {...getTableProps()} className="table relative bg-coffee">
          <div className="sticky top-0 overflow-auto bg-gray-100 table-header-group z-100">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="table-row">
                {headerGroup.headers.map((column) => (
                  <div
                    {...column.getHeaderProps()}
                    className="border-b border-r border-coffee table-cell px-6 py-3 text-left text-xs text-coffee font-bold uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            {...getTableBodyProps()}
            className="table-row-group bg-cream-light divide-y divide-gray-200"
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <>
                  <div
                    {...row.getRowProps(formatRowProps && formatRowProps(row))}
                    className="group table-row"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <div
                          {...cell.getCellProps()}
                          className="border-b border-r border-coffee table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:bg-gray-300 group-hover:cursor-pointer"
                        >
                          {cell.render("Cell")}
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="w-full"> */}
      {/* {loading ? (
              // Use our custom loading state to show a loading indicator
              <div>Loading...</div>
            ) : ( */}
      <div className="w-full">
        {/* Bottom Nav Bar */}
        <nav
          className="bg-gray-100 border-t fixed bottom-0 lg:left-[389px] left-0 right-0 border-coffee px-4 py-2 flex flex-grow items-center justify-between sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:flex  left-54">
            <p className="text-sm text-coffee">
              Showing <span className="font-medium">{page.length}</span> to{" "}
              <span className="font-medium">{pageSize}</span> of{" "}
              <span className="font-medium">
                {controlledPageCount * pageSize}
              </span>{" "}
              results
            </p>
          </div>
          <div className="right-12 flex-1 flex justify-start sm:justify-end">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-4 py-1 border-coffee border text-sm font-medium rounded-md text-coffee"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="ml-3 relative inline-flex items-center px-4 py-1 text-sm border border-coffee font-medium rounded-md text-coffee hover:bg-coffee hover:text-cream"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
      {/* )} */}
      {/* </div> */}
    </>
  );
}

function App({ tableData, tableName, btnModal }: AppProps) {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  const [dataModal, setDataModal] = useState<any>();
  const formatTrProps = (state = {}) => {
    return {
      onClick: () => {
        // console.log(state, "State");
        Toggle();
        const data_row = state;
        setDataModal(data_row);
        // console.log(dataModal, "dataModal");
      },
    };
  };

  // We'll start our table without any data
  const [data, setData] = React.useState<any>([]);
  const dataRef = useRef(data);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState<any>(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
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
            .range(startRow, 100);

          if (error) {
            throw new Error(`${error.message}: ${error.details}`);
          }

          setData(data);
          if (data != null) {
            setPageCount(Math.ceil(data.length / pageSize));
          }

          return data;
        };

        const data = readData({
          table_name,
          startRow,
          endRow,
        });

        setLoading(false);
      }
    },
    [modal, btnModal]
  );

  // const columns = React.useMemo(() => [], []);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   data;
  //   fetchData;
  // }, [formatTrProps]);

  // const csvdata = React.useMemo(() => {
  //   return data.map((d: any) => Object.values(d));
  // }, []);

  return (
    <>
      <div className="">
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
        <ModalHOC selector="#modal">
          <Modal
            show={modal}
            close={Toggle}
            tableName={tableName}
            dataModal={dataModal}
          />
        </ModalHOC>

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
    </>
  );
}

export default App;
