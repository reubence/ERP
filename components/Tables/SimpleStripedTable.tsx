import React from "react";
import { useExpanded, useTable } from "react-table";
import { useState } from "react";
import makeData from "./makeData";
interface TableProps {
  columns: any;
  data: any;
  renderRowSubComponent?: any;
}
function Table({ columns, data, renderRowSubComponent }: TableProps) {
  const [open, setOpen] = React.useState(false);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded //can use useExpanded to track expanded state for sub-components too
  );

  const toggleRowOpen = (id: any) => {
    if (open === id) {
      setOpen(false);
    } else {
      setOpen(id);
    }
  };

  // Render the UI for your table
  return (
    <>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-coffee-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-cream-light uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-cream-light divide-y divide-gray-200"
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()} className="group">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:bg-coffee group-hover:text-cream group-hover:cursor-pointer"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

function App() {
  const [data, setData] = useState(React.useMemo(() => makeData(10), []));

  const resetData = () => {
    const newData = makeData(5);
    setData(newData);
  };

  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }: any) => (
          // Use Cell to render an expander for each row.
          // We can use the getExpandedToggleProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <Table
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      ></Table>
    ),
    []
  );

  // const data = React.useMemo(() => makeData(20), []);
  // const data2 = React.useMemo(() => makeData(10), []);
  return (
    <div className="flex flex-col border-2 border-coffee-light rounded-lg overflow-hidden">
      <div className="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow rounded-md">
            <button onClick={resetData}>Reset Data</button>
            <Table
              columns={columns}
              data={data}
              renderRowSubComponent={renderRowSubComponent}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
