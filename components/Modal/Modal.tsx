/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";

export default function Modal({
  show,
  close,
  tableName,
  dataModal,
}: {
  show: boolean;
  close: Function;
  tableName: string;
  dataModal:
    | {
        allCells: [];
        cells: [];
        depth: number;
        getRowProps: Function;
        id: string;
        index: number;
        original: {};
        originalSubRows: [];
        subRows: [];
        values: { [key: string]: string | number };
      }
    | {
        Header: string;
        accessor: string;
        values?: { [key: string]: string | number };
      }[]
    | any;
}) {
  const [inputFields, setInputFields] = useState(dataModal);
  useEffect(() => {
    setInputFields(dataModal);
  }, [dataModal]);

  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("company")
      .delete(inputFields.values)
      .match({ user_id: dataModal.values.user_id });
    error ? console.log(error) : close();
    error
      ? toast.error("Error Deleting Row", {
          duration: 6000,
          position: "top-right",
          style: {
            background: "#262125",
            color: "#ffffff",
          },
        })
      : toast.success("Row Deleted Successfully", {
          duration: 6000,
          position: "top-right",
          style: {
            background: "#262125",
            color: "#ffffff",
          },
        });
  };

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (typeof inputFields[0] != "undefined") {
      // Add Row
      const { data, error } = await supabase.from("company").insert(obj);
      error ? console.log(error, "Error") : close();
      error
        ? toast.error("Error Adding Row", {
            duration: 6000,
            position: "top-right",
            style: {
              background: "#262125",
              color: "#ffffff",
            },
          })
        : toast.success("Row Added Successfully", {
            duration: 6000,
            position: "top-right",
            style: {
              background: "#262125",
              color: "#ffffff",
            },
          });
    }
    // Update Row
    else {
      const { data, error } = await supabase
        .from("company")
        .update(inputFields.values)
        .match({ user_id: dataModal.values.user_id });
      error ? console.log(error) : close();
      error
        ? toast.error("Error Updating Row", {
            duration: 6000,
            position: "top-right",
            style: {
              background: "#262125",
              color: "#ffffff",
            },
          })
        : toast.success("Row Updated Successfully", {
            duration: 6000,
            position: "top-right",
            style: {
              background: "#262125",
              color: "#ffffff",
            },
          });
    }
  };

  var obj: any = {};

  const handleInputChange = (key: string, event: any) => {
    if (typeof inputFields[0] != "undefined") {
      obj[key] = event.target.value;

      // console.log(obj);
    } else {
      inputFields.values[key] = event.target.value;
      // console.log(inputFields.values);
    }

    setInputFields(inputFields);
  };

  {
    console.log(dataModal);
  }

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={() => close()}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-coffee bg-opacity-75 transition-opacity" />

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 "
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 "
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-2xl">
                  <form
                    className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
                    onSubmit={handleUpdate}
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="px-4 py-6 bg-coffee sm:px-6 sticky top-0">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-cream">
                              {tableName.charAt(0).toUpperCase() +
                                tableName.slice(1)}
                              {" Table"}
                            </Dialog.Title>
                            <p className="text-sm text-cream">
                              Get started by filling in the information below to
                              create your new Table.
                            </p>
                          </div>
                          <div className="h-7 flex items-center">
                            <button
                              type="button"
                              className="text-red-500 border-2 border-red-500 rounded-md"
                              onClick={() => close()}
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
                          {Array.isArray(inputFields)
                            ? // ADD ROW MODAL
                              inputFields.map((item, i) => (
                                <>
                                  <div>
                                    <label
                                      key={i}
                                      htmlFor="project-name"
                                      id={item + "-" + i}
                                      className="block text-sm font-medium text-coffee sm:mt-px sm:pt-2"
                                    >
                                      {item["Header"]}
                                      {/* {console.log(inputFields)} */}
                                    </label>
                                  </div>
                                  <div className="sm:col-span-2">
                                    <input
                                      key={i}
                                      type="text"
                                      name={item + "-" + i}
                                      id={item + "-" + i}
                                      onChange={(event) =>
                                        handleInputChange(
                                          item["accessor"],
                                          event
                                        )
                                      }
                                      placeholder={
                                        item["Header"] === "ID"
                                          ? "#auto generated value"
                                          : ""
                                      }
                                      disabled={
                                        item["Header"] === "ID" ? true : false
                                      }
                                      className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                focus:border-coffee border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              ))
                            : // EDIT ROW MODAL
                            typeof inputFields !== "undefined"
                            ? Object.keys(inputFields.values).map((key, i) => (
                                <>
                                  <div>
                                    <label
                                      key={i}
                                      id={key + "-" + i}
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
                                      name={key + "-" + i}
                                      id={key + "-" + i}
                                      defaultValue={
                                        key.toUpperCase() === "USER_ID"
                                          ? ""
                                          : inputFields.values[key]
                                      }
                                      onChange={(event) =>
                                        handleInputChange(key, event)
                                      }
                                      placeholder={
                                        key.toUpperCase() === "USER_ID"
                                          ? inputFields.values[key] +
                                            "   #auto generated value"
                                          : ""
                                      }
                                      disabled={
                                        key.toUpperCase() === "USER_ID"
                                          ? true
                                          : false
                                      }
                                      className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                focus:border-coffee border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              ))
                            : null}
                        </div>

                        {/* Project description */}
                        {/*  No need */}

                        {/* Team members */}
                        {/* Privacy */}
                      </div>
                    </div>
                    {/* <pre>
                      <code>
                        {console.log(dataModal)}

                        {JSON.stringify(
                          dataModal?.values
                          // JSON.stringify(data, refReplacer())
                        )}
                      </code>
                    </pre> */}
                    {/* Action buttons */}
                    <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                      <div className="space-x-3 flex justify-end">
                        <button
                          type="button"
                          className="bg-red-500 py-2 px-4 text-cream rounded-md shadow-sm text-sm font-medium hover:border-red-500 hover:text-cream hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={
                            Array.isArray(inputFields)
                              ? () => close()
                              : handleDelete
                          }
                        >
                          {Array.isArray(inputFields) ? "Close" : "Delete"}
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
    </>
  );
}
