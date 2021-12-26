import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/react/outline";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
  },
  // More people...
];

export default function DetailViewSubRow() {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-2 border-coffee-light sm:rounded-lg">
            <div className="table min-w-full divide-y divide-gray-200">
              <div className="table-header-group bg-gray-50">
                <div className="table-cell">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-coffee-light uppercase tracking-wider"
                  >
                    Box
                  </th>
                </div>
                <div className="table-cell">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-coffee-light uppercase tracking-wider"
                  >
                    Name
                  </th>
                </div>
                <div className="table-cell">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                </div>
                <div className="table-cell">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                </div>
                <div className="table-cell">
                  {" "}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                </div>
                <div className="table-cell">
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </div>
              </div>
              <div className="table-row-group">
                {people.map((person, personIdx) => (
                  <div
                    key={person.email}
                    className={
                      personIdx % 2 === 0
                        ? "bg-white table-row"
                        : "bg-gray-50 table-row"
                    }
                  >
                    <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        type="button"
                        className="rounded-full border-coffee-light border-2"
                      >
                        <PlusSmIconOutline
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {person.name}
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.title}
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.email}
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.role}
                    </div>
                    <div className="table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
