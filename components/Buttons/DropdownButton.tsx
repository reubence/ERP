/* This example requires Tailwind CSS v2.0+ */
import { Fragment, MouseEventHandler } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DuplicateIcon, PencilAltIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface AppProps {
  icon: Function;
  text: string;
  setSolid?: boolean;
  onClick?: Function;
  btnClass?: string;
  iconClass?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
function MyLink(props: any) {
  let { href, children, ...rest } = props;
  return (
    <>
      <Link href="#">
        <a {...rest} className={props.className}>
          <PencilAltIcon
            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          Edit
        </a>
      </Link>
    </>
  );
}

export function DropDownButton(props: AppProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="relative group">
        <Menu.Button
          className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-md ${props.btnClass}`}
        >
          <props.icon
            className={`mr-1 h-4 w-4 ${props.iconClass}`}
            aria-hidden="true"
          />
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
        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">
              tom@example.com
            </p>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <MyLink
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                />
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <MyLink
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                />
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
