/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

export default function Modal({
  show,
  close,
  tableName,
  dataModal,
}: {
  show: boolean;
  close: Function;
  tableName: string;
  dataModal?:
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
      }[];
}) {
  console.log(dataModal);
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
                  <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="px-4 py-6 bg-gray-50 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-lg font-medium text-coffee">
                              {tableName.charAt(0).toUpperCase() +
                                tableName.slice(1)}
                              {" Table"}
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
                          {Array.isArray(dataModal)
                            ? dataModal.map((item, i) => (
                                <>
                                  <div>
                                    <label
                                      key={i}
                                      htmlFor="project-name"
                                      className="block text-sm font-medium text-coffee sm:mt-px sm:pt-2"
                                    >
                                      {item["Header"]}
                                      {console.log(item["Header"])}
                                    </label>
                                  </div>
                                  <div className="sm:col-span-2">
                                    <input
                                      key={i}
                                      type="text"
                                      name="project-name"
                                      id="project-name"
                                      // onChange={}
                                      className="block w-full shadow-sm sm:text-sm focus:ring-coffee 
                                focus:border-coffee border-gray-300 rounded-md"
                                    />
                                  </div>
                                </>
                              ))
                            : dataModal
                            ? Object.keys(dataModal.values).map((key, i) => (
                                <>
                                  <div>
                                    <label
                                      key={i}
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
                                      name="project-name"
                                      id="project-name"
                                      defaultValue={dataModal.values[key]}
                                      // onChange={}
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
                    <pre>
                      <code>
                        {console.log(dataModal)}

                        {JSON.stringify(
                          dataModal?.values
                          // JSON.stringify(data, refReplacer())
                        )}
                      </code>
                    </pre>
                    {/* Action buttons */}
                    <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                      <div className="space-x-3 flex justify-end">
                        <button
                          type="button"
                          className="bg-white py-2 px-4 border-2 border-coffee rounded-md shadow-sm text-sm font-medium text-gray-700 hover:border-red-500 hover:text-cream hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => close()}
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
    </>
  );
}
