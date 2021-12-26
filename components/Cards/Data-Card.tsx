/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props: any) {
  const stats: {
    id: number;
    name: string;
    stat: Number;
    change: number;
    icon: Function;
    changeType: string;
    buttonText: string;
  }[] = [
    {
      id: props.id,
      name: props.name,
      stat: props.stat,
      icon: props.icon,
      change: props.change,
      changeType: props.changeType,
      buttonText: props.buttonText,
    },
  ];
  return (
    <div>
      <dl className="mt-5">
        {stats.map((item) => (
          <div
            key={item.id}
            className="group relative bg-cream-light pt-5 px-4 pb-12 sm:pt-6 sm:px-6 hover:shadow-2xl border-2 border-coffee-light  rounded-lg overflow-hidden hover:bg-coffee-light"
          >
            <dt>
              <div className="absolute bg-coffee-light group-hover:bg-cream-light rounded-md p-3">
                <item.icon
                  className="h-6 w-6 text-cream-light group-hover:text-coffee-light"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 group-hover:text-cream-light group-hover:text-opacity-50 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-coffee-light group-hover:text-cream-light">
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowSmUpIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-cream-light border-t-2 border-coffee-light border-opacity-10 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-coffee-light hover:text-accent-light"
                  >
                    {" "}
                    {item.buttonText}
                    <span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
