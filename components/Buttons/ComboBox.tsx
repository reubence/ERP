/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { MouseEventHandler, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface AppProps {
  icon?: Function;
  text?: string;
  onChange?: any;
  btnClass?: string;
  iconClass?: string;
  data: string[];
  state: any;
  setState: any;
  defaultState?: boolean;
}

export default function ComboBox(props: AppProps) {
  const [query, setQuery] = useState("");
  const Toggle = () => {
    props.onChange();
  };

  const filteredPeople =
    query === ""
      ? props.data
      : props.data.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });
  console.log(props.data);
  return (
    <Combobox as="div" value={props.state} onChange={props.setState}>
      {/* <Combobox.Label className="block text-sm font-medium text-gray-700">
        Assigned to
      </Combobox.Label> */}
      <div className="relative">
        <Combobox.Input
          className={`inline-flex items-center text-sm font-medium rounded-md ${props.btnClass}`}
          //   onChange={(event) => setQuery(event.target.value)}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
          <SelectorIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-5 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-50 py-1 text-base shadow sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-secondary-100 text-white" : "text-white"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-secondary-100"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
