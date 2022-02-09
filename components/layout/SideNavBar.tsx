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
} from "@heroicons/react/outline";
import Breadcrumb from "./Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";
import useLogOut from "../../hooks/useLogout";
import useUser from "../../hooks/useUser";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Ledger", href: "/ledger", icon: LibraryIcon, current: false },
  { name: "Sales", href: "/sales", icon: CurrencyRupeeIcon, current: false },
  {
    name: "Purchase",
    href: "/purchase",
    icon: ShoppingCartIcon,
    current: false,
  },
  { name: "Payments", href: "/payments", icon: CashIcon, current: false },
  { name: "Inventory", href: "/inventory", icon: ArchiveIcon, current: false },
  { name: "Analytics", href: "/analytics", icon: ChartPieIcon, current: false },
  { name: "Settings", href: "/settings", icon: CogIcon, current: false },
];
const userNavigation = [
  { name: "Your profile", href: "/profile" },
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

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-full flex">
        {/* Narrow sidebar */}
        <div className="hidden w-28 bg-cream-light overflow-y-auto md:block border-r-2 border-coffee-light">
          <div className="w-full py-6 flex flex-col items-center ">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black"
                alt="Workflow"
              />
            </div>
            <div className="flex-1 mt-6 w-full px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  //   aria-current={item.current ? "page" : undefined}
                >
                  <a
                    key={item.name}
                    // href={item.href}
                    className={classNames(
                      item.href === router.asPath
                        ? "bg-coffee-light text-cream-light"
                        : "text-coffee-light hover:bg-cofffee-light hover:text-accent-light hover:ring-2 hover:ring-accent-light",
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
                          ? "text-cream-light"
                          : "text-coffee-light group-hover:text-accent-light",
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
              <div className="relative max-w-xs w-full bg-coffee-light pt-5 pb-4 flex-1 flex flex-col">
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
                      className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-accent-light"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XIcon
                        className="h-6 w-6 text-cream-light"
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
                                ? "border-cream-light text-coffee-light"
                                : "text-cream-light hover:border-cream-light hover:text-cream-light",
                              "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? "text-accent-light"
                                  : "text-cream-light group-hover:text-accent-light",
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
          <header className="w-full">
            <div className="relative z-10 flex-shrink-0 h-16 bg-cream border-b-2 border-coffee shadow-sm flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-light md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between pr-4 sm:pr-6">
                <div className="flex-1 flex">
                  <Breadcrumb></Breadcrumb>
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-coffee-light rounded-full flex text-sm outline-none ring-2 ring-offset-2 ring-coffee-light hover:ring-accent-light">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
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
                                      ? "bg-cream-light"
                                      : "text-cream-light",
                                    "block px-4 py-2 text-sm rounded-md hover:bg-accent-light hover:text-cream-light"
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

                  <button
                    type="button"
                    className="flex p-1 items-center justify-center text-coffee-light hover:text-accent-light focus-within:rounded-full focus-within:ring-2 focus-within:ring-accent-light focus-within:text-accent-light"
                  >
                    <BellIcon className="h-7 w-7" aria-hidden="true" />
                    <span className="sr-only">Add file</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
          {/* Main Content */}
          {children}
        </div>
      </div>
    </>
  );
}
