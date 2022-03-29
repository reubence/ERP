/* This example requires Tailwind CSS v2.0+ */
import { Fragment, MouseEventHandler } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  DuplicateIcon,
  PencilAltIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

interface AppProps {
  icon: Function;
  text: string;
  setSolid?: boolean;
  onClick?: Function;
  btnClass?: string;
  iconClass?: string;
  menuItems?: any;
  state: string;
  setState: Function;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownButton(props: AppProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="group">
        <Menu.Button
          className={`inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium  ${props.btnClass}`}
        >
          <props.icon className="mr-1 h-5 w-4" aria-hidden="true" />
          {props.text}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right  z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-primary-50/90 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="px-4 py-3 space-y-1 bg-primary-100/80 rounded-t-md">
            <p className="text-sm text-white">Currently sorting by column</p>
            <p className="text-sm font-bold text-secondary-100">
              {props.state.split("_").join(" ").toUpperCase()}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-secondary-100 text-white" : " text-white",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => props?.setState("last_updated")}
                >
                  Last Updated
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-secondary-100 text-white" : " text-white",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => props.setState("id")}
                >
                  ID
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-secondary-100 text-white" : " text-white",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => props.setState("anniversary")}
                >
                  Anniversary
                </a>
              )}
            </Menu.Item>
          </div>
          {/* <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div> */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
