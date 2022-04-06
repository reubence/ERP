/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  CashIcon,
  ChartPieIcon,
  ArchiveIcon,
  CurrencyRupeeIcon,
  ShoppingCartIcon,
  CogIcon,
  LibraryIcon,
  HomeIcon,
  MenuAlt2Icon,
  BellIcon,
  XIcon,
  PrinterIcon,
} from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import Breadcrumb from "./Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";
import useLogOut from "../../hooks/useLogout";
import useUser from "../../hooks/useUser";
import { toLower } from "lodash";
//DELETE Com
const navigation = [
  { name: "Home", href: "", icon: HomeIcon, current: false },
  { name: "Data", href: "data", icon: LibraryIcon, current: true },
  { name: "Invoice", href: "invoice", icon: PrinterIcon, current: false },
  // {
  //   name: "Purchase",
  //   href: "/purchase",
  //   icon: ShoppingCartIcon,
  //   current: false,
  // },
  // { name: "Payments", href: "/payments", icon: CashIcon, current: false },
  { name: "Inventory", href: "inventory", icon: ArchiveIcon, current: false },
  // { name: "Analytics", href: "/analytics", icon: ChartPieIcon, current: false },
  { name: "Settings", href: "settings", icon: CogIcon, current: false },
];
const userNavigation = [
  { name: "Your profile", href: "profile" },
  { name: "Sign out", href: "/" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function SideNavBar({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // const { data, isLoading } = useUser();
  const logoutMutation = useLogOut();

  if (logoutMutation.isSuccess) {
    router.push("/auth/login");
  }

  const { data, isLoading } = useUser();
  console.log(router.asPath.split("/").includes("inventory"));
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-screen flex overflow-hidden">
        {/* Narrow sidebar */}

        <div className="hidden lg:flex lg:flex-shrink-0 bg-[#065D8C] overflow-x-hidden overflow-y-auto md:block border-r border-coffee-light">
          <div className="py-6 flex w-24 flex-col items-center">
            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto items-center">
              <div className="flex-1">
                <div className="bg-[#065D8C] py-4 flex items-center justify-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="flex flex-col items-center space-y-3 mt-6 w-full px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={`/${item.href}`}
                      //   aria-current={item.current ? "page" : undefined}
                    >
                      <a
                        key={item.name}
                        // href={item.href}
                        className={classNames(
                          router.asPath.split("/").includes(toLower(item.name))
                            ? "bg-[#084F76] text-white"
                            : "text-gray-300 hover:bg-[#084F76] hover:text-white",
                          "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                        )}
                        aria-current={
                          item.href === router.asPath ? "page" : undefined
                        }
                      >
                        <item.icon
                          key={item.name}
                          className={classNames(
                            item.href === router.asPath
                              ? "text-white"
                              : "text-gray-00 group-hover:text-white",
                            "h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span key={item.name} className="mt-2">
                          {item.name}
                        </span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              {/* <Menu as="div" className="relative flex-shrink-0">
                <div>
                  <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYPRLSISP2uoEdGxNPVFrz02gI2KWiJ_VwNA&usqp=CAU"
                      alt=""
                    />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg p-1 bg-coffee-light">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link key={item.name} href={item.href}>
                            <a
                              key={item.name}
                              onClick={() => logoutMutation.mutate()}
                              href={item.href}
                              className={classNames(
                                active ? "bg-white-light" : "text-white-light",
                                "block px-4 py-2 text-sm rounded-md hover:bg-accent-light hover:text-white-light"
                              )}
                            >
                              {item.name}
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu> */}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-[#065D8C] pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-1 right-0 -mr-14 p-1">
                    <button
                      type="button"
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-[#065D8C]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XIcon
                        className="h-6 w-6 text-white-light"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            key={item.name}
                            //   href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-[#084F76] text-white"
                                : "text-indigo-100 hover:bg-[#084F76] hover:text-white",
                              "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-indigo-300 group-hover:text-white",
                                "mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span key={item.name}>{item.name}</span>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between pr-4 sm:pr-6">
                <div className="w-[324px]" />
                <div className="flex-1 flex">

                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">

                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYPRLSISP2uoEdGxNPVFrz02gI2KWiJ_VwNA&usqp=CAU"
                          alt=""
                        />
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg p-1 bg-coffee-light">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link key={item.name} href={item.href}>
                                <a
                                  key={item.name}
                                  onClick={() => logoutMutation.mutate()}
                                  href={item.href}
                                  className={classNames(
                                    active
                                      ? "bg-white-light"
                                      : "text-white-light",
                                    "block px-4 py-2 text-sm rounded-md hover:bg-accent-light hover:text-white-light"
                                  )}
                                >
                                  {item.name}
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </header> */}
          {/* Main Content */}
          {children}
        </div>
      </div>
    </>
  );
}
