import React, { useCallback, useMemo, useRef } from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { useState, useEffect } from "react";
import SimpleSideModal from "../Modal/SimpleSideModal";
import ModalHOC from "../HigherOrderComponents/ModalHOC";
import moment from "moment";

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
  invoiceData: any[];
  setInvoiceData: Function;
  footer: boolean;
}
interface TableProps {
  columns: any;
  data: Array<any>;
  formatRowProps: object | any;
  fetchData: any;
  loading: any;
  pageCount: any;
  footer: boolean;
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
  footer,
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
    footerGroups,
    prepareRow,
    page,
    setHiddenColumns,

    state: {
      pageIndex,
      pageSize,

      // Get the state from the instance
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
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      initialState: {
        sortBy: [
          {
            id: "s_no",
            desc: true,
          },
        ],
      },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );

  useEffect(() => {
    setHiddenColumns([
      "created_by",
      "updated_by",
      "id",
      "created_at",
      "created_by",
      "group_",
      "last_updated",
      "updated_by",
      "comments_",
      "invoice_no",
    ]);

    fetchData();
  }, [data, fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <>
      <div className={`scrollbar-none flex-grow h-full w-full`}>
        <div
          {...getTableProps()}
          className="table w-full h-full relative bg-white"
        >
          <div className="sticky top-0 bg-gray-300 table-header-group">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="table-row">
                {headerGroup.headers.map((column) => (
                  <div
                    {...column.getHeaderProps()}
                    className="border-b border-r border-coffee table-cell px-2 py text-left text-sm text-coffee font-extrabold uppercase tracking-tightest"
                  >
                    {column.render("Header")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            {...getTableBodyProps()}
            className="table-row-group bg-white-light divide-y divide-gray-200"
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
                          className="border-r border-coffee table-cell px-2 py whitespace-nowrap text-sm font-medium text-gray-900 group-hover:bg-gray-300 group-hover:cursor-pointer"
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

          {footer && (
            <div className="bg-gray-300 table-footer-group">
              {footerGroups.map((group) => (
                <div className="table-row" {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <div
                      className="border-r border-coffee px-2 py font-bold table-cell"
                      {...column.getFooterProps()}
                    >
                      {column.render("Footer")}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SimpleTable({
  tableData,
  tableName,
  show,
  refreshTable,
  sortby,
  state,
  setState,
  invoiceData,
  setInvoiceData,
  footer,
}: AppProps) {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);
  const [dataModal, setDataModal] = useState<any>();

  const formatTrProps = (state: any) => {
    return {
      onClick: () => {
        const data_row = state;
        tableName === "ledger"
          ? (data_row["values"].anniversary = moment(
              state["values"].anniversary
            ).format("YYYY-MM-DD"))
          : null;

        setState(state["values"].igst);

        Toggle();
        setDataModal(data_row);
      },
    };
  };

  // We'll start our table without any data
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState<any>(0);
  const fetchIdRef = useRef(0);
  const fetchData = useCallback(() => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    setData(invoiceData);

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    if (fetchId === fetchIdRef.current) {
      setLoading(false);
    }
  }, [invoiceData]);

  useMemo(() => data, [invoiceData, modal, show, refreshTable]);

  useEffect(() => {
    // Update the document title using the browser API
    setData(invoiceData);
    // fetchData;
  }, [invoiceData, modal, show, refreshTable]);

  tableName === "invoice_items" ||
    (tableName === "invoice" &&
      data.map((key: string, i: number) => {
        data[i].created_at = moment(data[i].created_at).format("llll");
        data[i].last_updated = moment(data[i].last_updated).format("llll");
      }));

  return (
    <>
      <Table
        columns={tableData}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        formatRowProps={(state: any) => formatTrProps(state)}
        footer={footer}
      ></Table>
      <ModalHOC selector="#modal">
        <SimpleSideModal
          show={modal}
          close={Toggle}
          tableName={tableName}
          dataModal={dataModal}
          state={state}
          setState={setState}
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
        />
      </ModalHOC>
    </>
  );
}

export default SimpleTable;
