/* This example requires Tailwind CSS v2.0+ */
import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Breadcrumb({ pages }: { pages: any[] }) {
  return (
    <nav className="hidden sm:flex sm:visible h-full" aria-label="Breadcrumb">
      <ol role="list" className="bg-white-light rounded-md px-6 flex space-x-4">
        <li className="flex group">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 group-hover:text-gray-700">
              <HomeIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-700"
                aria-hidden="true"
              />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name} className="flex group">
            <div className="flex items-center">
              <svg
                className={
                  page.current
                    ? `flex-shrink-0 w-6 h-full text-primary-50`
                    : `flex-shrink-0 w-6 h-full text-gray-200`
                }
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link href={page.href}>
                <a
                  className={
                    page.current
                      ? `ml-4 text-sm font-bold text-primary-50 group-hover:text-primary-100`
                      : `ml-4 text-sm font-medium text-gray-400 group-hover:text-gray-700`
                  }
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
