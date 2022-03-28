import ReactTable from "react-table";
import React, { useMemo, useRef } from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { SearchIcon, DownloadIcon } from "@heroicons/react/solid";
import SideModal from "../Modal/SideModal";
import ModalHOC from "../HigherOrderComponents/ModalHOC";
import Notification from "../Modal/Notification";
import moment from "moment";
import useUser from "../../hooks/useUser";
import { CSVLink } from "react-csv";
import useWindowDimensions from "../../hooks/useDynamicDimensions";

interface props {
  table_name: string;
  startRow: number;
  endRow: number;
  sortby?: string;
}

interface AppProps {
  tableData: {}[];
  tableName: string;
  show?: boolean;
  refreshTable?: boolean;
  sortby?: string;
  state: string;
  setState: Function;
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
    <div className="flex items-center bg-white">
      <SearchIcon className="w-5 h-5 text-secondary-100 ml-4" />
      <input
        type="text"
        name="name"
        id="name"
        value={value || ""}
        placeholder={`Search Records On This Page`}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="block h-12 w-full text-secondary-100 placeholder-gray-400 border-0 border-b-2 border-transparent bg-white focus:border-secondary-100 focus:ring-0 text-sm"
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
    setHiddenColumns,

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
    setHiddenColumns(["created_by", "updated_by"]);

    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);
  // Render the UI for your table
  const { width, height } = useWindowDimensions();
  const h = height - 153;
  console.log(height - 205);
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
      <div className="w-full overflow-auto border-t border-coffee">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      <div
        style={{ height: h }}
        className={`scrollbar scrollbar-thumb-secondary-100 scrollbar-track-gray-100 overflow-auto flex-grow border-t border-coffee pb-40 pr-40`}
      >
        <div
          {...getTableProps()}
          className="table relative bg-coffee border-collapse"
        >
          <div className="sticky top-0 bg-white table-header-group">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="table-row">
                {headerGroup.headers.map((column) => (
                  <div
                    {...column.getHeaderProps()}
                    className="border border-gray-900 table-cell px-6 py-3 text-left text-xs text-coffee font-bold uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            {...getTableBodyProps()}
            className="table-row-group bg-white-light divide-y divide-gray-500"
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <>
                  <div
                    {...row.getRowProps(formatRowProps && formatRowProps(row))}
                    className="group table-row bg-white"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <div
                          {...cell.getCellProps()}
                          className="border border-gray-900 table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:bg-gray-300 group-hover:cursor-pointer"
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
      {loading ? (
        // Use our custom loading state to show a loading indicator
        <div>Loading...</div>
      ) : null}
      <div className="w-full">
        {/* Bottom Nav Bar */}
        <nav
          className="border-t fixed bottom-0 bg-white lg:left-[352px] left-0 right-0 overflow-hidden border-coffee px-4 py-2 flex flex-grow items-center justify-between sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:flex  left-54">
            <p className="text-sm text-coffee">
              {/* Showing <span className="font-medium">{page.length}</span> to{" "} */}
              Page{" "}
              <input
                className="mx-2 w-24 text-coffee hover:text-coffee inline-flex items-center px-2 py-1 text-sm font-medium rounded-md focus:border-coffee focus:ring-coffee focus:text-coffee"
                value={Number(pageIndex + 1)}
                type="number"
                min={pageIndex + 1}
                max={pageCount}
                onChange={(e) => {
                  const page = Number(e.target.value) - 1;
                  gotoPage(page);
                }}
              ></input>
              of {pageCount}
            </p>
          </div>
          <div className="ml-2 hidden sm:flex">
            <select
              value={pageSize}
              className="text-sm text-coffee hover:text-coffee  rounded-md px-2 py-1 pr-8 focus:border-coffee focus:ring-coffee focus:text-coffee"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 50, 100, 500, 1000].map((pageSize) => (
                <option key={pageSize} value={pageSize} className="">
                  {pageSize} rows
                </option>
              ))}
            </select>
          </div>

          <div className="right-12 flex-1 flex justify-start sm:justify-end">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={
                canPreviousPage
                  ? `relative inline-flex items-center px-4 py-1 border-coffee border text-sm font-medium rounded-md text-coffee hover:text-white hover:bg-coffee`
                  : `relative inline-flex items-center px-4 py-1 bg-gray-100 border text-sm font-medium rounded-md text-gray-500 pointer-events-none`
              }
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={
                canNextPage
                  ? `ml-2 relative inline-flex items-center px-4 py-1 border-coffee border text-sm font-medium rounded-md text-coffee hover:text-white hover:bg-coffee`
                  : `ml-2 relative inline-flex items-center px-4 py-1 bg-gray-100 border text-sm font-medium rounded-md text-gray-500 pointer-events-none`
              }
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

function AdvancedTable({
  tableData,
  tableName,
  show,
  refreshTable,
  sortby,
  state,
  setState,
}: AppProps) {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  const [dataModal, setDataModal] = useState<any>();
  const formatTrProps = (state: any) => {
    return {
      onClick: () => {
        const data_row = state;
        // data_row["values"].created_at = moment(
        //   state["values"].created_at
        // ).format("YYYY-MM-DDTHH:mm");

        tableName === "ledger"
          ? (data_row["values"].anniversary = moment(
              state["values"].anniversary
            ).format("YYYY-MM-DD"))
          : null;

        setState(state["values"].group_);

        Toggle();
        setDataModal(data_row);
      },
    };
  };

  // We'll start our table without any data
  const [data, setData] = React.useState<any>([]);
  const dataRef = useRef(data);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState<any>(0);
  const fetchIdRef = React.useRef(0);
  const [filter, setFilter] = useState("");
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

        const readData = async ({
          table_name,
          startRow,
          endRow,
          sortby,
        }: props) => {
          console.log("Reaching supabase query function");
          const { data, error } = await supabase
            .from(table_name)
            .select("*")
            .range(startRow, endRow)
            .order(`${sortby ? sortby : "last_updated"}`, {
              ascending: false,
            });

          if (error) {
            throw new Error(`${error.message}: ${error.details}`);
          }

          setData(data);
          if (data != null) {
            setPageCount(Math.ceil(data.length / pageSize));
          }
          return data;
        };

        sortby
          ? readData({
              table_name,
              startRow,
              endRow,
              sortby,
            })
          : readData({
              table_name,
              startRow,
              endRow,
            });

        setLoading(false);
      }
    },
    [modal, show, refreshTable]
  );

  useMemo(() => data, [modal, show, refreshTable]);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   data;
  //   fetchData;
  // }, [formatTrProps]);

  const csvdata = React.useMemo(() => {
    return data.map((d: any) => Object.values(d));
  }, []);

  data.map((key: string, i: number) => {
    data[i].created_at = moment(data[i].created_at).format("llll");
    data[i].last_updated = moment(data[i].last_updated).format("llll");
    data[i].anniversary = moment(data[i].anniversary).format("ll");
  });
  // console.log(data);
  return (
    <>
      <div className="">
        {/* <ModalHOC selector="#download">
          <CSVLink data={data}>Export Data</CSVLink>
        </ModalHOC> */}
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
          <SideModal
            show={modal}
            close={Toggle}
            tableName={tableName}
            dataModal={dataModal}
            state={state}
            setState={setState}
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

export default AdvancedTable;
