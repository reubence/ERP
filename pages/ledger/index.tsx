import SimpleStripedTable from "../../components/Tables/SimpleStripedTable";
import ProtectedWrapper from "../../components/layout/Protected";
import { PlusCircleIcon, DownloadIcon } from "@heroicons/react/solid";
import DropdownButton from "../../components/Buttons/DropdownButton";
import SimpleButton from "../../components/Buttons/SimpleButton";
import TickerTape from "../../components/Cards/TickerTape";

const tableData = [
  { Header: "ID", accessor: "id" as const },
  { Header: "Name", accessor: "name" as const },
  { Header: "Email", accessor: "eamil" as const },
  { Header: "Contact", accessor: "contact" as const },
  { Header: "Address", accessor: "address" as const },
  { Header: "Pin", accessor: "pin" as const },
  { Header: "City", accessor: "city" as const },
  { Header: "State", accessor: "state" as const },
  { Header: "Country", accessor: "country" as const },
  { Header: "Type", accessor: "type" as const },
  { Header: "DL NO", accessor: "dl_no" as const },
  { Header: "Pan No", accessor: "pan_no" as const },
  { Header: "Responsible Person", accessor: "responsible_person" as const },
  { Header: "Responsible Phone", accessor: "responsible_phone" as const },
  { Header: "GSTIN", accessor: "gstin" as const },
];

function App() {
  return (
    <ProtectedWrapper>
      <main className="flex-1 pb-8 h-screen overflow-y-auto">
        <div className="relative grid grid-cols-1 px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex justify-end z-10 space-x-4 items-stretch self-stretch">
            <div className="flex-grow">
              <TickerTape />
            </div>
            <SimpleButton
              setSolid={true}
              text="Add Row"
              icon={PlusCircleIcon}
            />
            <DropdownButton />
            <SimpleButton setSolid={true} text="" icon={DownloadIcon} />
          </div>
        </div>

        <div className="grid grid-cols-1 px-4 sm:px-6 lg:px-8 mt-6">
          <SimpleStripedTable
            tableData={tableData}
            tableName="company"
          ></SimpleStripedTable>
        </div>
      </main>
    </ProtectedWrapper>
  );
}

export default App;
