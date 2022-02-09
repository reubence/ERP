/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

const stats = [
  {
    name: "Total Sales",
    stat: "71,897",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Avg. Default Rate",
    stat: "58.16%",
    previousStat: "56.14%",
    change: "2.02%",
    changeType: "increase",
  },
  {
    name: "Avg. Pending Order",
    stat: "24.57%",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function TickerTape() {
  return (
    <div>
      <dl className="hidden lg:grid grid-cols-1 rounded-lg bg-cream overflow-hidden hover:shadow divide-y border-2 border-coffee divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x-2">
        {stats.map((item) => (
          <div
            key={item.name}
            className="group px-4 py-5 sm:px-6 sm:py-1 hover:bg-coffee"
          >
            <dt className="text-sm font-medium text-gray-900 group-hover:text-cream">
              {item.name}
            </dt>
            <dd className="-mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-sm font-semibold text-accent">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-500 group-hover:text-gray-400">
                  from {item.previousStat}
                </span>
              </div>

              <div
                className={classNames(
                  item.changeType === "increase"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                  "inline-flex px-2.5 py-0.5 rounded-full text-sm font-medium mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
