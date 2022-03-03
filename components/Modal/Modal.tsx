/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import moment from "moment";
import useUser from "../../hooks/useUser";
import { DropDownButton } from "../Buttons/DropdownButton";
import { LockClosedIcon } from "@heroicons/react/solid";
import ComboBox from "../Buttons/ComboBox";

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
      .from(tableName)
      .delete(inputFields.values)
      .match({ id: dataModal.values.id });
    error ? console.log(error) : close();
    error
      ? toast.error(`Error Deleting Row -\n${error.message}`, {
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
  const { data } = useUser();
  const id = data.id;

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (typeof inputFields[0] != "undefined") {
      // Add Row
      obj["created_by"] = id;
      obj["updated_by"] = id;
      const { error } = await supabase.from(tableName).insert(obj);
      error ? console.log(error, "Error") : close();
      console.log(obj);
      error
        ? toast.error(`Error Adding Row -\n${error.message}`, {
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
      const { error } = await supabase
        .from(tableName)
        .update(inputFields.values)
        .match({ id: dataModal.values.id });
      error ? console.log(error) : close();
      error
        ? toast.error(`Error Updating Row - \n${error.message}`, {
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
  const people = [
    "Buyer",
    "Seller",
    // More users...
  ];

  var obj: any = {};
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  obj["group_"] = selectedPerson;
  useEffect(() => {
    obj["group_"] = selectedPerson;
  }, [selectedPerson]);

  const handleInputChange = (key?: string, event?: any) => {
    if (typeof inputFields[0] != "undefined") {
      key === "group_"
        ? (obj[key] = selectedPerson)
        : (obj[key!] = event.target.value);
      console.log(key);
    } else {
      key === "group_"
        ? (obj[key] = selectedPerson)
        : (inputFields.values[key!] = event.target.value);
      // console.log(inputFields.values);
    }

    setInputFields(inputFields);
  };

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
                                    </label>
                                  </div>
                                  <div className="sm:col-span-2">
                                    {item["type"] === "dropdown" ? (
                                      <ComboBox
                                        state={selectedPerson}
                                        setState={setSelectedPerson}
                                        data={people}
                                        btnClass="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    ) : item["accessor"] === "anniversary" ? (
                                      <input
                                        type="date"
                                        onChange={(event) =>
                                          handleInputChange(
                                            item["accessor"],
                                            event
                                          )
                                        }
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                      focus:border-coffee border-gray-300 rounded-md"
                                      />
                                    ) : (
                                      <textarea
                                        key={i}
                                        // type={item["type"]}
                                        rows={4}
                                        name={item + "-" + i}
                                        id={item + "-" + i}
                                        onChange={(event) =>
                                          handleInputChange(
                                            item["accessor"],
                                            event
                                          )
                                        }
                                        defaultValue={
                                          item["accessor"] === "created_at" ||
                                          item["accessor"] === "last_updated"
                                            ? moment().format(
                                                "YYYY-MM-DDTHH:mm"
                                              )
                                            : item["accessor"] ===
                                                "created_by" ||
                                              item["accessor"] === "updated_by"
                                            ? data.name
                                            : ""
                                        }
                                        placeholder={
                                          item["Header"] === "ID"
                                            ? "auto generated value"
                                            : ""
                                        }
                                        disabled={item["disabled"]}
                                        className={
                                          item["disabled"]
                                            ? `block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                        focus:border-coffee bg-gray-300 text-gray-500 border-gray-300 rounded-md`
                                            : `block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                focus:border-coffee border-gray-300 rounded-md`
                                        }
                                      />
                                    )}
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
                                    {console.log(inputFields.values[key])}

                                    {key === "anniversary" ? (
                                      <input
                                        type="date"
                                        onChange={(event) =>
                                          handleInputChange(key, event)
                                        }
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                        focus:border-coffee border-gray-300 rounded-md"
                                        value={inputFields.values[key]}
                                      />
                                    ) : key === "group_" ? (
                                      <ComboBox
                                        state={selectedPerson}
                                        setState={setSelectedPerson}
                                        data={people}
                                        btnClass="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    ) : (
                                      <textarea
                                        key={i}
                                        // type={
                                        //   key === "created_at" ||
                                        //   key === "last_updated"
                                        //     ? "datetime-local"
                                        //     : "text"
                                        // }
                                        rows={4}
                                        name={key + "-" + i}
                                        id={key + "-" + i}
                                        defaultValue={
                                          key.toUpperCase() === "ID"
                                            ? ""
                                            : key === "created_by" ||
                                              key === "updated_by"
                                            ? data.name
                                            : inputFields.values[key]
                                        }
                                        onChange={(event) =>
                                          handleInputChange(key, event)
                                        }
                                        placeholder={
                                          key.toUpperCase() === "ID"
                                            ? inputFields.values[key] +
                                              "   #auto generated value"
                                            : ""
                                        }
                                        disabled={
                                          key.toUpperCase() === "ID" ||
                                          key === "created_at" ||
                                          key === "last_updated" ||
                                          key === "created_by" ||
                                          key === "updated_by"
                                            ? true
                                            : false
                                        }
                                        className={
                                          key.toUpperCase() === "ID" ||
                                          key === "created_at" ||
                                          key === "last_updated" ||
                                          key === "created_by" ||
                                          key === "updated_by"
                                            ? `block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                            focus:border-coffee bg-gray-300 text-gray-500 border-gray-300 rounded-md`
                                            : `block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                focus:border-coffee border-gray-300 rounded-md`
                                        }
                                      />
                                    )}
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
                    <div className="flex-shrink-0 sticky bottom-0 bg-cream px-4 border-t border-gray-200 py-5 sm:px-6">
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
