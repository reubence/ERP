import React from "react";
import {
  useExpanded,
  useRowSelect,
  useTable,
  useMountedLayoutEffect,
} from "react-table";
import makeData from "./makeData";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

interface TableProps {
  columns: any;
  data: any;
  // renderRowSubComponent?: any;
  formatRowProps?: any;
  // selectedRows?: any;
  // onSelectedRowsChange?: any;
}
function Table({
  columns,
  data,
  // renderRowSubComponent,
  formatRowProps,
}: // selectedRows,
// onSelectedRowsChange,
TableProps) {
  const [open, setOpen] = React.useState(false);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    // selectedFlatRows,
    state: {
      // expanded,
      // selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      // initialState: {
      //   selectedRowIds: selectedRows,
      // },
    }
    // useExpanded,
    // useRowSelect

    //can use useExpanded to track expanded state for sub-components too
  );
  // useMountedLayoutEffect(() => {
  //   console.log("SELECTED ROWS CHANGED", selectedRowIds);
  //   onSelectedRowsChange && onSelectedRowsChange(selectedRowIds);
  // }, [onSelectedRowsChange, selectedRowIds]);

  // const toggleRowOpen = (id: any) => {
  //   if (open === id) {
  //     setOpen(false);
  //   } else {
  //     setOpen(id);
  //   }
  // };
  // Render the UI for your table
  return (
    <>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
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
          {rows.map((row, i) => {
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
                {/* {row.isExpanded ? (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null} */}
              </>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

function App() {
  const [data, setData] = useState(React.useMemo(() => makeData(10), []));

  const resetData = () => {
    const newData = makeData(5);
    setData(newData);
  };

  const columns = React.useMemo(
    () => [
      // {
      //   id: "selection",
      //   // The header can use the table's getToggleAllRowsSelectedProps method
      //   // to render a checkbox
      //   Header: ({ getToggleAllRowsSelectedProps }) => (
      //     <div>
      //       <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
      //     </div>
      //   ),
      //   // The cell can use the individual row's getToggleRowSelectedProps method
      //   // to the render a checkbox
      //   Cell: ({ row }) => (
      //     <div>
      //       <input type="checkbox" {...row.getToggleRowSelectedProps()} />
      //     </div>
      //   ),
      // },
      // {
      //   // Make an expander cell
      //   Header: () => null, // No header
      //   id: "expander", // It needs an ID
      //   Cell: ({ row }: any) => (
      //     // Use Cell to render an expander for each row.
      //     // We can use the getExpandedToggleProps prop-getter
      //     // to build the expander.
      //     <span {...row.getToggleRowExpandedProps()}>
      //       {row.isExpanded ? "👇" : "👉"}
      //     </span>
      //   ),
      // },
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  // const [selectedRows, setSelectedRows] = useState({ "0": true, "9": true });

  // const selectedRowKeys = Object.keys(selectedRows);
  // let new_data = selectedRows;

  // const renderRowSubComponent = React.useCallback(
  //   ({ row }) => (
  //     <Table
  //       columns={columns}
  //       data={data}
  //       renderRowSubComponent={renderRowSubComponent}
  //     ></Table>
  //   ),
  //   []
  // );

  const [showModal, setShowModal] = useState("Dont Show");
  const [dataModal, setDataModal] = useState({});
  // const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);
  let data_row = {};
  const formatTrProps = (state = {}) => {
    return {
      onClick: () => {
        console.log(state, "qua");
        setShowModal("Show");
        // console.log(showModal);
        data_row = state;
        setDataModal(state);
        // handleShow();
      },
    };
  };

  console.log(dataModal, "HERER");

  const Modal = ({ data }) => {
    const [open, setOpen] = useState(true);
    console.log(open);
    console.log(data);
    useEffect(() => {
      // Update the document title using the browser API
      data;
    }, [formatTrProps]);

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={() => setShowModal("Dont Show")}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-y-0 mt-10 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => {
                          setOpen(false);
                          console.log(open);
                          setShowModal("Dont Show");
                          console.log(showModal);
                        }}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        <pre>
                          <code>
                            {JSON.stringify({
                              // data,
                              data: data.allCells.map((row) => row.value),
                            })}
                            {console.log(data, "ODHAR")}
                          </code>
                        </pre>
                      </Dialog.Title>
                    </div>
                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
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
  return (
    <>
      <div className="flex flex-col border-2 border-coffee-light rounded-lg overflow-hidden">
        <div className="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow rounded-md">
              <button onClick={resetData}>Reset Data</button>
              <Table
                columns={columns}
                data={data}
                // renderRowSubComponent={renderRowSubComponent}
                // selectedRows={selectedRows}
                // onSelectedRowsChange={setSelectedRows}
                formatRowProps={(state) => formatTrProps(state)}
              ></Table>
              {showModal === "Show" && <Modal data={dataModal}></Modal>}
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
        </div>
      </div>
    </>
  );
}

export default App;
