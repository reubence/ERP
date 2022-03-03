/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import Modal from "../components/Modal/Modal";
import ModalHOC from "../components/HigherOrderComponents/ModalHOC";
import {
  CheckCircleIcon,
  OfficeBuildingIcon,
  UserIcon,
  DownloadIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import DataCard from "../components/Cards/Data-Card";
import SimpleStripedTable from "../components/Tables/SimpleStripedTable";
import SimpleButton from "../components/Buttons/SimpleButton";
// @ts-ignore
import ProtectedWrapper from "../components/layout/Protected";
import useUser from "../hooks/useUser";
import TickerTape from "../components/Cards/TickerTape";
import { useState } from "react";
export default function HomePage() {
  const tableData = [
    // { Header: "ID", accessor: "id" as const },
    { Header: "Name", accessor: "name" as const },
    { Header: "Email", accessor: "email" as const },
    { Header: "Contact", accessor: "contact" as const },
    { Header: "Address", accessor: "address" as const },
    { Header: "Pin", accessor: "pin" as const },
    { Header: "City", accessor: "city" as const },
    { Header: "States", accessor: "states" as const },
    { Header: "Country", accessor: "country" as const },
    { Header: "Typeofcompany", accessor: "typeofcompany" as const },
    { Header: "DL NO", accessor: "dl_no" as const },
    { Header: "Pan No", accessor: "pan_no" as const },
    { Header: "Responsible Person", accessor: "responsible_person" as const },
    { Header: "Responsible Phone", accessor: "responsible_phone" as const },
    { Header: "GSTIN", accessor: "gstin" as const },
  ];

  const cards: {
    id: number;
    name: string;
    stat: Number;
    change: number;
    icon: Function;
    changeType: string;
    buttonText: string;
  }[] = [
    {
      id: 1,
      name: "dsadsa",
      stat: 123,
      icon: UserIcon,
      change: 123,
      changeType: "increase",
      buttonText: "View All",
    },
    {
      id: 1,
      name: "Testing",
      stat: 123,
      icon: UserIcon,
      change: 123,
      changeType: "increase",
      buttonText: "View All",
    },
    {
      id: 1,
      name: "Testing",
      stat: 143,
      icon: UserIcon,
      change: 123,
      changeType: "decrease",
      buttonText: "View All",
    },
  ];

  const { data, isLoading } = useUser();

  const [modal, setModal] = useState(false);

  return (
    <ProtectedWrapper>
      <main className="flex-1 pb-8 h-screen overflow-y-auto">
        {/* Page header */}
        <div className="shadow">
          <div className="px-4 sm:px-6 lg:mx-auto lg:px-8 border-b-2 border-coffee-light">
            <div className="py-6 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                  {/* <UserCircleIcon className="hidden h-24 w-24 rounded-full sm:block text-coffee-light text-opacity-75" /> */}
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                    alt=""
                    className="hidden h-16 w-16 rounded-full sm:block text-coffee-light text-opacity-75"
                  />
                  <div>
                    <div className="flex items-center">
                      <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        alt=""
                      />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        {isLoading ? (
                          <span>Loading... </span>
                        ) : (
                          "Good Morning, " + data?.name
                        )}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <OfficeBuildingIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        NeoKumfurt Pune anch
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        Account Active
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <SimpleButton text="Testing" setSolid={false}></SimpleButton>

                <SimpleButton text="Testing" setSolid={true}></SimpleButton>
              </div>
            </div>
          </div>
        </div>
        <span className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8 ">
          {cards.map((item) => (
            <span key="{item.id}">
              <DataCard
                id={item.id}
                name={item.name}
                stat={item.stat}
                change={item.change}
                icon={item.icon}
                changeType={item.changeType}
                buttonText={item.buttonText}
                key="{item}"
              ></DataCard>
            </span>
          ))}
        </span>
        <div className="relative grid grid-cols-1 px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex justify-end z-10 space-x-4 items-stretch self-stretch">
            <div className="flex-grow">
              <TickerTape />
            </div>
            <SimpleButton
              setSolid={false}
              text="Add Row"
              icon={PlusCircleIcon}
              onClick={() => setModal(!modal)}
            />

            <SimpleButton setSolid={false} text="" icon={DownloadIcon} />
          </div>
        </div>
        <div className="relative grid grid-cols-1 px-4 sm:px-6 lg:px-8 lg:pb-16 mt-6">
          {/* <SimpleStripedTable
            tableData={tableData}
            tableName="company"
          ></SimpleStripedTable> */}
        </div>
        <ModalHOC selector="#modal">
          <Modal
            show={modal}
            close={setModal}
            tableName={"company"}
            dataModal={tableData}
          />
        </ModalHOC>
      </main>
    </ProtectedWrapper>
  );
}
