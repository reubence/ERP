import SimpleStripedTable from "../../components/Tables/SimpleStripedTable";

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
    <main className="flex-1 pb-8 h-screen overflow-y-auto">
      <div className="grid grid-cols-1 px-4 sm:px-6 lg:px-8 mt-6">
        <SimpleStripedTable
          tableData={tableData}
          tableName="company"
        ></SimpleStripedTable>
      </div>
    </main>
  );
}

export default App;
