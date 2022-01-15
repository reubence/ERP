import React from "react";
import {
  useExpanded,
  useRowSelect,
  useTable,
  useMountedLayoutEffect,
  usePagination,
} from "react-table";
import makeData from "./makeData";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    prepareRow,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    visibleColumns,
    // selectedFlatRows,
    state: {
      // expanded,
      // selectedRowIds,
      pageIndex,
      pageSize,
    },
  } = useTable(
    {
      columns,
      data,
      // initialState: {
      //   selectedRowIds: selectedRows,
      // },
    },
    usePagination
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <tr
                  key={i}
                  {...row.getRowProps(formatRowProps && formatRowProps(row))}
                  className="group"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={i}
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
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function App() {
  const [data, setData] = useState(React.useMemo(() => makeData(10000), []));

  // const resetData = () => {
  //   const newData = makeData(5);
  //   setData(newData);
  // };

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

  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  // const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);
  let data_row = {};
  const formatTrProps = (state = {}) => {
    return {
      onClick: () => {
        console.log(state, "qua");
        setShowModal(true);
        // console.log(showModal);
        data_row = state;
        setDataModal(state);
        // handleShow();
      },
    };
  };

  const Modal = ({ data }) => {
    console.log(open);
    console.log(data);
    useEffect(() => {
      // Update the document title using the browser API
      data;
    }, [formatTrProps]);

    return (
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setShowModal}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

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
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Profile
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div className="divide-y divide-gray-200">
                      <div className="pb-6">
                        <div className="bg-indigo-700 h-24 sm:h-20 lg:h-28" />
                        <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-15">
                          <div>
                            <div className="-m-1 flex">
                              <div className="inline-flex rounded-lg overflow-hidden border-4 border-white">
                                <img
                                  className="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:w-48 lg:h-48"
                                  src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 sm:ml-6 sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
                                  Ashley Porter
                                </h3>
                                <span className="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                                  <span className="sr-only">Online</span>
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                @ashleyporter
                              </p>
                            </div>
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                              <button
                                type="button"
                                className="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                              >
                                Message
                              </button>
                              <button
                                type="button"
                                className="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Call
                              </button>
                              <span className="ml-3 inline-flex sm:ml-0">
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left"
                                >
                                  <Menu.Button className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="sr-only">
                                      Open options menu
                                    </span>
                                    <DotsVerticalIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                              )}
                                            >
                                              View profile
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                              )}
                                            >
                                              Copy profile link
                                            </a>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-5 sm:px-0 sm:py-0">
                        <dl className="space-y-8 sm:divide-y sm:divide-gray-200 sm:space-y-0">
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Bio
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                              <p>
                                Enim feugiat ut ipsum, neque ut. Tristique mi id
                                elementum praesent. Gravida in tempus feugiat
                                netus enim aliquet a, quam scelerisque. Dictumst
                                in convallis nec in bibendum aenean arcu.
                              </p>
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Location
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                              New York, NY, USA
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Website
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                              ashleyporter.com
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Birthday
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                              <time dateTime="1982-06-23">June 23, 1982</time>
                            </dd>
                          </div>
                          <pre>
                            <code>
                              {JSON.stringify({
                                // data,
                                data: data.allCells.map((row) => row.value),
                              })}
                            </code>
                          </pre>
                        </dl>
                      </div>
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
              {/* <button onClick={resetData}>Reset Data</button> */}
              <Table
                columns={columns}
                data={data}
                // renderRowSubComponent={renderRowSubComponent}
                // selectedRows={selectedRows}
                // onSelectedRowsChange={setSelectedRows}
                formatRowProps={(state) => formatTrProps(state)}
              ></Table>
              {showModal === true && <Modal data={dataModal}></Modal>}
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
