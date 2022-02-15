import React from "react";
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
                      <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="relative inline-flex items-center px-4 py-2 border-2 border-cream text-sm font-medium rounded-md text-cream bg-coffee hover:bg-accent hover:border-accent"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border-2 border-cream text-sm font-medium rounded-md text-cream bg-coffee hover:bg-accent hover:border-accent"
                      >
                        Next
                      </button>
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
  }, []);

  // const columns = React.useMemo(() => [], []);

  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  const [dataModal, setDataModal] = useState<any>();
  const formatTrProps = (state = {}) => {
    return {
      onClick: () => {
        console.log(state, "State");
        Toggle();
        const data_row: any = state;
        setDataModal(data_row);
        console.log(dataModal, "dataModal");
      },
    };
  };

  useEffect(() => {
    // Update the document title using the browser API
    data;
  }, [formatTrProps]);

  // const csvdata = React.useMemo(() => {
  //   return data.map((d: any) => Object.values(d));
  // }, []);

  return (
    <>
      <div className="pb-16">
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
      </div>
    </>
  );
}

export default App;
