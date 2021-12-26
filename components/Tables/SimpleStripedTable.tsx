import React from "react";
import { useTable } from "react-table";

import makeData from "./makeData";
interface TableProps {
  columns: any;
  data: any;
  children: any;
}
function Table({ columns, data, children }: TableProps) {
  const [open, setOpen] = React.useState(false);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({
    columns,
    data,
  });

  const toggleRowOpen = (id: boolean) => {
    if (open === id) {
      setOpen(false);
    } else {
      setOpen(id);
    }
  };

  // Render the UI for your table
  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-coffee-light">
        {headerGroups.map((headerGroup) => (
          <React.Fragment key={headerGroup.headers.length + "_hfrag"}>
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th className="px-6 py-3 text-left text-xs font-medium text-cream-light uppercase tracking-wider">
                Expand
              </th>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-cream-light uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          </React.Fragment>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="bg-cream-light divide-y divide-gray-200"
      >
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <React.Fragment key={i + "_frag"}>
              <tr {...row.getRowProps()}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span
                    id={row.id}
                    onClick={() => toggleRowOpen(Boolean(row.id))}
                  >
                    {String(open) === row.id ? "close" : "open"}
                  </span>
                </td>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
              {String(open) === row.id && (
                <tr>
                  <td
                    colSpan={visibleColumns.length}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {children}
                    {/* React.cloneElement(children, {props: "any necessary props here"}) */}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "First ssd",
        accessor: "firstNamedsd",
      },

      {
        Header: "Firsts ssd",
        accessor: "firstNadmedsd",
      },

      {
        Header: "Firstdd ssd",
        accessor: "firstsNamedsd",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
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
    []
  );

  const data = React.useMemo(() => makeData(20), []);
  const data2 = React.useMemo(() => makeData(10), []);
  return (
    <div className="flex flex-col border-2 border-coffee-light rounded-lg overflow-hidden">
      <div className="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow rounded-md">
            <Table columns={columns} data={data}>
              <Table columns={columns} data={data2}>
                Content!
              </Table>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
