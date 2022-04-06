/* This example requires Tailwind CSS v2.0+ */
import { DotsVerticalIcon } from "@heroicons/react/solid";
import ModalHOC from "../HigherOrderComponents/ModalHOC";
import SideModal from "../Modal/SideModal";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function GridCards({
  data,
  onClick,
  title,
  show,
  state,
  setState,
}: any) {
  return (
    <div>
      <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
        {title}
      </h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {data.map((project: any) => (
          <li
            onClick={() => onClick(project)}
            key={project.name}
            className="col-span-1 flex shadow-sm rounded-md cursor-pointer"
          >
            <div
              className={classNames(
                project.bgColor,
                "flex-shrink-0 p-4 flex items-center justify-center text-white text-sm font-bold rounded-l-md truncate"
              )}
            >
              {project.initials}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-xs truncate">
                <a className="text-gray-900 text-base font-medium hover:text-gray-600">
                  {project.name}
                </a>
                <p className="text-gray-500">{project.subtitle}</p>
                {project.line1 && (
                  <p className="text-gray-500">{project.line1}</p>
                )}
                {project.line2 && (
                  <p className="text-gray-500">{project.line2}</p>
                )}
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open options</span>
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
