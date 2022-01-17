import { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  OfficeBuildingIcon,
  UserIcon,
} from "@heroicons/react/solid";
import SimpleStripedTable from "../../components/Tables/SimpleStripedTable";
import SimpleButton from "../../components/Buttons/SimpleButton";

function App() {
  return (
    <main className="flex-1 pb-8 h-screen overflow-y-auto">
      <div className="grid grid-cols-1 px-4 sm:px-6 lg:px-8 mt-6">
        <SimpleStripedTable></SimpleStripedTable>
      </div>
    </main>
  );
}

export default App;
