/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import moment from "moment";
import useUser from "../../hooks/useUser";
import ComboBox from "../Buttons/ComboBox";

export default function SideModal({
  show,
  close,
  tableName,
  dataModal,
  state,
  setState,
}: {
  show: boolean;
  close: Function;
  tableName: string;
  state: string;
  setState: Function;

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
    console.log(dataModal);
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
  // var obj: any = {};
  const [obj, setObj] = useState(Object);
  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (typeof inputFields[0] != "undefined") {
      // Add Row
      obj["created_by"] = id;
      obj["updated_by"] = id;
      const { error } = await supabase.from(tableName).insert(obj);
      error ? null : setObj({});
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

      !error ? setSerial(serial + 1) : null;
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
  const people = {
    ledger: ["Buyer", "Seller"],
    inventory: ["High", "Low"],
    payments: ["Late", "On Time"],
    purchase: ["Paid", "Not Paid"],
    sales: ["Paid", "Not Paid"],
  };
  const [serial, setSerial] = useState(1);
  tableName === "ledger" ? (obj["group_"] = state) : null;
  useEffect(() => {
    obj["group_"] = state;
    if (inputFields) {
      inputFields.values["group_"] = state;
    }
  }, [state, serial]);

  const handleInputChange = (key?: string, event?: any) => {
    //ADD ROW
    if (typeof inputFields[0] != "undefined") {
      key === "group_" ? (obj[key] = state) : (obj[key!] = event.target.value);
      console.log(key);
      console.log(typeof obj[key!], obj[key!]);
    }
    //EDIT ROW
    else {
      key === "group_"
        ? (obj[key] = state)
        : (inputFields.values[key!] = event.target.value);
      console.log(typeof inputFields.values[key!]);
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
            <Dialog.Overlay className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />

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
                      <div className="px-4 py-6 bg-[#14B8A6] sm:px-6 sticky top-0">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-white">
                              {tableName
                                .charAt(0)
                                .toUpperCase()
                                .split("_")
                                .join(" ") + tableName.slice(1)}
                              {" Row Data"}
                            </Dialog.Title>
                            <p className="text-sm text-white">
                              Get started by filling in the information below to
                              create your new Table.
                            </p>
                          </div>
                          <div className="h-7 flex items-center">
                            <button
                              type="button"
                              className="text-[#065D8C] border-2 border-[#065D8C] rounded-md"
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
                                      {item["Header"]
                                        .toUpperCase()
                                        .split("_")
                                        .join(" ")}
                                    </label>
                                  </div>
                                  <div className="sm:col-span-2">
                                    {item["type"] === "dropdown" ? (
                                      <ComboBox
                                        state={state}
                                        setState={setState}
                                        data={
                                          tableName === "ledger"
                                            ? people.ledger
                                            : tableName === "inventory"
                                            ? people.inventory
                                            : tableName === "purchase" ||
                                              tableName === "sales"
                                            ? people.purchase
                                            : people.payments
                                        }
                                        btnClass="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    ) : item["type"] === "date" ? (
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
                                        required
                                      />
                                    ) : item["type"] === "number" &&
                                      item["accessor"] != ["variation_"] ? (
                                      <input
                                        type="number"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        onChange={(event) =>
                                          handleInputChange(
                                            item["accessor"],
                                            event
                                          )
                                        }
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                  focus:border-coffee border-gray-300 rounded-md"
                                      />
                                    ) : item["accessor"] === "variation_" ? (
                                      <input
                                        type="number"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                        focus:border-coffee border-gray-300 rounded-md"
                                        disabled={true}
                                        value={
                                          obj["stock_in_hand"] -
                                          obj["phy_stock_in_hand"]
                                        }
                                      />
                                    ) : (
                                      <textarea
                                        key={i}
                                        // type={item["type"]}
                                        rows={4}
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
                                      {key.toUpperCase().split("_").join(" ")}
                                    </label>
                                  </div>
                                  <div className="sm:col-span-2">
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
                                        state={state}
                                        setState={setState}
                                        data={
                                          tableName === "ledger"
                                            ? people.ledger
                                            : people.inventory
                                        }
                                        btnClass="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    ) : key === "variation_" ? (
                                      <input
                                        type="number"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                            focus:border-coffee border-gray-300 rounded-md"
                                        disabled={true}
                                        value={
                                          inputFields.values["stock_in_hand"] -
                                          inputFields.values[
                                            "phy_stock_in_hand"
                                          ]
                                        }
                                      />
                                    ) : // NUMERIC VALUES
                                    [
                                        "stock_in_hand",
                                        "min_stock_value",
                                        "max_stock_value",
                                        "mrp",
                                        "no_of_boxes",
                                        "phy_stock_in_hand",
                                        "stock_in_hand",
                                      ].includes(key) ? (
                                      <input
                                        type="number"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        onChange={(event) =>
                                          handleInputChange(key, event)
                                        }
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                focus:border-coffee border-gray-300 rounded-md"
                                        defaultValue={inputFields.values[key]}
                                      />
                                    ) : (
                                      <textarea
                                        key={i}
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
                    <div className="flex-shrink-0 bg-white px-4 border-t border-gray-200 py-5 sm:px-6">
                      <div className="space-x-3 flex justify-end">
                        <button
                          type="button"
                          className="bg-red-500 py-2 px-4 text-white rounded-md shadow-sm text-sm font-medium hover:border-red-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#14B8A6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
