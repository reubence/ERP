/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import moment from "moment";
import useUser from "../../hooks/useUser";
import ComboBox from "../Buttons/ComboBox";

export default function SimpleSideModal({
  show,
  close,
  tableName,
  dataModal,
  state,
  setState,
  invoiceData,
  setInvoiceData,
  invoiceNo,
  serial,
}: {
  show: boolean;
  close: Function;
  tableName: string;
  state: string;
  setState: Function;
  invoiceData: any[];
  setInvoiceData: Function;
  invoiceNo?: string;
  serial?: number;

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
  // PULLING ITEMS NAMES FROM SUPABASE
  const [itemsState, setItemsState] = useState<string>("Placeholder");
  const [itemsNameList, setItemsNameList] = useState<string[]>([]);
  const getItemsData = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("item_name");
    let arr: string[] = [];
    data!.map((key, i) => {
      arr.push(String(Object.values(key)[0]));
    });
    data && setItemsState(data[0].item_name);
    console.log(data);
    data && setItemsNameList(data.map((item) => item.item_name));
    console.log(itemsNameList);
  };
  useEffect(() => {
    getItemsData();
  }, []);

  const [itemData, setItemData] = useState<any>([{ mrp: 0, hsn_code: "" }]);
  const getItemData = async () => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .match({ item_name: itemsState });
    setItemData(data);
  };

  useEffect(() => {
    getItemData();
  }, [itemsState, itemsNameList]);

  useEffect(() => {
    console.log(itemData);
  }, [itemData]);

  const [inputFields, setInputFields] = useState(dataModal);
  useEffect(() => {
    setInputFields(dataModal);
    console.log(dataModal);
  }, [dataModal]);

  // DELETE ROW
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    obj = inputFields.values;
    obj["delete"] = true;
    setInvoiceData({ obj });
    close();
  };

  // MAIN ADD && EDIT ROW
  const { data } = useUser();
  const id = data.id;
  let [obj, setObj] = useState<any>({});
  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (typeof inputFields[0] != "undefined") {
      // ADD ROW
      obj["created_by"] = id;
      obj["updated_by"] = id;
      obj["invoice_no"] = invoiceNo;
      obj["igst"] = state;
      obj["item_name"] = itemsState;
      obj["mrp"] = itemData[0].mrp;
      obj["ptr"] = itemData[0].ptr;
      obj["mfr"] = itemData[0].mfr;
      obj["rate"] = itemData[0].rate;
      obj["hsn_code"] = itemData[0].hsn_code;
      obj["batch_no"] = itemData[0].batch_no;
      obj["pack_size"] = itemData[0].pack_size;
      obj["expiry"] = itemData[0].expiry;
      obj["value_igst"] = obj["ptr"] + (obj["igst"] / obj["ptr"]) * 100;
      obj["total"] = obj["qty"] * ((obj["igst"] / obj["ptr"]) * 100);
      console.log(obj);
      obj["add"] = true;
      setInvoiceData({ obj });
      setObj({});
      close();
    }
    // EDIT ROW
    else {
      obj = inputFields.values;
      obj["igst"] = state;
      obj["item_name"] = itemsState;
      obj["edit"] = true;
      console.log(obj);
      setInvoiceData({ obj });
      close();
    }
  };
  const people = ["5", "12", "18"];

  useEffect(() => {
    //ADD ROW
    // obj["igst"] = state;
    obj["s_no"] = serial;

    //EDIT ROW
    if (inputFields) {
      // inputFields.values["igst"] = state;
      inputFields.values["invoiceNo"] = invoiceNo;
    }
  }, [serial]);

  const handleInputChange = (key?: string, event?: any) => {
    //ADD ROW
    if (typeof inputFields[0] != "undefined") {
      console.log("HANDLE INPUT CHANGE", obj);
      key === "igst" ? (obj[key] = state) : (obj[key!] = event.target.value);
    }

    //EDIT ROW
    else {
      key === "igst"
        ? (inputFields.values[key] = state)
        : (inputFields.values[key!] = event.target.value);
    }
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
                      <div className="px-4 py-6 z-100 bg-coffee sm:px-6 sticky top-0">
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
                                    {item["accessor"] === "igst" ||
                                    item["accessor"] === "item_name" ? (
                                      <ComboBox
                                        state={
                                          item["accessor"] === "igst"
                                            ? state
                                            : itemsState
                                        }
                                        setState={
                                          item["accessor"] === "igst"
                                            ? setState
                                            : setItemsState
                                        }
                                        data={
                                          item["accessor"] === "igst"
                                            ? people
                                            : itemsNameList
                                        }
                                        btnClass="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    ) : ["mrp", "rate", "ptr"].includes(
                                        item["accessor"]
                                      ) ? (
                                      <input
                                        type="number"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                      focus:border-coffee border-gray-300 rounded-md text-gray-500 bg-gray-300"
                                        disabled={true}
                                        value={
                                          itemData[0]?.[item["accessor"]]
                                            ? itemData[0]?.[item["accessor"]]
                                            : 0
                                        }
                                        defaultValue={
                                          itemData[0]?.[item["accessor"]]
                                            ? itemData[0]?.[item["accessor"]]
                                            : 0
                                        }
                                        onWheel={(e) => e.currentTarget.blur()}
                                      />
                                    ) : [
                                        "pack_size",
                                        "batch_no",
                                        "mfr",
                                        "hsn_code",
                                      ].includes(item["accessor"]) ? (
                                      <input
                                        type="text"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                    focus:border-coffee border-gray-300 rounded-md text-gray-500 bg-gray-300"
                                        disabled={true}
                                        value={
                                          itemData[0]?.[item["accessor"]]
                                            ? itemData[0]?.[item["accessor"]]
                                            : 0
                                        }
                                        defaultValue={
                                          itemData[0]?.[item["accessor"]]
                                            ? itemData[0]?.[item["accessor"]]
                                            : 0
                                        }
                                        onWheel={(e) => e.currentTarget.blur()}
                                      />
                                    ) : ["expiry"].includes(
                                        item["accessor"]
                                      ) ? (
                                      <input
                                        type="date"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                  focus:border-coffee border-gray-300 rounded-md text-gray-500 bg-gray-300"
                                        disabled={true}
                                        value={
                                          itemData[0]?.[item["accessor"]]
                                            ? itemData[0]?.[item["accessor"]]
                                            : 0
                                        }
                                        defaultValue={
                                          itemData[0]?.[item["accessor"]]
                                            ? itemData[0]?.[item["accessor"]]
                                            : 0
                                        }
                                        onWheel={(e) => e.currentTarget.blur()}
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
                                    ) : [
                                        "s_no",
                                        "total",
                                        "value_igst",
                                      ].includes(item["accessor"]) ? (
                                      <input
                                        type="text"
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                      focus:border-coffee border-gray-300 rounded-md text-gray-500 bg-gray-300"
                                        disabled={true}
                                        value={
                                          ["total", "value_igst"].includes(
                                            item["accessor"]
                                          )
                                            ? "auto generated value"
                                            : serial
                                        }
                                        defaultValue={serial}
                                        onWheel={(e) => e.currentTarget.blur()}
                                      />
                                    ) : item["type"] === "number" &&
                                      item["accessor"] != ["s_no", "mrp"] ? (
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
                                    ) : ["invoice_no"].includes(
                                        item["accessor"]
                                      ) ? (
                                      <input
                                        type="text"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        className="block w-full text-gray-500 bg-gray-300 shadow-sm sm:text-sm focus:ring-coffee 
                        focus:border-coffee border-gray-300 rounded-md"
                                        disabled={true}
                                        value={invoiceNo}
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
                                      {key.toUpperCase()}
                                    </label>
                                  </div>
                                  <div className="sm:col-span-2">
                                    {key === "igst" || key === "item_name" ? (
                                      <ComboBox
                                        state={
                                          key === "igst" ? state : itemsState
                                        }
                                        setState={
                                          key === "igst"
                                            ? setState
                                            : setItemsState
                                        }
                                        data={
                                          key === "igst"
                                            ? people
                                            : itemsNameList
                                        }
                                        btnClass="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    ) : key === "expiry" ? (
                                      <input
                                        type="date"
                                        onChange={(event) =>
                                          handleInputChange(key, event)
                                        }
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                        focus:border-coffee border-gray-300 rounded-md"
                                        defaultValue={inputFields.values[key]}
                                      />
                                    ) : key === "invoice_no" ? (
                                      <input
                                        type="text"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        className="block w-full text-gray-500 bg-gray-300 shadow-sm sm:text-sm focus:ring-coffee 
                        focus:border-coffee border-gray-300 rounded-md"
                                        disabled={true}
                                        value={inputFields.values[key]}
                                      />
                                    ) : ["s_no"].includes(key) ? (
                                      <input
                                        type="number"
                                        onWheel={(e) => e.currentTarget.blur()}
                                        className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                            focus:border-coffee border-gray-300 text-gray-500 bg-gray-300 rounded-md"
                                        disabled={true}
                                        value={inputFields.values[key]}
                                      />
                                    ) : // NUMERIC VALUES
                                    [
                                        "qty",
                                        "rate",
                                        "discount",
                                        "ptr",
                                        "mrp",
                                        "value_igst",
                                        "total",
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
                    <div className="flex-shrink-0 bg-cream px-4 border-t border-gray-200 py-5 sm:px-6">
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
