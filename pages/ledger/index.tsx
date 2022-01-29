import SimpleStripedTable from "../../components/Tables/SimpleStripedTable";

const tableData = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "eamil" },
  { Header: "Contact", accessor: "contact" },
  { Header: "Address", accessor: "address" },
  { Header: "Pin", accessor: "pin" },
  { Header: "City", accessor: "city" },
  { Header: "State", accessor: "state" },
  { Header: "Country", accessor: "country" },
  { Header: "Type", accessor: "type" },
  { Header: "DL NO", accessor: "dl_no" },
  { Header: "Pan No", accessor: "pan_no" },
  { Header: "Responsible Person", accessor: "responsible_person" },
  { Header: "Responsible Phone", accessor: "responsible_phone" },
  { Header: "GSTIN", accessor: "gstin" },
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
