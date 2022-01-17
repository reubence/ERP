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
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  LinkIcon,
  PlusSmIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";

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
    const team = [
      {
        name: "Tom Cook",
        email: "tomcook@example.com",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Whitney Francis",
        email: "whitneyfrancis@example.com",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Leonard Krasner",
        email: "leonardkrasner@example.com",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Floyd Miles",
        email: "floydmiles@example.com",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Emily Selman",
        email: "emilyselman@example.com",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ];

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
                              New project
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
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium text-coffee sm:mt-px sm:pt-2"
                            >
                              Project name
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="project-name"
                              id="project-name"
                              className="block w-full shadow-sm sm:text-sm focus:ring-coffee focus:border-coffee border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        {/* Project description */}
                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-description"
                              className="block text-sm font-medium text-coffee sm:mt-px sm:pt-2"
                            >
                              Description
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                              id="project-description"
                              name="project-description"
                              rows={3}
                              className="block w-full shadow-sm sm:text-sm focus:ring-coffee focus:border-coffee border border-gray-300 rounded-md"
                              defaultValue={""}
                            />
                          </div>
                        </div>

                        {/* Team members */}
                        <div className="space-y-2 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:px-6 sm:py-5">
                          <div>
                            <h3 className="text-sm font-medium text-coffee">
                              Team Members
                            </h3>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="flex space-x-2">
                              {team.map((person) => (
                                <a
                                  key={person.email}
                                  href={person.href}
                                  className="flex-shrink-0 rounded-full hover:opacity-75"
                                >
                                  <img
                                    className="inline-block h-8 w-8 rounded-full"
                                    src={person.imageUrl}
                                    alt={person.name}
                                  />
                                </a>
                              ))}

                              <button
                                type="button"
                                className="flex-shrink-0 bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-coffee hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <span className="sr-only">Add team member</span>
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Privacy */}
                        <fieldset>
                          <div className="space-y-2 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:px-6 sm:py-5">
                            <div>
                              <legend className="text-sm font-medium text-coffee">
                                Privacy
                              </legend>
                            </div>
                            <div className="space-y-5 sm:col-span-2">
                              <div className="space-y-5 sm:mt-0">
                                <div className="relative flex items-start">
                                  <div className="absolute flex items-center h-5">
                                    <input
                                      id="public-access"
                                      name="privacy"
                                      aria-describedby="public-access-description"
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                      defaultChecked
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="public-access"
                                      className="font-medium text-coffee"
                                    >
                                      Public access
                                    </label>
                                    <p
                                      id="public-access-description"
                                      className="text-coffee"
                                    >
                                      Everyone with the link will see this
                                      project
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex items-center h-5">
                                    <input
                                      id="restricted-access"
                                      name="privacy"
                                      aria-describedby="restricted-access-description"
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="restricted-access"
                                      className="font-medium text-coffee"
                                    >
                                      Private to Project Members
                                    </label>
                                    <p
                                      id="restricted-access-description"
                                      className="text-coffee"
                                    >
                                      Only members of this project would be able
                                      to access
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div className="absolute flex items-center h-5">
                                    <input
                                      id="private-access"
                                      name="privacy"
                                      aria-describedby="private-access-description"
                                      type="radio"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="private-access"
                                      className="font-medium text-coffee"
                                    >
                                      Private to you
                                    </label>
                                    <p
                                      id="private-access-description"
                                      className="text-coffee"
                                    >
                                      You are the only one able to access this
                                      project
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <hr className="border-gray-200" />
                              <div className="flex flex-col space-between space-y-4 sm:flex-row sm:items-center sm:space-between sm:space-y-0">
                                <div className="flex-1">
                                  <a
                                    href="#"
                                    className="group flex items-center text-sm text-indigo-600 hover:text-indigo-900 font-medium space-x-2.5"
                                  >
                                    <LinkIcon
                                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                      aria-hidden="true"
                                    />
                                    <span>Copy link</span>
                                  </a>
                                </div>
                                <div>
                                  <a
                                    href="#"
                                    className="group flex items-center text-sm text-coffee hover:text-coffee space-x-2.5"
                                  >
                                    <QuestionMarkCircleIcon
                                      className="h-5 w-5 text-gray-400 group-hover:text-coffee"
                                      aria-hidden="true"
                                    />
                                    <span>Learn more about sharing</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <pre>
                      {JSON.stringify({
                        data: dataModal.allCells,
                      })}
                    </pre>

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
